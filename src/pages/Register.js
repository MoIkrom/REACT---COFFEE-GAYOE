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
import { Col, Row } from "react-bootstrap";

function Register() {
  TabTitle("Register - Coffee Gayoe");
  const navigate = useNavigate();
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [isPwdShown2, setIsPwdShown2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    firstname: "",
    lastname: "",
    address: "",
    phone_number: "",
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
      .post(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/users`, formData)
      .then((response) => {
        toast.success("Register Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
          window.scrollTo({
            top: 50,
            left: 100,
          });
        }, 3000);
        setLoading(false);
      })
      .catch((err) => {
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
      <div className="col-6" style={{ height: "750px" }}>
        <img
          className="img-fluid w-100 h-100"
          src={background}
          alt="background"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className=" d-flex align-items-center justify-content-center col-6">
        <div className="col-12 px-5 d-flex align-items-center justify-content-center">
          <Card className="col-12 mt-3">
            <Card.Body className="p-4">
              <Form onSubmit={handleApi}>
                <div className="login d-flex align-items-center justify-content-center mb-4">
                  <u>COFFEE GAYOE</u>
                </div>
                <div>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">Username</Form.Label>
                        <Form.Control
                          className="pops2"
                          type="text"
                          require
                          name="username"
                          placeholder=" Enter Username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </Form.Group>
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
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
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
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">
                          Confirm Password
                        </Form.Label>
                        <div className="d-flex align-items-center position-relative">
                          <Form.Control
                            className="pops2"
                            type={isPwdShown2 ? "text" : "password"}
                            required
                            name="confirmPassword"
                            placeholder="Enter Your Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <img
                            onClick={() => setIsPwdShown2(!isPwdShown2)}
                            src={isPwdShown2 ? eye : eyeslash}
                            alt="/"
                            className="pwd position-absolute end-0 me-2"
                            style={{
                              cursor: "pointer",
                              height: "20px",
                              width: "20px",
                            }}
                          />
                        </div>
                      </Form.Group>{" "}
                      <Form.Group className="mb-2" controlId="formBasicRole">
                        <Form.Label className="pops">Role</Form.Label>
                        <Form.Select
                          className="pops2"
                          required
                          name="role"
                          value={formData.role}
                          onChange={handleChange} // Ganti dengan handler yang sesuai
                        >
                          <option value="" disabled selected>
                            Select Role
                          </option>
                          {/* <option value="admin">Admin</option> */}
                          <option value="user">User</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">First Name</Form.Label>
                        <Form.Control
                          className="pops2"
                          type="text"
                          require
                          name="firstname"
                          placeholder=" Enter firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">Last Name</Form.Label>
                        <Form.Control
                          className="pops2"
                          type="text"
                          require
                          name="lastname"
                          placeholder=" Enter lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">Phone Number</Form.Label>
                        <Form.Control
                          className="pops2"
                          type="text"
                          require
                          name="phone_number"
                          placeholder=" Enter Phone Number"
                          value={formData.phone_number}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="pops">Address</Form.Label>
                        <Form.Control
                          className="pops2"
                          type="text"
                          require
                          name="address"
                          placeholder=" Enter address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

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
                      "Register"
                    )}
                  </Button>
                </div>
                <div className="dont d-flex justify-content-center align-items-center mb-">
                  Already Have Account ? Login &nbsp;
                  <Link to={"/login"}> &nbsp;Here</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  // }
}

export default Register;
