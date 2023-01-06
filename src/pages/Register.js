import React, { useState, Fragment } from "react";
import styles from "../styles/Register.module.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import withNavigate from "../utils/withNavigate";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TabTitle } from "../utils/General-funct.js";

// Import Images

import eyeslash from "../assets/images/eyeslash2.png";
import eye from "../assets/images/eye2.png";
import background from "../assets/images/login-bg-1.png";
import logo from "../assets/images/coffee-logo.png";
import google from "../assets/images/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png";

// const Register = () => {
//   TabTitle("Register - Coffee Gayoe");

// class Register extends Component {
function Register({ navigate }) {
  TabTitle("Register - Coffee Gayoe");
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdShown, setIsPwdShown] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setphone_number(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}api/v1/users`, {
        email,
        password,
        phone_number,
      })
      .then((response) => {
        toast.success("Sign Up success", {
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
    <Fragment>
      <main className={styles["main-content"]}>
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
      </footer>
    </Fragment>
  );
  // }
}
const componentRegister = withNavigate(Register);

export default componentRegister;
