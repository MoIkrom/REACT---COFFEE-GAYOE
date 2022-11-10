import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import css navbar
import styles from "../styles/Navbar.module.css";

// import image
import icon_coffee from "../assets/images/coffee-logo.png";
import icon_search from "../assets/images/search.png";
import icon_chat from "../assets/images/chat.png";
import icon_profile from "../assets/images/parker.jpeg";

function Navbar() {
  return (
    <>
      <div className={styles["container"]}>
        <nav className={`nav d-flex justify-content-between py-3 ${styles["py"]}`}>
          <div className={`${styles["left-nav"]} d-flex py-2`}>
            <img src={icon_coffee} alt="" className="me-2" widht="27px" height="27px" />
            <span className="">Coffee Gayoe</span>
          </div>
          <div className={`${styles["center-nav"]} d-flex`}>
            <Link className={styles["no-underline"]} to={"/"}>
              Home
            </Link>
            <Link className={styles["no-underline"]} to={"/product"}>
              Product
            </Link>
            <Link className={styles["no-underline"]} to={"/detail-product"}>
              Your Cart
            </Link>
            <Link className={styles["no-underline"]} to={"/history"}>
              History
            </Link>
          </div>
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
        </nav>
      </div>
    </>
  );
}

export default Navbar;
