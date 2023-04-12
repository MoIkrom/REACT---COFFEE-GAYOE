/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../styles/Forgot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabTitle } from "../utils/General-funct.js";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar.js";
import axios from "axios";

import eyeslash from "../assets/images/eyeslash2.png";
import eye from "../assets/images/eye2.png";

const editPwd = () => {
  TabTitle("Forgot Password - Coffee Gayoe");

  const [isPwdShown, setIsPwdShown] = useState(false);
  const [isPwdShown2, setIsPwdShown2] = useState(false);
  const [old_password, SetOld_Password] = useState("");
  const [new_password, SetNew_Password] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNewPwd = (e) => {
    SetNew_Password(e.target.value);
  };
  const handleOldPwd = (e) => {
    SetOld_Password(e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/editpassword`,
        {
          old_password,
          new_password,
        },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        toast.success("Change Password success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/profile"), 3000);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(old_password === "" || new_password === "" ? "Password Cannot be Empty" : "Password Not Match", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg">
        <div className="container d-flex justify-content-center p-5">
          <Card className="col-md-8 col-lg-5">
            <Card.Body>
              <Form onSubmit={handleChange}>
                <div className="login d-flex align-items-center justify-content-center mt-4 mb-5">
                  <u className="change">Change Password</u>
                </div>
                <div className="px-md-4 px-lg-5 ">
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="pops">Old Password </Form.Label>
                    <Form.Control type={isPwdShown ? "text" : "password"} require placeholder="Enter Your Old Password" onChange={handleOldPwd} />{" "}
                    <div className="d-flex justify-content-end align-items-center gap-2 mt-1 mb-3 pe-1">
                      <p className="m-0 potz"> Show Password</p>
                      <img className="img_potz" onClick={() => setIsPwdShown(!isPwdShown)} src={isPwdShown === true ? eye : eyeslash} alt="/" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="pops">New Password</Form.Label>
                    <Form.Control type={isPwdShown2 ? "text" : "Password"} require placeholder=" Enter Your Password" onChange={handleNewPwd} />
                    <div className="d-flex justify-content-end align-items-center gap-2 mt-1 mb-3 pe-1">
                      <p className="m-0 potz"> Show Password</p>
                      <img className="img_potz" onClick={() => setIsPwdShown2(!isPwdShown2)} src={isPwdShown2 === true ? eye : eyeslash} alt="/" />
                    </div>
                  </Form.Group>
                  <div className="d-flex flex-column gap-3 mt-5 mb-4">
                    <Button disabled={old_password || new_password === "" ? true : false} variant="warning" type="submit">
                      {loading === true ? (
                        <div className="d-flex gap-2 justify-content-center align-items-center">
                          <div class="spinner-border spinner-border-sm text-dark" role="status"></div>
                          <div>Loading . . .</div>
                        </div>
                      ) : (
                        <div className="popp">Change Password</div>
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>

      <ToastContainer />

      <Footer />
    </>
  );
};

export default editPwd;
