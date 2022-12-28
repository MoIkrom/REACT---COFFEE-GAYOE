/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import css navbar
import styles from "../styles/Navbar.module.css";

// import image
import icon_coffee from "../assets/images/coffee-logo.png";
import icon_search from "../assets/images/search.png";
import icon_chat from "../assets/images/chat.png";
import icon_profile from "../assets/images/parker.jpeg";
import Button from "react-bootstrap/Button";

function Navbar() {
  // const [email, setEmail] = useState("");
  const navigate = useNavigate();
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
    navigate("/detail-product");
  };
  const toHistory = () => {
    navigate("/history");
  };

  const token = localStorage.getItem("token");
  const toasted = () => {
    toast.error("You Have to Login First", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    console.log("tidak masuk");
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
              Your Cart
            </button>
            <button className={styles["no-underline"]} onClick={token === null ? toasted : toHistory}>
              History
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
              <a className="nav-link" href="/">
                <img clasName={styles.icon} src={icon_search} alt="" widht="27px" height="27px" />
              </a>
              <a className="nav-link" href="/">
                <img clasName={styles.icon} src={icon_chat} alt="" widht="27px" height="27px" />
              </a>

              <Link className={styles["no-underline"]} to={"/profile"}>
                <img className="rounded-circle" src={icon_profile} alt="" widht="27px" height="27px" />
              </Link>
            </div>
          )}
        </nav>
      </div>
      <ToastContainer />
    </>
  );
}

export default Navbar;
