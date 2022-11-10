import React, { Component, Fragment } from "react";
import styles from "../styles/Register.module.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import withNavigate from "../utils/withNavigate";
import { Link } from "react-router-dom";
import axios from "axios";
// import { TabTitle } from "../utils/General-funct.js";

// Import Images
import background from "../assets/images/login-bg-1.png";
import logo from "../assets/images/coffee-logo.png";
import google from "../assets/images/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png";

// const Register = () => {
//   TabTitle("Register - Coffee Gayoe");

class Register extends Component {
  state = {
    url: `${process.env.REACT_APP_BACKEND_HOST}api/v1/users`,
    isPwdShown: false,
    email: "",
    password: "",
    phone_number: "",
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswords = (e) => {
    this.setState({ password: e.target.value });
  };
  handlePhoneNumber = (e) => {
    this.setState({ phone_number: e.target.value });
  };

  handleApi = (e) => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
    axios
      .post(this.state.url, {
        email: this.state.email,
        password: this.state.password,
        phone_number: this.state.phone_number,
      })
      .then((response) => {
        // localStorage.setItem("email", response.data.result.data.email);
        localStorage.setItem("role", response.data.result.data.role);
        localStorage.setItem("token", response.data.result.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
    // this.setState({ email: "", password: "", phone_number: "" });
  };

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
                    <Link className={styles["no-underline"]} to={"/login"}>
                      Login
                    </Link>
                  </button>
                </span>
              </header>
              <form className={styles["form-content"]} onSubmit={this.handleApi}>
                <h1 className={styles["login-text"]}>Sign Up</h1>
                <div className={`container ${styles["cont-form-email"]} `}>
                  <form>
                    <label className={styles["input-text"]}>Email Address :</label> <br />
                    <input className={styles["input-login"]} type="text" placeholder="Enter your email address" onChange={this.handleEmail} require />
                  </form>
                  <form>
                    <label className={styles["input-text"]}>Password :</label> <br />
                    <input className={styles["input-login"]} type={this.state.isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={this.handlePasswords} require />
                    <p>
                      Show Password
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        onChange={() => {
                          this.setState((prevState) => ({
                            isPwdShown: prevState.isPwdShown ? false : true,
                          }));
                        }}
                      ></input>{" "}
                    </p>
                  </form>
                  <form>
                    <label className={styles["input-text"]}>Phone Number :</label> <br />
                    <input className={styles["input-login"]} type="text" placeholder="Enter your phone number" onChange={this.handlePhoneNumber} require />
                  </form>
                  <div className={`container ${styles["btn-google"]}`}>
                    <button className={`btn btn-warning ${styles["btn-login"]}`}>
                      {/* <button className={`btn btn-warning ${styles["btn-login"]}`} onClick={() => this.props.navigate("/login")}> */}
                      Sign Up
                    </button>
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
          <Footer />
        </footer>
      </Fragment>
    );
  }
}
const componentRegister = withNavigate(Register);

export default componentRegister;
