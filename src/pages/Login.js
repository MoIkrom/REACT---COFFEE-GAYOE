import React, { useState } from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TabTitle } from "../utils/General-funct.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

// Import Images

import eyeslash from "../assets/images/eyeslash2.png";
import eye from "../assets/images/eye2.png";
import background from "../assets/images/login-bg-1.webp";

function Login() {
  TabTitle("Login - Coffee Gayoe");
  const navigate = useNavigate();
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApi = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("role", response.data.data.payload.role);
        toast.success("Login Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Email", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex">
      <div className="d-none d-md-flex col-6" style={{ height: "750px" }}>
        <img
          className="img-fluid w-100 h-100"
          src={background}
          alt="background"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className=" d-flex align-items-center justify-content-center col-12 col-md-6 py-5 bg-mobile">
        <div className="col-12 d-flex flex-column align-items-center justify-content-center">
          <div>
            <h3 className="font-mobile" style={{ fontFamily: "poppins", color: "#6A4029" }}>
              Welcome to Coffe Gayoe
            </h3>
          </div>
          <div className="col-10 col-lg-8 mt-3">
            <Card>
              <Card.Body className="p-4">
                <Form onSubmit={handleApi}>
                  <div className="login d-flex align-items-center justify-content-center mb-4">
                    <u>LOGIN </u>
                  </div>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="pops">Email </Form.Label>
                    <Form.Control
                      className="pops2"
                      type="email"
                      name="email"
                      require
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="pops">Password</Form.Label>
                    <div className="d-flex align-items-center position-relative">
                      <Form.Control
                        className="pops2"
                        type={isPwdShown ? "text" : "password"}
                        required
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <img
                        onClick={() => setIsPwdShown(!isPwdShown)}
                        src={isPwdShown ? eye : eyeslash}
                        alt="/"
                        className="pwd position-absolute end-0 me-2"
                        style={{
                          cursor: "pointer",
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    </div>
                  </Form.Group>
                  <div className="d-flex flex-column gap-3 my-4">
                    <Button
                      className="pops heightz"
                      variant="warning"
                      type="submit"
                    >
                      {loading === true ? (
                        <div className="d-flex gap-2 justify-content-center align-items-center">
                          <div
                            class="spinner-border spinner-border-sm text-dark"
                            role="status"
                          ></div>
                          <div>Loading . . .</div>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                  <div className="dont align-items-center col-10">
                    Don't Have an Account ? Register &nbsp;
                    <Link to={"/register"}>Here</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  // }
}

export default Login;
