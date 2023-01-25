/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import styles from "../styles/NewProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

// Import Image

import foto from "../assets/images/nofoto.jpg";
import { Navigate, useNavigate } from "react-router-dom";

function NewProduct() {
  const [imgPrev, setImgPrev] = useState("");
  const [image, setImage] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
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

  const handleProduct = (e) => {
    setProduct_name(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const addProduct = (e) => {
    console.log(image);
    setLoading(true);
    const token = localStorage.getItem("token");
    e.preventDefault();
    let formdata = new FormData();
    if (image) formdata.append("image", image);
    if (product_name) formdata.append("product_name", product_name);
    if (price) formdata.append("price", price);
    if (stock) formdata.append("stock", stock);
    if (category) formdata.append("category", category);
    if (description) formdata.append("description", description);
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/product`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
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
    toast.success("Success Create New Product !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
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
              <img
                className={styles["images"]}
                // src={foto}
                src={!image ? foto : imgPrev}
                alt=""
              />
            </div>
            <div className={`container $styles{["cont-btn"]}`}>
              <button className={`btn btn-dark mb-2 mt-2 ${styles["btn-checkout"]} ${styles["btn-up"]}`}>Take a picture</button>
              <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-down"]}`}>
                <p className={`${styles.select}`}>Choose from gallery</p>
                <input id="files" type="file" name="file" className={styles.hiddenz} onChange={handleImage} />
              </button>
            </div>
            <div className={`${styles["form-group"]} ${styles.top} ${styles["stock"]}`}>
              <label className={styles["label"]}>Input stock :</label>
              <input className={`form-control ${styles["hour"]}`} onChange={handleStock} placeholder="Input stock"></input>
            </div>
          </div>
          <div className={`container`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Name :</p>
                    <input className={styles["input"]} type="text" placeholder="Type product name min. 50 characters" onChange={handleProduct} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Category :</p>
                    <input className={styles["input"]} type="text" placeholder="Type the categoty" onChange={handleCategory} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Price :</p>
                    <input className={styles["input"]} type="text" placeholder="Type the price" onChange={handlePrice} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Description :</p>
                    <input className={styles["input"]} type="text" placeholder="Describe your product min. 150 characters" onChange={handleDescription} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["btn-save-product"]}>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-up-2"]}`} onClick={addProduct}>
                Save Product
              </button>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-down-2"]}`}>Cancel </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </section>
      <footer className={`container ${styles["cont-footer"]}`}>
        <Footer />
      </footer>
    </>
  );
}

export default NewProduct;
