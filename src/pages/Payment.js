/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { TabTitle } from "../utils/General-funct.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/action/auth";

import { useNavigate } from "react-router-dom";
import { transactions } from "../utils/api.js";
// import Navbar & Footer
import Navbar from "../Component/Navbar.js";
import Footer from "../Component/Footer.js";

// import Css
import styles from "../styles/Payment.module.css";

// import image
import icon_card from "../assets/images/card-py.png";
import icon_cod from "../assets/images/cod.png";
import icon_bank from "../assets/images/bank.png";

const Payment = () => {
  TabTitle("Payment - Coffee Gayoe");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.product);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState();
  const [statusPaid, setStatusPaid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  const getItemTotal = () => {
    let price = products.price * products.qty;
    return costing(price);
  };
  const getTax = () => {
    let taxes = products.price / 10;
    return costing(taxes);
  };
  const getShipping = () => {
    let Shipping = products.shiping === 2 ? 10000 : 0;
    return costing(Shipping);
  };
  const getTotal = () => {
    let price = products.price * products.qty;
    let taxes = products.price / 10;
    let shipping = products.shiping === 2 ? 10000 : 0;
    let total = price + taxes + shipping;
    return costing(total);
  };

  // const handleForm = () => {
  //   if (form === "1") return 5000;
  //   return 0;
  // };

  // const deliveryMethodHandler = () => {
  //   const data = {
  //     id: products.id,
  //     image: products.image,
  //     product_name: products.product_name,
  //     price: products.price,
  //     size: products.size,
  //     qty: products.qty,
  //     subTotal: products.total,
  //     total: getTotal(),
  //     shiping: getShipping(),
  //   };
  //   dispatch(authAction.productThunk(data));
  //   navigate("/product");
  // };

  const handleRemoveRedux = () => {
    dispatch(
      authAction.productThunk({
        id: null,
        image: null,
        product_name: null,
        price: 0,
        size: null,
        qty: 0,
        subTotal: 0,
        total: 0,
        shiping: null,
      })
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, { headers: { "x-access-token": token } })
      .then((res) => {
        setProfile(res.data.result.result[0]);
        console.log(`ini adalah method : ${form}`);
        console.log(`ini adalah status : ${statusPaid}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form, statusPaid]);

  const handleTransactions = () => {
    setLoading(true);
    const getToken = localStorage.getItem("token");
    // console.log(getToken);
    console.log(statusPaid);
    transactions(getToken, {
      user_id: profile.id,
      product_id: products.id,
      promo_id: null,
      qty: products.qty,
      shiping: products.shiping,
      tax: getTax(),
      total: getTotal(),
      payment: form,
      status: statusPaid,
    })
      .then((res) => {
        console.log(res);
        handleRemoveRedux();
        setLoading(false);
        navigate("/product");
      })

      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <>
      {/* <!-- Start Navbar --> */}
      <Navbar />
      {/* <!-- End Navbar --> */}

      <main>
        <div className={`container-fluid ${styles["background-payment"]}`}>
          <div className={`container ${styles["title-payment"]}`}>
            <h3>
              Checkout your <br></br> item now!
            </h3>
            <div className="row d-flex justify-content-between gap-5">
              <div className={`${styles["content-left-payment"]} col-md-5 col-sm-12 bg-white rounded-5`}>
                <div className={styles["box-left"]}>
                  <p>Order Summary</p>
                  {/* payment 1 */}
                  <div className={styles["payment-content"]}>
                    <img src={products.image} alt="Payment1" width="100px" height="100px"></img>
                    <div className={styles["payment-center"]}>
                      <p>{products.product_name}</p>
                      <p>x {products.qty}</p>
                      <p>{products.size}</p>
                    </div>
                    <div className={styles["payment-idr"]}>
                      <p>{costing(products.price)}</p>
                    </div>
                  </div>

                  {/* subtotal */}
                  <hr className="mx-5 my-4"></hr>
                  <div className={styles["total-payment"]}>
                    <div className={styles["total-payment-left"]}>
                      <p>SUBTOTAL</p>
                      <p>TAX ( 10%) </p>
                      <p>SHIPPING</p>
                    </div>
                    <div className={styles["total-payment-right"]}>
                      <p>{getItemTotal()}</p>
                      <p>{getTax()}</p>
                      <p> {getShipping()} </p>
                    </div>
                  </div>
                  <div className={styles["subtotal-payment"]}>
                    <p>TOTAL</p>
                    <p>{getTotal()}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-5 col-sm-12 d-flex flex-column mb-5">
                <div className="row d-flex flex-column">
                  <div className="col-12">
                    <div className={styles["address-detail"]}>
                      <h2>Address</h2>
                      <p>edit</p>
                    </div>
                    <div className={styles["box-address"]}>
                      <h5>
                        Delivery to : <b className="me-1"> &nbsp; {profile.display_name}</b>
                      </h5>
                      <p className={styles["address-column"]}> {profile.addres}</p>
                      <p> {profile.phone_number}</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles["payment-method"]}>
                      <h2>Payment Method</h2>
                    </div>
                    <div className={styles["choose-payment"]}>
                      <form
                        className={`${styles["radio-payment"]} ${styles["cursor"]}`}
                        onChange={(e) => {
                          setForm(e.target.value);
                          setStatusPaid(e.target.value === "Cash On Delivery" ? "Pending" : "Paid");
                        }}
                      >
                        <div className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}>
                          <input className={`form-check-input ${styles.cursor}`} type="radio" value="Card" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className={styles["data-content-payment"]}>
                            <img src={icon_card} alt="icon-card" width="40px" className={`rounded-2 mx-3 ${styles["icon_card"]}`}></img>
                          </div>
                          <span className={`${styles.spans}`}>Card</span>
                        </div>
                        <div className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}>
                          <input className={`form-check-input ${styles.cursor}`} value="Bank" type="radio" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className={styles["data-content-payment2"]}>
                            <img src={icon_bank} alt="icon-bank" width="40px" className={`rounded-2 mx-3 ${styles["icon_bank"]}`}></img>
                          </div>
                          <span className={`${styles.spans}`}>Bank</span>
                        </div>
                        <div className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}>
                          <input className={`form-check-input ${styles.cursor}`} type="radio" value="Cash On Delivery" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className={styles["data-content-payment3"]}>
                            <img src={icon_cod} alt="icon-cod" width="40px" className={`rounded-2 mx-3 ${styles["icon_cod"]}`}></img>
                          </div>
                          <span className={`${styles.spans}`}>Cash On Delivery</span>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={styles["confirm-pay"]}>
                    <button onClick={handleTransactions}>
                      <span>Confirm and Pay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- Start Footer --> */}
      <Footer />
      {/* <!-- End Footer --> */}
    </>
  );
};

export default Payment;
