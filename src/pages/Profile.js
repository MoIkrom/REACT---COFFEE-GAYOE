import React, { Component, Fragment } from "react";
// import { TabTitle } from "../utils/General-funct.js";
import styles from "../styles/Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

// Import Image
import profile from "../assets/images/parker.jpeg";
// const Profile = () => {
//   TabTitle("Profile - Coffee Gayoe");

class Profile extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Navbar />
        </header>
        <main className={styles["jumbotron"]}>
          <div className={`container`}>
            <h1 className={styles["text-user"]}>User Profile</h1>
          </div>
          <div className={`container ${styles["cont-card"]}`}>
            <div className={`card ${styles["card-body"]}`}>
              <img className={styles["card-img-top"]} src={profile} alt="/" />
              <div className={`container ${styles["detail-image"]}`}></div>
              <p className={styles["card-name"]}>Putra Parker</p>
              <p className={styles["card-email"]}>putra@spider-man.com</p>
              <p className={styles["ordered"]}>Has been ordered 15 products</p>
            </div>
            <div></div>
            <div className={`card ${styles["card-address"]}`}>
              <h1 className={styles["display-5"]}>contacts</h1>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <p>Email address :</p>
                  <p>putra@spider-man.com </p>
                  <hr className={styles["my-1"]} />
                </div>

                <div className="container">
                  <p>Mobile Number :</p>
                  <p>(+62 ) 813456782</p>
                  <hr className={styles["my-1"]} />
                </div>
              </div>
              <div className={`container ${styles["cont-email"]}`}>
                <div className={`container ${styles["cont-address"]}`}>
                  <p>Delivery Address :</p>
                  <p className={styles["street"]}>Iskandar Street no. 67 Block A Near Bus Stop </p>
                  <hr className={styles["my-1"]} />
                </div>
              </div>
            </div>
          </div>
          <div className={`container`}>
            <div className={`card ${styles["card-down"]}`}>
              <div className={`row ${["detail-jumbotron"]}`}>
                <h1 className={styles["display-5"]}>Details</h1>
                <div className={`container ${styles["cont-email"]}`}>
                  <div className="container">
                    <p className={styles["title-name"]}>Display name :</p>
                    <p className={styles["dis-name"]}>Putra Parker </p>
                    <hr className={styles["my-1"]} />
                    <p className={styles["title-name"]}>First name :</p>
                    <p className={styles["dis-name"]}>Putra </p>
                    <hr className={styles["my-1"]} />
                    <p className={styles["title-name"]}>Last name :</p>
                    <p className={styles["dis-name"]}>Parker </p>
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className="container">
                    <p>DD/MM/YY</p>
                    <p>(+62 ) 813456782</p>
                    <hr className={styles["my-1"]} />
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className={styles["form-check-label"]} for="flexRadioDefault1">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                      <label className={styles["form-check-label-2"]} for="flexRadioDefault2">
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`container ${styles["cont-btn"]}`}>
              <h1 className={styles["save-btn"]}>Do you want to save the change?</h1>
              <button type="button" className={`btn ${styles["btn-1"]}  ${styles["btn-size"]}`}>
                Save Change
              </button>
              <button type="button" className={`btn ${styles["btn-2"]} ${styles["btn-size"]}`}>
                Cancel
              </button>
              <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}>
                Edit Password
              </button>
              <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}>
                Log Out
              </button>
            </div>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </Fragment>
    );
  }
}

export default Profile;
