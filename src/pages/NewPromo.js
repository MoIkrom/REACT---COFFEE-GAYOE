/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Component/Navbar";
// import styles from "../styles/NewPromo.module.css";

import styles from "../styles/NewProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import { Navigate, useNavigate } from "react-router-dom";

// Import Image
import bg from "../assets/images/bg-foto.png";
// import foto from "../assets/images/foto.png";
import foto from "../assets/images/nofoto.jpg";

function NewPromo() {
  const [image, setImage] = useState("");
  const [imgPrev, setImgPrev] = useState("");
  const [promo_name, setPromo_name] = useState("");
  const [price, setPrice] = useState("");
  const [valid, setValid] = useState("");
  const [discount, setDiscount] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImgPrev(URL.createObjectURL(e.target.files[0]));
  };
  const handleFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handlePromoname = (e) => {
    setPromo_name(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handleValid = (e) => {
    setValid(e.target.value);
  };
  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const addPromo = (e) => {
    console.log(image);
    setLoading(true);
    const token = localStorage.getItem("token");
    e.preventDefault();
    let formdata = new FormData();
    if (image) formdata.append("image", image);
    if (promo_name) formdata.append("promo_name", promo_name);
    if (price) formdata.append("price", price);
    if (valid) formdata.append("valid", valid);
    if (discount) formdata.append("discount", discount);
    if (description) formdata.append("description", description);
    if (code) formdata.append("code", code);
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/promo`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        SuccessMessage();
        setLoading(false);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setTimeout(() => navigate("/product"), 3000);
      })
      .catch((err) => {
        console.log(err.response.data.msg);

        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const SuccessMessage = () => {
    toast.success("Data Save Change !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  return (
    <>
      <header className={`container ${styles["header"]}`}>
        <Navbar />
      </header>
      <section className={`container ${styles["sect-1"]} ${styles["sect-1-promo"]}`}>
        <p className="container">
          Promo <strong className={styles["strong"]}> &gt; Add new promo</strong>
        </p>
        <div className={`container ${styles["main"]}`}>
          <div className={`container ${styles[""]}`}>
            <div className={`container {styles["image"]}`}>
              <img className={styles["images"]} src={!image ? foto : imgPrev} alt="" />
            </div>
            <div className={`container $styles{["cont-btn"]}`}>
              <button className={`btn btn-dark mb-2 mt-2 ${styles["btn-checkout"]} ${styles["btn-up"]}`}>Take a picture</button>
              <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-down"]}`}>
                <p className={`${styles.select}`}>Choose from gallery</p>
                <input id="files" type="file" name="file" className={styles.hiddenz} onChange={handleImage} />
              </button>
            </div>
            <div className={styles["cont-form-group"]}>
              <div className={styles["form-group"]}>
                <label className={styles["label"]}>Enter the discount :</label>
                <input className={`form-control ${styles["hour"]}`} placeholder="Input discount" onChange={handleDiscount}></input>
              </div>
              <div className={`${styles["form-group"]} ${styles["stock"]}`}>
                <label className={styles["label"]}>Expire date :</label>
                <input className={`form-control ${styles["hour"]}`} placeholder="Select end date" onChange={handleValid}></input>
              </div>
              <div className={`${styles["form-group"]} ${styles.codes}`}>
                <label className={styles["label"]}>Input coupon code :</label>
                <input className={`form-control ${styles["hour"]}`} placeholder="Input stock" onChange={handleCode}></input>
              </div>
            </div>
          </div>
          <div className={`container`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Name :</p>
                    <input className={styles["input"]} type="text" placeholder="Type promo name min. 50 characters" onChange={handlePromoname} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Normal Price :</p>
                    <input className={styles["input"]} type="text" placeholder="Type the normal price" onChange={handlePrice} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Description :</p>
                    <input className={styles["input"]} type="text" placeholder="Describe your product min. 150 characters" onChange={handleDescription} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles["btn-save-product"]} ${styles.btnsavepromo}`}>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-up-2"]}`} onClick={addPromo}>
                Save Promo
              </button>
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

export default NewPromo;
