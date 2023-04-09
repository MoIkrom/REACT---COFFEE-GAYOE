import React, { useState } from "react";
import "../styles/Login.css";
import Footer from "../Component/Footer";
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
import background from "../assets/images/login-bg-1.png";
import google from "../assets/images/google-logo.png";

function Register() {
  TabTitle("Register - Coffee Gayoe");
  const navigate = useNavigate();
  // const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/users`, {
        email,
        password,
        username,
      })
      .then((response) => {
        console.log(response.data.result);
        // setID(response.data.result.data[0].id);
        toast.success("Register Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 3000);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Invalid Email/Phone Number", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
        setLoading(false);
      });
  };
  const onClickHandler = (to) => {
    navigate(to);
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
              <div className=" d-flex align-items-center justify-content-center mt-5 mb-md-5 mb-hp">
                <Card className="col-md-8 col-lg-8 mb-md-5">
                  <Card.Body>
                    <Form onSubmit={handleApi}>
                      <div className="login d-flex align-items-center justify-content-center mt-4 mb-5">
                        <u>COFFEE GAYOE</u>
                      </div>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="pops">Username</Form.Label>
                        <Form.Control className="pops2" type="text" require placeholder=" Enter Username" onChange={handleUserName} />
                      </Form.Group>
                      <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label className="pops">Email </Form.Label>
                        <Form.Control className="pops2" type="email" require placeholder="Enter Your Email" onChange={handleEmail} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="pops">Password</Form.Label>
                        <Form.Control className="pops2" type={isPwdShown ? "text" : "Password"} require placeholder=" Enter Your Password" onChange={handlePassword} />
                        <div className="d-flex justify-content-end align-items-center gap-2 my-2 ">
                          <p className="m-0"> Show Password</p>
                          <img onClick={() => setIsPwdShown(!isPwdShown)} src={isPwdShown === true ? eye : eyeslash} alt="/" className="pwd" />
                        </div>
                      </Form.Group>
                      <div className="d-flex flex-column gap-3 my-5">
                        <Button className="pops heightz" disabled={email && password === "" ? true : false} variant="warning" type="submit">
                          {loading === true ? "Loading . . ." : "Register"}
                        </Button>
                        <Button className="pops border d-flex justify-content-center align-items-center gap-3" variant="light" type="submit">
                          <img src={google} Alt="/" />
                          Register with Google
                        </Button>
                      </div>
                      <div className="dont d-flex justify-content-center align-items-center mb-4">
                        Already Have Account ? Login &nbsp;<Link to={"/login"}> &nbsp;Here</Link>
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
      <footer>
        <Footer onClick={() => onClickHandler("/")} />
      </footer>
      {/* <main className={styles["main-content"]}>
        <div className={styles["cont-main"]}>
          <div className={styles["side-images"]}>
            <div className="col">
              <img className={styles["img-side"]} src={background} alt="background" />
            </div>
          </div>
          <div className={`container ${styles["cont-form"]}`}>
            <header className={styles["header"]}>
              <img className={styles["img-logo"]} src={logo} alt="logo" />
              <span className={styles["logo-name"]} onClick={() => onClickHandler("/")}>
                Coffe Gayoe
              </span>
              <span>
                <button className={styles["btn-sign-up"]}>
                  <Link className={styles["no-underline"]} to={"/login"}>
                    Login
                  </Link>
                </button>
              </span>
            </header>
            <form className={styles["form-content"]} onSubmit={handleApi}>
              <h1 className={styles["login-text"]}>Sign Up</h1>
              <div className={`container ${styles["cont-form-email"]} `}>
                <form>
                  <label className={styles["input-text"]}>Email Address :</label> <br />
                  <input className={styles["input-login"]} type="text" placeholder="Enter your email address" onChange={handleEmail} require />
                </form>
                <div className={`${styles.contpwd}`}>
                  <form>
                    <label className={styles["input-text"]}>Password :</label> <br />
                    <input className={styles["input-login"]} type={isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={handlePassword} require />
                  </form>{" "}
                  <div className={`${styles.conteye}`}>
                    <img onClick={() => setIsPwdShown(true)} src={eyeslash} alt="/" className={isPwdShown === true ? `${styles.none}` : `${styles.show}`} />
                    <img onClick={() => setIsPwdShown(false)} src={eye} alt="/" className={isPwdShown === false ? `${styles.none}` : `${styles.shows}`} />
                  </div>
                </div>
                <form>
                  <label className={styles["input-text"]}>Phone Number :</label> <br />
                  <input className={styles["input-login"]} type="text" placeholder="Enter your phone number" onChange={handlePhoneNumber} require />
                </form>
                <div className={`container ${styles["btn-google"]}`}>
                  <button
                    className={`btn btn-warning ${styles["btn-login"]}`}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    {loading ? (
                      <>
                        <div className={styles["lds-ring"]}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <p className={styles["loading-text"]}>Loading . . .</p>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                  <ToastContainer />
                  <button className={`btn btn-outline-secondary ${styles["btn-login-2"]}`}>
                    <span>
                      <img src={google} alt="logo-google" />{" "}
                    </span>
                    Sign Up with Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={`container ${styles["cont-card-promo"]}`}>
          <section className={` card ${styles["card-promo"]}`}>
            <div className={`container ${styles["cont-promo"]}`}>
              <h1 className={styles["get-card"]}>Get your member card now!</h1>
              <p>Let's join with our member and enjoy the deals.</p>
              <span className={styles["create"]}>
                <button className={`btn btn-warning ${styles["button"]}`}>Create Now</button>
              </span>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles["footer-login"]}>
        <Footer onClick={() => onClickHandler("/")} />
      </footer> */}
    </>
  );
  // }
}

export default Register;
