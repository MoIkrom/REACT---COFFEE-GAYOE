/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/Detail.css";
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
import Card from "react-bootstrap/Card";

// Import Images
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
      <Navbar />

      {/* {loading ? (
        <>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="loading-text">Loading</p>
        </>
      ) : ( */}
      <>
        <div className="cont_1 container">
          <p>
            Favorite & Promo <strong> &gt; {product.product_name}</strong>
          </p>
          <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div className="cont_product container d-flex flex-column justify-content-center align-items-center text-center gap-3 mt-5 mt-md-0 col-md-4">
              <div className="cont_img d-flex justify-content-center align-items-center ">
                <img className="image" src={product.image} alt="/" />
              </div>
              <div className="cont_price container">
                <h1 className="desc-brew">
                  {product.product_name}
                  <p className="price">Rp {costing(product.price)}</p>
                </h1>
              </div>
            </div>
            <div className="cont_card col-md-8 container delivery-time mb-5 ps-md-5 ">
              <Card className=" cardss container font_card p-3">
                <p className="text-center ftz">
                  Delivery only <strong> on Monday to Friday</strong> at <strong>1 - 7 pm </strong>
                </p>
                <div className="mb-5 mt-md-5">
                  <h6 className="title_desc m-0 text-decoration-underline ">Description Product : </h6>
                  <p className="desc my-1 text-decoration-none ">{product.description}</p>
                </div>

                <div className="Cont_choose mb-5">
                  <p className="choose text-center">Choose a size</p>
                  <div className="container size">
                    <div
                      className={size === "Regular" ? "cont-sizes" : "cont-size"}
                      onClick={() => {
                        setSize("Regular");
                      }}
                    >
                      <p className="regular">R</p>
                    </div>
                    <div
                      className={size === "Large" ? "cont-sizes" : "cont-size"}
                      onClick={() => {
                        setSize("Large");
                      }}
                    >
                      <p className="large">L</p>
                    </div>
                    <div
                      className={size === "Extra Large" ? "cont-sizes" : "cont-size"}
                      onClick={() => {
                        setSize("Extra Large");
                      }}
                    >
                      <p className="xl">XL</p>
                    </div>
                  </div>
                </div>

                <div className="container methode-dev mb-4">
                  <h1 className="text-dev mb-3">Choose Delivery Methods</h1>
                  <div className="cont_delivery p-0 container d-flex justify-content-between">
                    <button
                      className={value === "1" ? "btn btn-outline-secondary btn-dels" : "btn btn-outline-secondary btn-del"}
                      onClick={() => {
                        setValue("1");
                      }}
                    >
                      Dine in
                    </button>
                    <button
                      className={value === "2" ? "btn btn-outline-secondary   btn-dels" : "btn btn-outline-secondary   btn-del"}
                      onClick={() => {
                        setValue("2");
                      }}
                    >
                      Delivery
                    </button>
                    <button
                      className={value === "3" ? "btn btn-outline-secondary   btn-dels" : "btn btn-outline-secondary   btn-del"}
                      onClick={() => {
                        setValue("3");
                      }}
                    >
                      Pick Up
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="cont_btn_ck container d-flex flex-column flex-md-row ">
          <div className="buttongroup container d-flex justify-content-center align-items-md-start align-items-center mb-5 ">
            {role === "admin" ? (
              ""
            ) : (
              <button className="btn btn-warning btn-cart" onClick={handleRedux}>
                Add to Cart
              </button>
            )}
            <button
              className="btn btn-success btn-staff "
              onClick={() => {
                navigate("edit-product");
                window.scrollTo(100, 100);
              }}
            >
              {role === "user" ? "Ask a Staff" : "Edit Product"}
            </button>
            <button
              className={role === "admin" ? "btn btn-delete" : "none"}
              onClick={() => {
                handleShowModal();
              }}
            >
              Delete Menu
            </button>
          </div>
          {role === "admin" ? (
            ""
          ) : (
            <div className="cont-checkOut container mb-5 ">
              <Card className="card_down d-flex ">
                <div className="cont_card_ck d-flex justify-content-evenly align-items-center">
                  <div className="cont_coffee d-flex flex-column  justify-content-center align-items-center p-3">
                    <img className="image-coffee" src={product.image} alt="coffee" />
                    <div>
                      <h1 className="title-coffee">{product.product_name}</h1>
                      <p className="size-coffee">
                        x {quantity} ({size})
                      </p>
                    </div>
                  </div>{" "}
                  <nav className="cursors col-lg-6">
                    <ul className="pagination pagination-sm m-0">
                      <li className="page-item white box">
                        <span className=" page-link   blacks" onClick={min}>
                          -
                        </span>
                      </li>
                      <li className="page-item white box">
                        <span className="page-link blacks">{quantity}</span>
                      </li>
                      <li className="page-item white box">
                        <span className="page-link   blacks" onClick={max}>
                          +
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="buts_ck mb-4 d-flex  justify-content-center align-items-center ">
                  <button className=" btn btn-warning   btn-checkout" onClick={handleRedux}>
                    Checkout
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>

        <ToastContainer />
        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            are you sure you want <strong style={{ color: "red" }}>Delete</strong> this Product ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="fw-bold text-bg-secondary text-white" onClick={handleCloseModal}>
              No
            </Button>
            <Button
              variant="success"
              className="fw-bold text-bg-success text-white"
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
          </Modal.Footer>
        </Modal>
      </>
      {/* // )} */}

      <footer className="container footer">
        <Footer />
      </footer>
    </>
  );
};

export default Detail;
