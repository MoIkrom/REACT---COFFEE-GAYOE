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
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// IMport Images
import image from "../assets/images/detail-image.png";

const Detail = ({ route }) => {
  TabTitle("Detail - Coffee Gayoe");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [size, setSize] = useState("Regular");
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const products = useSelector((state) => state.auth.product);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const min = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };

  const max = () => {
    setQuantity(quantity === 10 ? 10 : quantity + 1);
  };

  const deleteProductByid = (id) => {
    // setLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const url = window.location.pathname;
    const idproduct = url.substring(url.lastIndexOf("/") + 1);
    axios
      .delete(`https://coffee-gayoe.vercel.app/api/v1/product/${idproduct}`, { headers: { "x-access-token": token } }, role)
      .then((res) => {
        console.log(id);
        console.log(res);
      })

      .catch((err) => {
        console.log(err.response.data.msg);
        console.log(idproduct);
      });
  };
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
    setLoading(true);
    // setLoading(true);
    // console.log(id);
  }, [id]);

  const handleRedux = () => {
    dispatch(
      authAction.productThunk({
        id: product.id,
        price: product.price,
        product_name: product.product_name,
        total: 0,
        image: product.image,
        qty: quantity,
        size: size,
        shiping: parseInt(value),
      })
    );
    navigate("/cart");
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={`${styles["navs"]}`}>
        <Navbar />
      </div>

      {loading ? (
        <>
          <div className={styles["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className={styles["loading-text"]}>Loading</p>
        </>
      ) : (
        <>
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
                <div
                  className={size === "Regular" ? styles["cont-sizes"] : styles["cont-size"]}
                  onClick={() => {
                    setSize("Regular");
                  }}
                >
                  <p className={styles["regular"]}>R</p>
                </div>
                <div
                  className={size === "Large" ? styles["cont-sizes"] : styles["cont-size"]}
                  onClick={() => {
                    setSize("Large");
                  }}
                >
                  <p className={styles["large"]}>L</p>
                </div>
                <div
                  className={size === "Extra Large" ? styles["cont-sizes"] : styles["cont-size"]}
                  onClick={() => {
                    setSize("Extra Large");
                  }}
                >
                  <p className={styles["xl"]}>XL</p>
                </div>
              </div>
              <div className={`container ${styles["methode-dev"]}`}>
                <h1 className={styles["text-dev"]}>Choose Delivery Methods</h1>
                <div className="container">
                  <button
                    className={value === "1" ? `btn btn-outline-secondary ${styles["btn-dels"]}` : `btn btn-outline-secondary ${styles["btn-del"]}`}
                    onClick={() => {
                      setValue("1");
                    }}
                  >
                    Dine in
                  </button>
                  <span>
                    <button
                      className={value === "2" ? `btn btn-outline-secondary ${styles["btn-dels"]}` : `btn btn-outline-secondary ${styles["btn-del"]}`}
                      onClick={() => {
                        setValue("2");
                      }}
                    >
                      Door Delivery
                    </button>
                    <button
                      className={value === "3" ? `btn btn-outline-secondary ${styles["btn-dels"]}` : `btn btn-outline-secondary ${styles["btn-del"]}`}
                      onClick={() => {
                        setValue("3");
                      }}
                    >
                      {" "}
                      Pick Up
                    </button>
                  </span>
                  {/* <p className={styles["set-time"]}>
                    Set time :
                    <span>
                      <input className={styles["input-time"]} type="text" placeholder="Enter the time you’ll arrived" />
                    </span>
                  </p> */}
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <h1 className={styles["desc-brew"]}>
              {product.product_name}
              <p className={styles["price"]}>{`${"Rp"} ${costing(product.price)}`}</p>
            </h1>
          </div>
          <div className={`container ${styles.buttongroup}`}>
            <button className={`btn btn-warning ${styles["btn-cart"]}`} onClick={handleRedux}>
              Add to Cart
            </button>
            {/* <br /> */}
            <button className={`btn btn-success ${styles["btn-staff"]}`}>{role === "user" ? "Ask a Staff" : "Edit Product"}</button>
            <button
              className={role === "admin" ? `btn ${styles["btn-delete"]}` : `${styles.none}`}
              onClick={() => {
                handleShowModal();
              }}
            >
              Delete Menu
            </button>
          </div>
          <div className={`container ${styles["cont-card"]}`}>
            <div className={`card ${styles["card-down"]} d-flex`}>
              <div className="col-lg-6">
                <img className={styles["image-coffee"]} src={product.image} alt="coffee" />
                <div>
                  <h1 className={styles["title-coffee"]}>{product.product_name}</h1>
                  <p className={styles["size-coffee"]}>
                    {" "}
                    x {quantity} ({size})
                  </p>
                </div>
              </div>
              <nav className={`${styles.cursors} col-lg-6`}>
                <ul className="pagination pagination-sm">
                  <li className={`page-item white ${styles.box}`}>
                    <span className={`page-link ${styles["blacks"]}`} onClick={min}>
                      -
                    </span>
                  </li>
                  <li className={`page-item white ${styles.box}`}>
                    <span className={`page-link ${styles["blacks"]}`}>{quantity}</span>
                  </li>
                  <li className={`page-item white ${styles.box}`}>
                    <span className={`page-link ${styles["blacks"]}`} onClick={max}>
                      +
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <button className={`btn btn-warning ${styles["btn-checkout"]}`} onClick={handleRedux}>
              Checkout
            </button>
          </div>
          <ToastContainer />
          <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>are you sure you want Delete this Product ?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="fw-bold text-bg-secondary text-white"
                onClick={() => {
                  deleteProductByid();
                  toast.success("Delete Product Success", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
                  handleCloseModal();
                  setTimeout(() => {
                    navigate("/product");
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }, 2000);
                }}
              >
                Yes
              </Button>
              <Button variant="success" className="fw-bold text-bg-success text-white" onClick={handleCloseModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      <footer className={`container ${styles["footer"]}`}>
        <Footer />
      </footer>
    </>
  );
};

export default Detail;
