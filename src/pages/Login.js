import React, { Component, Fragment } from "react";
import styles from "../styles/Login.module.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
// import { TabTitle } from "../utils/General-funct.js";
import withNavigate from "../utils/withNavigate";
import { Link } from "react-router-dom";

// Import Images
import background from "../assets/images/login-bg.png";
import logo from "../assets/images/coffee-logo.png";
import google from "../assets/images/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png";

// const Login = () => {
//   TabTitle("Login - Coffee Gayoe");

class Login extends Component {
  render() {
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
                <span className={styles["logo-name"]}>Coffe Gayoe</span>
                <span>
                  <button className={styles["btn-sign-up"]}>
                    <Link className={styles["no-underline"]} to={"/register"}>
                      Sign Up
                    </Link>
                  </button>
                </span>
              </header>
              <div className={styles["form-content"]}>
                <h1 className={styles["login-text"]}>Login</h1>
                <div className={`container ${styles["cont-form-email"]} `}>
                  <form>
                    <label className={styles["input-text"]}>Email Address :</label> <br />
                    <input className={styles["input-login"]} type="text" placeholder="Enter your email address" />
                  </form>
                  <form>
                    <label className={styles["input-text"]}>Password :</label> <br />
                    <input className={styles["input-login"]} type="text" placeholder="Enter your password" />
                  </form>
                  <p className={styles["forgot-text"]}> Forgot Password ?</p>

                  <button className={`btn btn-warning ${styles["btn-login"]}`} onClick={() => this.props.navigate("/profile")}>
                    {" "}
                    Login{" "}
                  </button>
                  <button className={`btn btn-outline-secondary ${styles["btn-login-2"]}`}>
                    <span>
                      <img src={google} alt="logo-google" />{" "}
                    </span>
                    Login with Google
                  </button>
                </div>
              </div>
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
          <Footer />
        </footer>
      </Fragment>
    );
  }
}

const componentLogin = withNavigate(Login);

export default componentLogin;
