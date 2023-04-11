/* eslint-disable no-undef */
import React, { useState } from "react";
import "../styles/Login.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
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
import background from "../assets/images/login-bg-1.png";
import google from "../assets/images/google-logo.png";
import { Link, useNavigate } from "react-router-dom/dist";

// class Login extends Component {
function Login() {
  TabTitle("Login - Coffee Gayoe");
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/auth`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.result.data.token);
        localStorage.setItem("role", response.data.result.data.role);
        toast.success("Login success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
          window.scrollTo({
            top: 0,
          });
        }, 3000);
        setLoading(false);
      })
      .catch((err) => {
        toast.error((email && password).length === 0 ? "Please Insert Data Correctly" : "Email/password is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
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
          <div className="col-lg-6 mt-5 p-0">
            <div>
              <div className=" d-flex align-items-center justify-content-center mt-5 mb-md-5 mb-hp">
                <Card className="col-md-8 col-lg-8 mb-md-5">
                  <Card.Body>
                    <Form onSubmit={handleApi}>
                      <div className="login d-flex align-items-center justify-content-center mt-4 mb-5">
                        <u>COFFEE GAYOE</u>
                      </div>
                      <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label className="pops">Email </Form.Label>
                        <Form.Control className="pops2" type="email" require placeholder="Enter Your Email" onChange={handleEmail} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="pops">Password</Form.Label>
                        <Form.Control className="pops2" type={isPwdShown ? "text" : "Password"} require placeholder=" Enter Your Password" onChange={handlePassword} />
                        <div className="d-flex justify-content-end align-items-center gap-2 my-3">
                          <p className="m-0"> Show Password</p>
                          <img onClick={() => setIsPwdShown(!isPwdShown)} src={isPwdShown === true ? eye : eyeslash} alt="/" className="pwd" />
                        </div>
                      </Form.Group>
                      <div className="d-flex flex-column gap-3 my-5">
                        <Button className="pops heightz" disabled={email && password === "" ? true : false} variant="warning" type="submit">
                          {loading === true ? (
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                              <div class="spinner-border spinner-border-sm text-dark" role="status"></div>
                              <div>Loading . . .</div>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </Button>
                        <Button className="pops border d-flex justify-content-center align-items-center gap-3" variant="light" type="submit">
                          <img src={google} Alt="/" />
                          Login with Google
                        </Button>
                      </div>
                      <div className="dont d-flex justify-content-center align-items-center mb-4">
                        Don't Have Account ? Register &nbsp;<Link to={"/register"}> &nbsp;Here</Link>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

      <Footer onClick={() => onClickHandler("/")} />
    </>
  );
}

export default Login;
