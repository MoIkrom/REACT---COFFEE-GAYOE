import React, { Component, Fragment } from "react";
import styles from "../styles/Login.module.css";
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

class Login extends Component {
  state = {
    // url: `http://localhost:8080/api/v1/auth`,
    url: `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth`,
    isPwdShown: false,
    email: "",
    password: "",
  };
  /*  get token localstorage */
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswords = (e) => {
    this.setState({ password: e.target.value });
  };
  handleApi = (e) => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
    axios
      .post(this.state.url, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log("login success");
        console.log(response);
        // const userData = {
        //     token: response.data.result.data.token,
        //     role: response.data.result.data.role,
        // }
        localStorage.setItem("token", response.data.result.data.token);
        localStorage.setItem("role", response.data.result.data.role);
        // navigate("/");
      })
      .catch((err) => {
        // alert("Email or Password is WRONG !!!");
        console.log(err);
      });
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
                    <Link className={styles["no-underline"]} to={"/register"}>
                      Sign Up
                    </Link>
                  </button>
                </span>
              </header>
              <form className={styles["form-content"]} onSubmit={this.handleApi}>
                <h1 className={styles["login-text"]}>Login</h1>
                <div className={`container ${styles["cont-form-email"]} `}>
                  <form>
                    <label className={styles["input-text"]}>Email Address :</label> <br />
                    <input className={styles["input-login"]} type="text" placeholder="Enter your email address" onChange={this.handleEmail} />
                  </form>
                  <form>
                    <label className={styles["input-text"]}>Password :</label> <br />
                    <input className={styles["input-login"]} type={this.state.isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={this.handlePasswords} />
                    <p>
                      Show Password{" "}
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
                  <p className={styles["forgot-text"]} onClick={() => this.props.navigate("/forgot")}>
                    {" "}
                    Forgot Password ?
                  </p>

                  <button className={`btn btn-warning ${styles["btn-login"]}`}>Login</button>
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
          <Footer />
        </footer>
      </Fragment>
    );
  }
}

const componentLogin = withNavigate(Login);

export default componentLogin;
