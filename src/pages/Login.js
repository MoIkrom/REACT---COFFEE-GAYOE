import React, { useState } from "react";
import styles from "../styles/Login.module.css";
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

// class Login extends Component {
function Login({ navigate }) {
  TabTitle("Login - Coffee Gayoe");
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Start Function
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}api/v1/auth`, {
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
        setTimeout(() => navigate("/"), 3000);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Email/password is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setLoading(false);
        console.log(err);
      });
  };

  const onClickHandler = (to) => {
    navigate(to);
  };

  // End Function

  return (
    <>
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
                  <Link className={styles["no-underline"]} to={"/register"}>
                    Sign Up
                  </Link>
                </button>
              </span>
            </header>
            <form className={styles["form-content"]} onSubmit={handleApi}>
              <h1 className={styles["login-text"]}>Login</h1>
              <div className={`container ${styles["cont-form-email"]} `}>
                <form>
                  <label className={styles["input-text"]}>Email Address :</label> <br />
                  <input className={styles["input-login"]} type="text" name="email" required="true" placeholder="Enter your email address" onChange={handleEmail} />
                </form>
                <div className={`${styles.contpwd}`}>
                  <form>
                    <label className={styles["input-text"]}>Password :</label> <br />
                    <input className={styles["input-login"]} type={isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={handlePassword} />
                  </form>
                  <div className={`${styles.conteye}`}>
                    <img onClick={() => setIsPwdShown(true)} src={eyeslash} alt="/" className={isPwdShown === true ? `${styles.none}` : `${styles.show}`} />
                    <img onClick={() => setIsPwdShown(false)} src={eye} alt="/" className={isPwdShown === false ? `${styles.none}` : `${styles.shows}`} />
                  </div>
                </div>
                <label className={styles["forgot-text"]} onClick={() => onClickHandler("/forgot-password")}>
                  {" "}
                  Forgot Password ?
                </label>

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
                    "Login"
                  )}
                </button>
                <ToastContainer />
                <button className={`btn btn-outline-secondary ${styles["btn-login-2"]}`}>
                  <span>
                    <img src={google} alt="logo-google" />{" "}
                  </span>
                  Login with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className={styles["footer-login"]}>
        <Footer onClick={() => onClickHandler("/")} />
      </footer>
    </>
  );
  // }
}

const componentLogin = withNavigate(Login);

export default componentLogin;
