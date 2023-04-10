/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { TabTitle } from "../utils/General-funct.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/action/auth";

import { toast, ToastContainer } from "react-toastify";
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
  const products = useSelector((state) => state.auth.product);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState();
  const [statusPaid, setStatusPaid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const getItemTotal = () => {
    let price = products.price * products.qty;
    return costing(price);
  };
  const getTax = () => {
    let taxes = (products.price * products.qty) / 10;
    return costing(taxes);
  };
  const getShipping = () => {
    let Shipping = products.shiping === 2 ? 10000 : 0;
    return costing(Shipping);
  };
  const getTotal = () => {
    let price = products.price * products.qty;
    let taxes = (products.price * products.qty) / 10;
    let shipping = products.shiping === 2 ? 10000 : 0;
    let total = price + taxes + shipping;
    return parseInt(total);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTransactions = () => {
    setLoading(true);
    const getToken = localStorage.getItem("token");
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
        handleRemoveRedux();
        setLoading(false);
        toast.success("Payment Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/history"), 3000);
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: "smooth",
        });
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
        <div className="container-fluid  background-payment">
          <div className="container  title-payment ">
            <h3 className="text-lg-center">
              Checkout your <br></br> item now!
            </h3>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-5 gap-md-0">
              <div className="orderzz container col-12 col-md-7">
                <div className=" content-left-payment   bg-white rounded-5 ">
                  <div className="box-left ">
                    <p>Order Summary</p>
                    {/* payment 1 */}
                    <div className="container payment-content">
                      <div className="d-flex gap-3">
                        <img src={products.image === null ? foto : products.image} alt="Payment1" width="100px" height="100px" />
                        <div className="payment-center">
                          <p className="mb-0">{products.product_name}</p>
                          <p className="mb-0">x {products.qty}</p>
                          <p className="mb-0">{products.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* subtotal */}
                    <hr className=" my-4 mx-3"></hr>
                    <div className="total-payment d-flex justify-content-between px-3">
                      <div className=" total-payment-left ">
                        <p>SUBTOTAL</p>
                        <p>TAX ( 10%) </p>
                        <p>SHIPPING</p>
                      </div>
                      <div className="total-payment-right">
                        <p>{"Rp " + getItemTotal()}</p>
                        <p>{"Rp " + getTax()}</p>
                        <p> {"Rp " + getShipping()} </p>
                      </div>
                    </div>
                    <div className="subtotal-payment p-4">
                      <p>TOTAL</p>
                      <p> Rp {costing(getTotal())} </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rightsz d-flex flex-column mb-5 ps-md-4">
                <div className="row d-flex flex-column">
                  <div className="col-12 p-md-0 atas">
                    <div className="address-detail">
                      <h2>Address</h2>
                      <p>edit</p>
                    </div>
                    <div className="box-address">
                      <h5>
                        Delivery to : <b className="me-1"> &nbsp; {profile.display_name}</b>
                      </h5>
                      <p className="address-column"> {profile.addres}</p>
                      <p> {profile.phone_number}</p>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mt-md-2 bawah p-md-0">
                    <div className=" payment-method">
                      <h2>Payment Method</h2>
                    </div>
                    <div className="choose-payment">
                      <form
                        className="radio-payments d-flex flex-column cursor"
                        onChange={(e) => {
                          setForm(e.target.value);
                          setStatusPaid(e.target.value === "Cash On Delivery" ? "Pending" : "Paid");
                        }}
                      >
                        <div className="form-check d-flex flex-row align-items-center  styling-data-radio">
                          <input className="form-check-input cursor" type="radio" value="Card" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className="data-content-payment">
                            <img src={icon_card} alt="icon-card" width="40px" className="rounded-2 mx-3  icon_card" />
                          </div>
                          <span className="spanz">Card</span>
                        </div>
                        <div className=" form-check d-flex flex-row align-items-center  styling-data-radio">
                          <input className="form-check-input cursor" value="Bank" type="radio" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className="data-content-payment2">
                            <img src={icon_bank} alt="icon-bank" width="40px" className="rounded-2 mx-3  icon_bank" />
                          </div>
                          <span className="spanz">Bank</span>
                        </div>
                        <div className="form-check d-flex flex-row align-items-center  styling-data-radio">
                          <input className="form-check-input cursor" type="radio" value="Cash On Delivery" name="flexRadioDefault" />
                          <label className="form-check-label" for="flexRadioDefault1"></label>
                          <div className="data-content-payment3">
                            <img src={icon_cod} alt="icon-cod" width="40px" className=" rounded-2 mx-3  icon_cod " />
                          </div>
                          <span className="spanz">Cash On Delivery</span>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="container col-10 col-md-12  col-lg-12 mt-5 mt-md-4 confirm-pay">
                    <button onClick={handleTransactions}>
                      <span>
                        {loading ? (
                          <>
                            <div className="lds-ring">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                            <p className="loading-text ">Payment on process . . . </p>
                          </>
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
      </main>

      {/* <!-- Start Footer --> */}
      <Footer />
      {/* <!-- End Footer --> */}
    </>
  );
};

export default Payment;
