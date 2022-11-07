import React from "react";
// import NewNavbar from "../Component/NewNavbar";
import Navbar from "../Component/Navbar";
import styles from "../styles/NewProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";

// Import Image
import bg from "../assets/images/bg-foto.png";
import foto from "../assets/images/foto.png";
import bgyel from "../assets/images/yellow-Rectangle.png";
import grey from "../assets/images/grey-ellips.png";

function NewProduct() {
  return (
    <>
      <header className={`container ${styles["header"]}`}>
        <Navbar />
      </header>
      <section className={`container ${styles["sect-1"]}`}>
        <p className="container">
          Favorite & Promo <strong> &gt; Add new product</strong>
        </p>
        <div className={`container ${styles["main"]}`}>
          <div className={`container ${styles[""]}`}>
            <div className={`container {styles["image"]}`}>
              <img className={styles["bg-image"]} src={bg} alt="background" />
              <img className={styles["images"]} src={foto} alt="background" />
            </div>
            {/* <div className="container d-flex row   "> */}
            <div className={`container $styles{["cont-btn"]}`}>
              <button className={`btn btn-dark mb-2 mt-2 ${styles["btn-checkout"]} ${styles["btn-up"]}`}>Take a picture</button>
              <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-down"]}`}>Choose from gallery</button>
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["label"]}>Delivery Hour :</label>
              <input className={`form-control ${styles["hour"]}`} placeholder="Select start hour"></input>
              <input className={`form-control ${styles["hour"]}`} placeholder="Select start hour"></input>
            </div>
            <div className={`${styles["form-group"]} ${styles["stock"]}`}>
              <label className={styles["label"]}>Input stock :</label>
              <input className={`form-control ${styles["hour"]}`} placeholder="Input stock"></input>
            </div>
          </div>
          <div className={`container`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Name :</p>
                    <input className={styles["input"]} type="text" placeholder="Type product name min. 50 characters" />
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Price :</p>
                    <input className={styles["input"]} type="text" placeholder="Type the price" />
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Description :</p>
                    <input className={styles["input"]} type="text" placeholder="Describe your product min. 150 characters" />
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Input product size :</p>
                    <input className={styles["input"]} type="text" placeholder="Click size you want to use for this product" />
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
                    <p className={styles["title-name"]}>Input delivery methods :</p>
                    <input className={styles["input"]} type="text" placeholder="Click methods you want to use for this product" />
                    <hr className={styles["my-1"]} />
                    <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-delivery"]}`}>Home Delivery</button> <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-delivery"]}`}>Dine in</button>{" "}
                    <button className={`btn ${styles["btn-checkout"]} ${styles["btn-delivery"]} ${styles["btn-delivery-3"]}`}>Take away</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["btn-save-product"]}>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-up-2"]}`}>Save Product</button>
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

export default NewProduct;
