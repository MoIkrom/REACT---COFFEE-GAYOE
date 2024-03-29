/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../utils/api";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// import css navbar
import styles from "../styles/Navbar.module.css";

// import image
import icon_coffee from "../assets/images/coffee-logo.png";
import icon_search from "../assets/images/search.png";
import icon_chat from "../assets/images/chat.png";
import icon_profile from "../assets/images/default-img.png";

function Navbars() {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const toLogin = () => {
    navigate("/login");
  };
  const toRegister = () => {
    navigate("/register");
  };
  const toProduct = () => {
    navigate("/product");
  };
  const toHome = () => {
    navigate("/");
  };
  const toDetailProduct = () => {
    navigate("/cart");
  };
  const toHistory = () => {
    navigate("/history");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const toasted = () => {
    toast.error("You Have to Login First", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const getProfileUser = () => {
    const token = localStorage.getItem("token");
    getProfile(token)
      .then((res) => {
        setProfile(res.data.result.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfileUser();
  }, []);

  const deleteToken = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <Container className="container-fluid d-flex  align-items-center justify-content-between gaps">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <img src={icon_coffee} alt="" widht="27px" height="27px" />
            <Navbar.Brand className="h5 mb-0" href="#home">
              Coffee Gayoe
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className=" gap-5 font justify-content-end" id="responsive-navbar-nav">
            <div className="d-flex justify-content-center mt-3 ms-4 ps-3 mb-4  mt-md-3 ms-md-4 ps-md-3 align-items-center ">
              <Nav className="me-auto h5">
                <Nav.Link onClick={toHome}>Home</Nav.Link>
                <Nav.Link onClick={toProduct}>Product</Nav.Link>
                <Nav.Link onClick={token === null ? toasted : toDetailProduct}>Your Cart</Nav.Link>
                <Nav.Link onClick={token === null ? toasted : toHistory}>History</Nav.Link>
              </Nav>
            </div>
            {token === null ? (
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Button className={styles["login"]} onClick={toLogin}>
                  Login
                </Button>
                <Button className={`${styles["sign-up"]}`} onClick={toRegister}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="d-flex flex-column ms-4">
                {role === "admin" ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-size btn-3"
                      onClick={() => {
                        handleShowModal();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center p-lg-0 ps-md-2">
                    <Link className="cont_profile d-flex flex-column align-items-center text-decoration-none" to={role === "user" ? "/profile" : "/"}>
                      {/* <img className="rounded-circle" src={profile.image === null ? icon_profile : profile.image} alt="" width="50px" height="50px" /> */}
                      <img className="rounded-circle" src={profile.image === null ? icon_profile : profile.image} alt="" width="50px" height="50px" />
                      <p className={`d-flex d-lg-none ${styles["navs_name"]}`}>{profile.username}</p>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="fw-bold text-bg-secondary text-white"
            onClick={() => {
              handleCloseModal();
              deleteToken();
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            Yes
          </Button>
          <Button variant="success" className="fw-bold text-bg-success text-white" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Navbars;
