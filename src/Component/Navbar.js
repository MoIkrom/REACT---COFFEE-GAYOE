/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../utils/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import css navbar
import styles from "../styles/Navbar.module.css";

// import image
import icon_coffee from "../assets/images/coffee-logo.png";
import icon_search from "../assets/images/search.png";
import icon_chat from "../assets/images/chat.png";
import icon_profile from "../assets/images/default-img.png";

function Navbar() {
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
        console.log(res.data.result.result[0]);
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
      <div className={styles["container"]}>
        <nav className={`nav d-flex justify-content-between py-3 ${styles["py"]}`}>
          <div className={`${styles["left-nav"]} d-flex py-2`}>
            <img src={icon_coffee} alt="" className="me-2" widht="27px" height="27px" />
            <span className="">Coffee Gayoe</span>
          </div>
          <div className={`${styles["center-nav"]} d-flex justify-content-center align-items-center`}>
            <button className={styles["no-underline"]} onClick={toHome}>
              Home
            </button>
            <button className={styles["no-underline"]} onClick={toProduct}>
              Product
            </button>
            <button className={styles["no-underline"]} onClick={token === null ? toasted : toDetailProduct}>
              {role === "admin" ? "Orders" : "Your Cart"}
            </button>
            <button className={styles["no-underline"]} onClick={token === null ? toasted : toHistory}>
              {role === "admin" ? "Dashboard" : "History"}
            </button>
          </div>

          {token === null ? (
            <div className={`${styles["right-nav"]} d-flex`}>
              <Button className={styles["login"]} onClick={toLogin}>
                Login
              </Button>

              <Button className={`${styles["sign-up"]}`} onClick={toRegister}>
                Sign Up
              </Button>
            </div>
          ) : (
            <div className={`${styles["right-nav"]} d-flex`}>
              {/* <a className="nav-link" href="/">
                <img clasName={styles.icon} src={icon_search} alt="" widht="27px" height="27px" />
              </a> */}
              <a className="nav-link" href="/">
                <img clasName={styles.icon} src={icon_chat} alt="" widht="27px" height="27px" />
              </a>

              {role === "admin" ? (
                <div>
                  <button
                    type="button"
                    className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}
                    onClick={() => {
                      handleShowModal();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link className={styles["no-underlinenavbar"]} to={role === "user" ? "/profile" : "/"}>
                  <img className="rounded-circle" src={profile.image === null ? icon_profile : profile.image} alt="" width="50px" height="50px" />
                </Link>
              )}
            </div>
          )}
        </nav>
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
      </div>
      <ToastContainer />
    </>
  );
}

export default Navbar;
