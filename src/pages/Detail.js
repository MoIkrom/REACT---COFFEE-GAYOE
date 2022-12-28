/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from "../styles/Detail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { TabTitle } from "../utils/General-funct.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/action/auth";

// IMport Images
import image from "../assets/images/detail-image.png";
import bgyel from "../assets/images/yellow-Rectangle.png";

const Detail = ({ route }) => {
  TabTitle("Detail - Coffee Gayoe");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const getProductByid = (id) => {
    // setLoading(true);
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
  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  useEffect(() => {
    getProductByid(id);
    // console.log(id);
  }, [id]);
  return (
    <>
      <div className={`${styles["navs"]}`}>
        <Navbar />
      </div>
      <section className={`container ${styles["cold-brew"]}`}>
        <div>
          <p>
            Favorite & Promo <strong> &gt; {product.product_name}</strong>
          </p>
          <img className={styles["image"]} src={product.image} alt="/" />
        </div>

        <div className={`card ${styles["delivery-time"]}`}>
          <p className={styles["text-delivery"]}>
            Delivery only <strong> on Monday to friday</strong> at <strong>1 - 7 pm </strong>
          </p>
          <p className={styles["text-delivery"]}>{product.description}</p>
          <p className={styles["choose"]}>Choose a size</p>
          <div className={`container ${styles["size"]}`}>
            <div>
              <img className={styles["bgyel"]} src={bgyel} alt="/" />
              <span className={styles["regular"]}>R</span>
            </div>
            <div>
              <img className={styles["bgyel"]} src={bgyel} alt="/" />
              <span className={styles["large"]}>L</span>
            </div>
            <div>
              <img className={styles["bgyel"]} src={bgyel} alt="/" />
              <span className={styles["xl"]}>XL</span>
            </div>
          </div>
          <div className={`container ${styles["methode-dev"]}`}>
            <h1 className={styles["text-dev"]}>Choose Delivery Methods</h1>
            <div className="container">
              <button className={`btn ${styles["btn-D"]}`}>Dine in</button>
              <span>
                <button className={`btn btn-outline-secondary ${styles["btn-del"]}`}>Door Delivery</button>
                <button className={`btn btn-outline-secondary ${styles["btn-P"]}`}> Pick Up</button>
              </span>
              <p className={styles["set-time"]}>
                Set time :
                <span>
                  <input className={styles["input-time"]} type="text" placeholder="Enter the time you’ll arrived" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <h1 className={styles["desc-brew"]}>
          {product.product_name}
          <p className={styles["price"]}>{`${"Rp"} ${costing(product.price)}`}</p>
        </h1>

        <button className={`btn btn-warning ${styles["btn-cart"]}`}>Add to Cart</button>
        <br />
        <button className={`btn btn-success ${styles["btn-staff"]}`}>Ask a Staff</button>
      </div>
      <div className={`container ${styles["cont-card"]}`}>
        <div className={`card ${styles["card-down"]}`}>
          <img className={styles["image-coffee"]} src={image} alt="coffee" />
          <h1 className={styles["title-coffee"]}>COLD BREW</h1>
          <p className={styles["size-coffee"]}> x1 (Large)</p>
          <p className={styles["size-coffee"]}>x1 (Regular)</p>
        </div>

        <button className={`btn btn-warning ${styles["btn-checkout"]}`}>Checkout</button>
      </div>

      <footer className={`container ${styles["footer"]}`}>
        <Footer />
      </footer>
    </>
  );
};

export default Detail;
