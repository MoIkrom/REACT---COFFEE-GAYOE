import React from "react";
import styles from "../styles/Footer.module.css";

import icon_instagram from "../assets/images/Instagram.png";
import icon_facebook from "../assets/images/Facebook.png";
import icon_twitter from "../assets/images/Twitter.png";
import icon_coffee from "../assets/images/coffee-logo.png";

function Footer() {
  return (
    <>
      <footer className={`container ${styles["cont-footer"]}`}>
        <div className={`container d-flex  py-5 ${styles.footer1}`}>
          <aside className={styles["footer-left"]}>
            <img src={icon_coffee} alt="icon_coffee" />
            <span className={styles["footer-title-left"]}>Coffee Gayoe</span>
            <p id={styles["preview"]}>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
            <div className={styles["icon-footer"]}>
              <a href="/">
                <img src={icon_facebook} alt="facebook" />
              </a>
              <a href="/">
                <img src={icon_twitter} alt="twitter" />
              </a>
              <a href="/">
                <img src={icon_instagram} alt="instagram" />
              </a>
            </div>
            <span className={styles["copyright"]}>©2020CoffeeStore</span>
          </aside>

          <aside className="container d-flex flex-row" id={styles["cont-footer-right"]}>
            <div className={`d-flex flex-column me-5 ${styles["fr"]}`}>
              <div className={`${styles["footer-right"]} d-flex flex-row mt-2 mb-3`}>
                <span>Product</span>
              </div>
              <div className={`${styles["footer-right-link"]} d-flex flex-column`}>
                <span id={styles["list-footer"]}>Download</span>
                <span id={styles["list-footer"]}>Pricing</span>
                <span id={styles["list-footer"]}>Locations</span>
                <span id={styles["list-footer"]}>Countries</span>
                <span id={styles["list-footer"]}>Blog</span>
              </div>
            </div>
            <div className={`d-flex flex-column me-5 ${styles["fr"]}`}>
              <div className={`${styles["footer-right"]}  ${styles.engage} d-flex flex-row mt-2 mb-3`}>
                <span id={styles["list-footer"]}>Engage</span>
              </div>
              <div className={`${styles["footer-right-link"]}  ${styles.listfooter} d-flex flex-column`}>
                <span id={styles["list-footer"]}>Coffee Shop?</span>
                <span id={styles["list-footer"]}>FAQ</span>
                <span id={styles["list-footer"]}>About Us</span>
                <span id={styles["list-footer"]}>Privacy Policy</span>
                <span id={styles["list-footer"]}>Terms of Service</span>
              </div>
            </div>
          </aside>
        </div>
      </footer>
    </>
  );
}

export default Footer;
