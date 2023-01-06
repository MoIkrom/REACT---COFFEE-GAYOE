/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import NewNavbar from "../Component/NewNavbar";
import Navbar from "../Component/Navbar";
import styles from "../styles/NewProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

// Import Image

import foto from "../assets/images/nofoto.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import Product from "./Product";

function NewProduct() {
  const [image, setImage] = useState("");
  const [imgPrev, setImgPrev] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const url = window.location.pathname;
  //   const id = url.substring(url.lastIndexOf("/") - 2);
  //   const id =    url.split("/");
  const id = url.split("/")[2];
  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const getProductByid = (id) => {
    console.log(id);
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/product/${id}`)
      .then((res) => {
        setProduct(res.data.result.data[0]);
        setLoading(false);
        // console.log(res.data.result.data);
      })

      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  useEffect(() => {
    getProductByid(id);
    setLoading(false);
  }, [id]);

  const handleCancel = () => {
    setImage(product.image);
    setProduct_name(product.product_name);
    setPrice(product.price);
    setStock(product.stock);
    setCategory(product.category);
    setDescription(product.description);
  };
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

  const editProduct = (e) => {
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
      .patch(`https://coffee-gayoe.vercel.app/api/v1/product/${id}`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        SuccessMessage();
        setLoading(false);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setTimeout(() => navigate(`/product`), 2000);
      })
      .catch((err) => {
        console.log(err.response.data.msg);

        toast.error("Cannot Edit Product !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      });
  };
  const SuccessMessage = () => {
    toast.success("Edit Product Success !", {
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
          Product Detail <strong> &gt; Edit Product</strong>
        </p>
        <div className={`container ${styles["main"]}`}>
          <div className={`container ${styles[""]}`}>
            <div className={loading ? `${styles["none"]}}` : `container ${styles["image"]}`}>
              <img
                className={styles["images"]}
                // src={foto}
                src={!image ? product.image : imgPrev}
                alt=""
              />
            </div>
            {/* <div className="container d-flex row   "> */}
            <div className={`container $styles{["cont-btn"]}`}>
              <button className={`btn btn-dark mb-2 mt-2 ${styles["btn-checkout"]} ${styles["btn-up"]}`}>Take a picture</button>
              <button className={`btn btn-warning ${styles["btn-checkout"]} ${styles["btn-down"]}`}>
                <p className={`${styles.select}`}>Choose from gallery</p>
                <input id="files" type="file" name="file" className={styles.hiddenz} onChange={handleImage} />
              </button>
            </div>

            <div className={`${styles["form-group"]} ${styles["stock"]}`}>
              <label className={styles["label"]}>Input stock :</label>
              <input className={`form-control ${styles["hour"]}`} onChange={handleStock} placeholder={product.stock}></input>
            </div>
          </div>
          <div className={`container`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Name :</p>
                    <input className={styles["input"]} type="text" placeholder={product.product_name} onChange={handleProduct} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Category :</p>
                    <input className={styles["input"]} type="text" placeholder={product.category} onChange={handleCategory} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}> Price :</p>
                    <input className={styles["input"]} type="text" placeholder={`${"Rp"} ${costing(product.price)}`} onChange={handlePrice} />
                  </div>
                  <div className={styles["placeholder"]}>
                    <p className={styles["title-name"]}>Description :</p>
                    <input className={styles["input"]} type="text" placeholder={product.description} onChange={handleDescription} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["btn-save-product"]}>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-up-2"]}`} onClick={editProduct}>
                {loading ? (
                  <>
                    <div className={styles["lds-ring"]}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <p className={styles["loading-text"]}>Loading . . .</p>
                  </>
                ) : (
                  " Save Product"
                )}
              </button>
              <button className={`btn ${styles["btn-save"]} ${styles["btn-down-2"]}`} onClick={handleCancel}>
                Cancel{" "}
              </button>
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
