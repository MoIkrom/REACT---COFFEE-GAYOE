import React, { useState } from "react";
import "../styles/Login.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TabTitle } from "../utils/General-funct.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import PinInput from "../Component/PinInput";

// Import Images

import background from "../assets/images/login-bg-1.png";

function Verify() {
  TabTitle("Verify Account - Coffee Gayoe");
  const navigate = useNavigate();
  // const params = useParams();
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  // const isAllFormFilled = Object.keys(pin).every((el) => pin[el]);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    let fullPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    fullPin = +fullPin;
    axios
      .post(`https://coffee-gayoe.vercel.app/`, {
        pin: fullPin,
      })
      .then((response) => {
        toast.success("Success Verified Account", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 3000);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Invalid OTP Code", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <div className=" row img-bg">
          <div className="col-lg-6 p-0">
            <img className="col-12 bgs" src={background} alt="background" />
          </div>
          <div className="col-lg-6 mt-5">
            <div>
              <div className=" d-flex justify-content-center align-items-center fonz">We have send An OTP code to your Email , Please Check Your Email</div>
              <div className=" d-flex align-items-center justify-content-center mt-5 mb-md-5 mb-hp">
                <Card className="col-md-8 col-lg-8 mb-md-5">
                  <Card.Body>
                    <Form onSubmit={submitHandler}>
                      <div className="login d-flex align-items-center justify-content-center mt-4 mb-5">
                        <u>COFFEE GAYOE</u>
                      </div>
                      <PinInput pin={pin} setPin={setPin} />

                      <div className="d-flex justify-content-center my-5">
                        <Button className="pops heightz col-6" variant="warning" type="submit">
                          {loading === true ? "Loading . . ." : "Verify Account"}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Verify;
