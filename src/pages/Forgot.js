import React, { Component, Fragment } from "react";
import styles from "../styles/Forgot.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { TabTitle } from "../utils/General-funct.js";

import Footer from "../Component/Footer";

// const Forgot = () => {
//   TabTitle("Forgot Password - Coffee Gayoe");

class Forgot extends Component {
  render() {
    return (
      <Fragment>
        <main>
          <section>
            <div className={`${styles["jumbotron"]} ${styles["container-fluid"]}`}>
              <div className="container">
                <h1 className="display-4 text-white text-center pt-5 fw-bold">Forgot your Password</h1>
                <p className="lead text-white text-center fw-bold">Dont worry, we got your back !</p>
              </div>
              <form className="r-flex jow dustify-content-center">
                <div className="col-md-3 col-lg-3 col-xl-6 mx-auto d-flex align-items-center gap-5">
                  <label for="inputEmail"></label>
                  <input type="text" className={styles["form-control"]} id="inputEmail " placeholder="Enter your email addres to get link " />
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto d-flex align-items-end mt-3">
                    <button type="submit" className={`${styles["btn"]}  ${styles["send"]}`}>
                      Send
                    </button>
                  </div>
                </div>
                <div className={`container ${styles["cont-text-here"]}`}>
                  <p className={styles["text-here"]}>
                    Click here if you didn't receive any link <br />
                    in 2 minutes
                  </p>
                  <div className="d-flex justify-content-center">
                    <button className={styles["btn-b"]}>Resend Link</button>
                  </div>
                  <p className={styles["minute"]}>01:54</p>
                </div>
              </form>
            </div>
          </section>
        </main>

        <footer>
          <Footer />
        </footer>
      </Fragment>
    );
  }
}

export default Forgot;
