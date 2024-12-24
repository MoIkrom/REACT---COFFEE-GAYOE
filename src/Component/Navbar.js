import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../utils/api";
import { useSelector } from "react-redux";
import axios from "axios";

import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";

// import css navbar
import styles from "../styles/Navbar.module.css";

// import image
import icon_coffee from "../assets/images/coffee-logo.png";
import icon_profile from "../assets/images/default-img.png";

function Navbars() {
  const totalUniqueItems = useSelector((state) => state.cart.totalUniqueItems);
  const [profile, setProfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getProfileUser();
  }, []);

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

  const handleNavigate = (path) => navigate(path);
  const showToast = (message) =>
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

  const Host = process.env.REACT_APP_BACKEND_HOST;
  const deleteToken = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .delete(`${Host}/api/v1/auth`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        localStorage.clear();
        toast.success("Logout Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1200);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const renderLogoutButton = () => (
    <div>
      <button
        type="button"
        className="btn btn-size btn-3"
        onClick={handleModalShow}
      >
        Logout
      </button>
    </div>
  );

  const renderNavLinks = () => (
    <div className="d-flex justify-content-center bg-white  mt-3 ms-4 m-lg-0 ps-3 mt-md-3 ms-md-4 ps-md-3 align-items-center">
      <Nav className="me-auto p-0">
        <Nav.Link onClick={() => handleNavigate("/")}>Home</Nav.Link>
        <Nav.Link onClick={() => handleNavigate("/product")}>Product</Nav.Link>
        <Nav.Link
          onClick={
            token
              ? () => handleNavigate("/cart")
              : () => showToast("You Have to Login First")
          }
        >
          Cart
          {totalUniqueItems > 0 && (
            <span
              className="badge text-bg-primary ms-1 rounded-pill"
              style={{ position: "relative", top: "-10px", fontSize: "14px" }}
            >
              {totalUniqueItems}
            </span>
          )}
        </Nav.Link>
        <Nav.Link
          onClick={
            token
              ? () => handleNavigate("/history")
              : () => showToast("You Have to Login First")
          }
        >
          History
        </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <Container
          className="container-fluid d-flex align-items-center justify-content-between gaps"
          style={{
            height: "40px",
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-3">
            <img src={icon_coffee} alt="logo" width="27px" height="27px" />
            <Navbar.Brand className="h5 mb-0" href="#home">
              Coffee Gayoe
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="gap-5 font bg-white justify-content-end position-relative"
            id="responsive-navbar-nav"
            style={{ zIndex: "10" }}
          >
            {renderNavLinks()}
            {token ? (
              <div className="ms-4 d-flex flex-column flex-lg-row gap-lg-3 pb-3 align-items-start p-lg-0 ps-md-2">
                <Link
                  className=" ms-4 mt-2 m-lg-0 d-flex flex-column align-items-center "
                  to={role === "user" ? "/profile" : "/"}
                >
                  <img
                    className="rounded-circle"
                    src={profile.image || icon_profile}
                    alt="profile"
                    width="30px"
                    height="30px"
                  />
                  <p className={`d-flex d-lg-none ${styles["navs_name"]}`}>
                    {profile.username}
                  </p>
                </Link>
                <button
                  className="btn p-0 px-2 btn-warning rounded "
                  style={{
                    height: "35px",
                    fontFamily: "Rubik",
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    deleteToken();
                  }}
                >
                  {loading ? (
                    <div className="d-flex gap-2 justify-content-center align-items-center">
                      <div
                        class="spinner-border spinner-border-sm text-dark"
                        role="status"
                      ></div>
                      <div>Loading . . .</div>
                    </div>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            ) : (
              <div className="d-flex position-relative z-10 justify-content-start bg-white mt-3 ms-4 ps-3 mb-4 gap-3 mt-md-3 ms-md-4 ps-md-3 align-items-center">
                <Button
                  className={styles["login"]}
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className={`${styles["sign-up"]}`}
                  onClick={() => handleNavigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="fw-bold text-bg-secondary text-white"
            onClick={() => {
              handleModalClose();
              deleteToken();
            }}
          >
            Yes
          </Button>
          <Button
            variant="success"
            className="fw-bold text-bg-success text-white"
            onClick={handleModalClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Navbars;
