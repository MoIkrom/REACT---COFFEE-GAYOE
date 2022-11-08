import React from "react";
// import NewNavbar from "../Component/NewNavbar";
import Navbar from "../Component/Navbar";
import styles from "../styles/EditPromo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

// Import Image

import bgyel from "../assets/images/yellow-Rectangle.png";
import grey from "../assets/images/grey-ellips.png";
import beef from "../assets/images/beef-spagheti.png";

function EditPromo() {
  return (
    <>
      <header className={`container ${styles["header"]}`}>
        <Navbar />
      </header>
      <section className={`container ${styles["sect-1"]}`}>
        <div className={`container ${styles["cont-title"]}`}>
          <p className={styles["edit-promo"]}>
            Favorite & Promo <strong className={styles["strong"]}> &gt; Edit promo</strong>
          </p>
          <p>
            <strong className={styles["strong"]}>
              <Link className={styles["cancel"]} to={"/product"}>
                cancel
              </Link>
            </strong>
          </p>
        </div>

        <div className={`container ${styles["main"]}`}>
          <div className={`container ${styles[""]}`}>
            <div className={`container ${styles["cont-promos"]}`}>
              <div className={`container ${styles["coupon-card"]}`}>
                <img className={styles["beef"]} src={beef} alt="coupon" />
                <p className={styles["card-text-1"]}>
                  Beef Spaghetti
                  <br />
                  20%OFF
                </p>
                <p className={styles["off"]}>Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</p>

                <p>-----------------------------------</p>
                <p className={styles["code-coupon"]}>COUPON CODE</p>
                <p className={styles["code-text-1"]}>FNPR15RG</p>
                <p className={styles["code-text-2"]}>Valid untill October 10th 2020</p>
              </div>
              <div className={styles["input-stock"]}>
                <div className={`${styles["form-group"]} ${styles["stock"]}`}>
                  <label className={styles["label"]}>Expire date :</label>
                  <input className={`form-control ${styles["hour"]}`} placeholder="Select start date"></input>
                  <input className={`form-control ${styles["hour"]}`} placeholder="Select end date"></input>
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles["label"]}>Input coupon code :</label>
                  <input className={`form-control ${styles["hour"]}`} placeholder="Input stock"></input>
                </div>
              </div>
            </div>
          </div>
          <div className={`container`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <div className={`container ${styles["cont-email"]}`}>
                <div className={`container ${styles["cont-right"]}`}>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Name :</p>
                    <input className={styles["input"]} type="text" />
                    Beef Spaghetti
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Normal Price :</p>
                    <input className={styles["input"]} type="text" />
                    70.000
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Description :</p>
                    <input className={styles["input"]} type="text" />
                    Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Input product size :</p>
                    <p className={`${styles["input"]} ${styles["click-size"]}`} />
                    Click size you want to use for this product
                    <div className={styles["box-size"]}>
                      <img src={bgyel} alt="]}/" />
                      <p className={styles["size"]}>R</p>
                      <img src={bgyel} alt="]}/" />
                      <p className={`${styles["size"]} ${styles["size-2"]}`}>L</p>
                      <img src={bgyel} alt="]}/" />
                      <p className={`${styles["size"]} ${styles["size-3"]}`}>XL</p>
                      <img className={styles["ellips"]} src={grey} alt="]}/" />
                      <p className={styles["weight"]}>250gr</p>
                      <img className={styles["ellips"]} src={grey} alt="]}/" />
                      <p className={`${styles["weight"]} ${styles["weight-2"]}`}>300gr</p>
                      <img className={styles["ellips"]} src={grey} alt="]}/" />
                      <p className={`${styles["weight"]} ${styles["weight-3"]}`}>500gr</p>
                    </div>
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={`${styles["title-name"]} ${styles["input-delivery"]}`}>Input delivery methods :</p>
                    <p className={`${styles["input"]} ${styles["click-size"]}`} />
                    Click methods you want to use for this promo
                    <hr className={styles["my-1"]} />
                    <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-delivery"]}`}>Home Delivery</button> <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-delivery"]}`}>Dine in</button>{" "}
                    <button className={`btn ${styles["btn-checkout"]} ${styles["btn-delivery"]} ${styles["btn-delivery-3"]}`}>Take away</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["btn-save-product"]}>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-up-2"]}`}>Save Promo</button>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-down-2"]}`}>Cancel </button>
            </div>
          </div>
        </div>
      </section>
      <footer className={`container ${styles["cont-footer"]}`}>
        <Footer />
      </footer>
    </>
  );
}

export default EditPromo;
