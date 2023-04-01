import React from "react";
import styles from "../styles/Footer.module.css";

import icon_instagram from "../assets/images/Instagram.png";
import icon_facebook from "../assets/images/Facebook.png";
import icon_twitter from "../assets/images/Twitter.png";

function Footer() {
  return (
    <>
      <div>
        <footer className=" text-center text-lg-start bg-light text-muted">
          <section className="p-4 pb-4 bg-white">
            <div className="container text-center text-md-start mt-5">
              <div className="row justify-content-evenly mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 ms-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 ">Coffee Gayoe</h6>
                  <p>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
                  <div className="mt-3">
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className={`${styles["icon"]}`} src={icon_facebook} alt="/" />
                    </a>
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className={`${styles["icon"]}`} src={icon_twitter} alt="/" />
                    </a>
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className={`${styles["icon"]}`} src={icon_instagram} alt="/" />
                    </a>
                  </div>
                  <p>©2023CoffeeStore</p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mt-md-1 mx-md-0 px-md-0 mx-auto mb-4">
                  <h6 className={`text-uppercase fw-bold mb-4 ${styles["title-footer"]}`}>COMPANY</h6>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none ${styles["li"]}`}>
                      ABOUT US
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none ${styles["li"]}`}>
                      HELP CENTER
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none ${styles["li"]}`}>
                      LICENSES
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none ${styles["li"]}`}>
                      SITE MAP
                    </a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mt-md-1 mx-md-0 px-md-0 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">USERFUL</h6>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none `}>
                      COLLECTIONS
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none`}>
                      SIZE GUIDE
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className={`text-reset text-decoration-none`}>
                      LOOKBOOK
                    </a>
                  </p>
                  <p className={`mb-4`}>
                    <a href="#!" className="text-reset text-decoration-none">
                      INSTAGRAM SHOP
                    </a>
                  </p>
                </div>

                <div className="  col-md-12 col-lg-3 col-xl-3 mx-lg-0 p-lg-0 mt-lg-0 ms-md-5 ps-md-4 mt-md-5 mx-auto mb-md-0 mb-4 ">
                  <h6 className="text-uppercase fw-bold mb-4 ">Contact us</h6>
                  <div className="d-flex  me-3 mb-3 gap-3 align-items-center">
                    {/* <img className={`${styles["img-right"]}`} src={email} alt="/" /> */}
                    <p>info@coffeeGayoe.com</p>
                  </div>
                  <div className="d-flex me-3 mb-3 gap-3 align-items-center">
                    {/* <img className={`${styles["img-right"]}`} src={phone} alt="/" /> */}
                    <p>+44.954.954.86</p>
                  </div>
                  <div className="d-flex me-3 mb-3 gap-3 align-items-center">
                    {/* <img className={`${styles["img-right"]}`} src={time} alt="/" /> */}
                    <p>9:00am - 19:00pm Monday - Sunday</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-center pt-4 `}>© 2023 COFFEE GAYOE STORE ALL RIGHT RESERVED</div>
          </section>
        </footer>
      </div>
    </>
  );
}

export default Footer;
