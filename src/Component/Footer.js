import React from "react";
import "../styles/Footer.css";

import icon_instagram from "../assets/images/Instagram.png";
import icon_facebook from "../assets/images/Facebook.png";
import icon_twitter from "../assets/images/Twitter.png";

function Footer() {
  return (
    <>
      <div>
        <footer className=" text-center text-lg-start bg-light text-muted">
          <section className="p-4 pt-0 px-md-0 bg-light">
            <div className="container text-center text-md-start mt-5">
              <div className="row justify-content-evenly mt-3">
                <div className="col-md-5 col-lg-4 col-xl-3 ms-0 mt-4 border-bottom borderz mb-5">
                  <h6 className="text-uppercase fw-bold mb-4 ">Coffee Gayoe</h6>
                  <p>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
                  <div className="mt-3">
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className="icon" src={icon_facebook} alt="/" />
                    </a>
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className="icon" src={icon_twitter} alt="/" />
                    </a>
                    <a href=" " className="me-md-2 me-3 text-reset">
                      <img className="icon" src={icon_instagram} alt="/" />
                    </a>
                  </div>
                </div>

                <div className="col-6 col-md-3 col-lg-2 col-xl-2 mt-md-4 text-start text-md-center mx-md-0 px-md-0 mx-auto mb-4 show_hp">
                  <h6 className="text-uppercase fw-bold mb-4 title-footer">COMPANY</h6>
                  <p className="mb-4 ">
                    <a href="#!" className="text-reset text-decoration-none li">
                      ABOUT US
                    </a>
                  </p>

                  <p className="mb-4 ">
                    <a href="#!" className="text-reset text-decoration-none li">
                      LICENSES
                    </a>
                  </p>
                  <p className="mb-4 ">
                    <a href="#!" className="text-reset text-decoration-none li">
                      HELP CENTER
                    </a>
                  </p>
                </div>

                <div className="col-6 col-md-3 col-lg-3 col-xl-3 mx-lg-0 p-0 mt-lg-4 mt-md-4  text-start text-md-center text-lg-center m-md-0 mx-auto mb-4 show_hp">
                  <h6 className="text-uppercase fw-bold mb-4 ">Contact us</h6>
                  <div className="d-flex m-md-0 me-3 mb-3 gap-3 text-center justify-content-start justify-content-md-center  justify-content-lg-center ">
                    <p className="mb-md-2 m-0">info@coffeeGayoe.com</p>
                  </div>
                  <div className="d-none d-md-flex mb-0 me-3 gap-3 align-items-center">
                    <p className="m-md-0"> </p>
                  </div>
                  <div className="d-flex flex-column col-12 me-3 mb-3 align-items-start align-items-md-center">
                    <p className="m-0">9:00am - 19:00pm </p>
                    <p className="m-md-0">Monday - Sunday</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pt-4">
              <u>© 2023 COFFEE GAYOE STORE ALL RIGHT RESERVED</u>
            </div>
          </section>
        </footer>
      </div>
    </>
  );
}

export default Footer;
