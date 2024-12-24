/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { TabTitle } from "../utils/General-funct.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";

import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { transactions } from "../utils/api.js";
// import Navbar & Footer
import Navbar from "../Component/Navbar.js";
import Footer from "../Component/Footer.js";

// import Css
import "../styles/Payment.css";

// import image
import icon_card from "../assets/images/card-py.png";
import icon_cod from "../assets/images/cod.png";
import icon_bank from "../assets/images/bank.png";
import foto from "../assets/images/image-none.jpg";

const Payment = () => {
  TabTitle("Payment - Coffee Gayoe");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.items);
  const [profile, setProfile] = useState({});
  const [products, setProducts] = useState([]); // Untuk menyimpan produk yang dipilih
  const [form, setForm] = useState(null); // Misalnya untuk pembayaran
  const [statusPaid, setStatusPaid] = useState("pending");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  // Fungsi untuk menghitung subtotal
  const subTotal = (items) => {
    return items.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  };

  // Fungsi untuk menghitung pajak berdasarkan subtotal
  const Tax = (subTotal) => {
    return subTotal * 0.1; // Pajak 10%
  };

  // Fungsi untuk menghitung total
  const Total = (items) => {
    const sub_total = subTotal(items); // Subtotal dari cart
    const tax = Tax(sub_total); // Pajak berdasarkan subtotal
    return sub_total + tax; // Total keseluruhan
  };

  const Host = process.env.REACT_APP_BACKEND_HOST;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token untuk mendapatkan payload
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Ambil id dari payload

      axios
        .get(`${Host}/api/v1/users/${userId}`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          setProfile(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Host]);

  const handleTransactions = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    // Menyusun data transaksi untuk dikirimkan ke backend
    const transactionData = {
      user_id: profile.id, // Mengambil id user dari state profile
      items: cart.items.map((item) => ({
        product_id: item.id, // Mengambil product_id dari cart.items
        quantity: item.quantity, // Mengambil quantity dari cart.items
      })),
      total_belanja: Total(cart.items), // Menghitung total belanja dari items di cart
      status: "pending", // Status transaksi, bisa diganti sesuai kebutuhan
    };

    // Kirim data transaksi
    axios
      .post(`${Host}/api/v1/transactions`, transactionData, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        // Clear cart from Redux
        dispatch(resetCart());
        toast.success("Payment Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
        setTimeout(() => {
          navigate("/history");
        }, 700);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Payment Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleIncrement = (id, quantity) => {
    if (quantity < 10) {
      dispatch(incrementQuantity(id));
    }
  };
  const handleDeleteItem = (id) => {
    dispatch(removeItemFromCart(id)); // Kirim `id` sebagai payload
    console.log("Item removed:", id);
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    }
  };
  return (
    <>
      <Navbar />
      <div className=" background-payment">
        <div className="  ">
          <div className=" d-flex ">
            <div className=" d-flex col-lg-6 col-12 justify-content-center align-items-center mt-5 mt-lg-0">
              <h3 className="text-lg-center me-3 pb-4 text-white">
                Checkout your <br className="d-none d-lg-flex"></br> item now!
              </h3>
            </div>
            <div className="d-none d-lg-flex col-6"></div>
          </div>

          <div className="d-flex pb-5 flex-lg-row flex-column">
            <div className="d-flex justify-content-center alig-items-center col-lg-6">
              <div className="col-lg-12 col-10 bg-white rounded-5 ">
                <div>
                  <div className="text-center p-4">
                    <h2
                      className="text-decoration-underline"
                      style={{
                        fontFamily: "Poppins",
                        color: "#362115",
                        fontWeight: "500",
                      }}
                    >
                      Order Summary
                    </h2>
                  </div>
                  <div
                    className="container overflow-auto "
                    style={{
                      height: "400px",
                    }}
                  >
                    {cart.items.length > 0 ? (
                      cart.items.map((products) => (
                        <div
                          key={products.id}
                          className="d-flex mb-4 border border-2 border-warning rounded p-4 mx-3"
                        >
                          <div className="col-lg-4 col-3 d-flex justify-content-lg-center align-items-center">
                            <img
                              className="rounded img-cart"
                              src={
                                products.image === null
                                  ? foto
                                  : `${Host}/${products.image}`
                              }
                              alt="product-img"
                            />
                          </div>
                          <div className="d-flex col-12 col-lg-8 gap-4 gap-lg-0 flex-col-lg-8 justify-content-lg-between align-items-center">
                            <div className="payment-center col-4 col-lg-7 text-mobile">
                              <p className="mb-0">{products.product_name}</p>
                              <p className="mb-0">( {products.quantity} x )</p>
                              <p className="mb-0">
                                {`${"Rp"} ${costing(products.price)}`}
                              </p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                              <p className="mb-0 payment-center text-mobile">
                                {`${"Rp"} ${costing(
                                  products.price * products.quantity
                                )}`}
                              </p>
                              <nav className=" text-mobile">
                                <ul className="pagination  m-0 ">
                                  <li className="page-item white">
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        width: "20px",
                                        height: "25px",
                                      }}
                                      className=" page-link , blacks"
                                      onClick={() =>
                                        handleDecrement(
                                          products.id,
                                          products.quantity
                                        )
                                      }
                                      disabled={products.quantity === 1} // Disable jika quantity 1
                                    >
                                      -
                                    </span>
                                  </li>
                                  <li className="page-item white">
                                    <span
                                      className="page-link p-0 blacks"
                                      style={{
                                        fontSize: "14px",
                                        width: "30px",
                                        height: "25px",
                                      }}
                                    >
                                      {products.quantity}
                                    </span>
                                  </li>
                                  <li className="page-item white">
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        width: "20px",
                                        height: "25px",
                                      }}
                                      className="page-link p-0 blacks"
                                      onClick={() =>
                                        handleIncrement(
                                          products.id,
                                          products.quantity
                                        )
                                      }
                                      disabled={products.quantity === 10} // Disable jika quantity 10
                                    >
                                      +
                                    </span>
                                  </li>
                                </ul>
                              </nav>
                              <button
                                className="btn btn-danger p-0 px-2 mt-2"
                                style={{
                                  height: "20px",
                                  fontSize: "10px",
                                  fontWeight: "500",
                                }}
                                onClick={() => handleDeleteItem(products.id)}
                              >
                                Delete item
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex justify-content-center align-items-center ">
                        <p>No items in cart</p>
                      </div>
                    )}
                  </div>

                  <hr className="m-4 "></hr>
                  <div className="total-payment d-flex justify-content-between mx-4 px-3 ">
                    <div className=" total-payment-left">
                      <p className="m-0">SUBTOTAL</p>
                      <p className="m-0">TAX ( 10%) </p>
                    </div>
                    <div className="total-payment-right">
                      <p className="m-0">{`Rp ${costing(
                        subTotal(cart.items)
                      )}`}</p>

                      <p className="m-0">{`Rp ${costing(
                        Tax(subTotal(cart.items))
                      )}`}</p>
                    </div>
                  </div>
                  <div className="subtotal-payment p-4">
                    <p>TOTAL</p>
                    <p>
                      {subTotal(cart.items) === 0
                        ? "Rp 0"
                        : `Rp ${costing(Total(cart.items))}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" d-flex justify-content-center align-items-center col-lg-5 ms-lg-5 ps-lg-5 mt-5 mt-lg-0 ">
              <div className=" d-flex flex-column justify-content-center  align-items-center">
                <div className="col-12 p-md-0 atas">
                  <div className="d-flex ms-2 ms-lg-0 justify-content-between align-items-end">
                    <h2
                      style={{
                        fontfamily: "Poppins",
                        fontWeight: "700",
                        fontSize: "25px",
                        lineHeight: "38px",
                        color: " #ffffff",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      Address Detail
                    </h2>
                    <p
                      className="me-3 mb-2"
                      style={{
                        fontfamily: "Poppins",
                        fontWeight: "700",
                        fontSize: "18px",
                        color: " #ffffff",
                      }}
                    >
                      edit
                    </p>
                  </div>
                  <div className="box-address">
                    <h5 className="text-secondary">
                      Deliver to :{" "}
                      <b className="me-1 text-warning">
                        {profile.profile && profile.profile[0] ? (
                          <>
                            &nbsp; {profile.profile[0].firstname} &nbsp;
                            {profile.profile[0].lastname}
                          </>
                        ) : (
                          "No Name Available"
                        )}
                      </b>
                    </h5>

                    <h5 className="text-secondary">
                      Address :
                      <b className="me-1 text-warning">
                        {profile.profile && profile.profile[0] ? (
                          <>&nbsp; {profile.profile[0].address}</>
                        ) : (
                          "No Address Available"
                        )}
                      </b>
                    </h5>
                    <h5 className="text-secondary">
                      Phone Number :
                      <b className="me-1 text-warning">
                        {" "}
                        {profile.profile && profile.profile[0] ? (
                          <>&nbsp; {profile.profile[0].phone_number}</>
                        ) : (
                          "No Phone Number Available"
                        )}
                      </b>
                    </h5>
                  </div>
                </div>
                <div className="col-12 mt-5 mt-md-2 bawah p-md-0">
                  <div className="ms-2 ms-lg-0  payment-method">
                    <h2>Payment Method</h2>
                  </div>
                  <div className="choose-payment">
                    <form
                      className="radio-payments d-flex flex-column cursor"
                      onChange={(e) => {
                        setForm(e.target.value);
                        setStatusPaid(
                          e.target.value === "Cash On Delivery"
                            ? "Pending"
                            : "Paid"
                        );
                      }}
                    >
                      <div className="form-check d-flex flex-row align-items-center  styling-data-radio">
                        <input
                          className="form-check-input cursor"
                          type="radio"
                          value="Card"
                          name="flexRadioDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        ></label>
                        <div className="data-content-payment">
                          <img
                            src={icon_card}
                            alt="icon-card"
                            width="40px"
                            className="rounded-2 mx-3  icon_card"
                          />
                        </div>
                        <span className="spanz">Card</span>
                      </div>
                      <div className=" form-check d-flex flex-row align-items-center  styling-data-radio">
                        <input
                          className="form-check-input cursor"
                          value="Bank"
                          type="radio"
                          name="flexRadioDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        ></label>
                        <div className="data-content-payment2">
                          <img
                            src={icon_bank}
                            alt="icon-bank"
                            width="40px"
                            className="rounded-2 mx-3  icon_bank"
                          />
                        </div>
                        <span className="spanz">Bank</span>
                      </div>
                      <div className="form-check d-flex flex-row align-items-center  styling-data-radio">
                        <input
                          className="form-check-input cursor"
                          type="radio"
                          value="Cash On Delivery"
                          name="flexRadioDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        ></label>
                        <div className="data-content-payment3">
                          <img
                            src={icon_cod}
                            alt="icon-cod"
                            width="40px"
                            className=" rounded-2 mx-3  icon_cod "
                          />
                        </div>
                        <span className="spanz">Cash On Delivery</span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="p-1 col-12 mt-5 mt-md-4 confirm-pay ">
                  <button className=" rounded" onClick={handleTransactions}>
                    <span>
                      {loading ? (
                        <div className="d-flex gap-3 justify-content-center align-items-center">
                          <div
                            className="spinner-border text-black"
                            role="status"
                          ></div>
                          <div>Loading . . .</div>
                        </div>
                      ) : (
                        "Confirm and Pay"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Payment;
