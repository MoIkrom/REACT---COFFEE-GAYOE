/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "../styles/Forgot.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabTitle } from "../utils/General-funct.js";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar.js";
import axios from "axios";

import eyeslash from "../assets/images/eyeslash2.png";
import eye from "../assets/images/eye2.png";

const editPwd = () => {
  TabTitle("Forgot Password - Coffee Gayoe");

  const [isPwdShown, setIsPwdShown] = useState(false);
  const [isPwdShown2, setIsPwdShown2] = useState(false);
  const [old_password, SetOld_Password] = useState("");
  const [new_password, SetNew_Password] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNewPwd = (e) => {
    SetNew_Password(e.target.value);
  };
  const handleOldPwd = (e) => {
    SetOld_Password(e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/editpassword`,
        {
          old_password,
          new_password,
        },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        toast.success("Change Password success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/profile"), 3000);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("wrong Input", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <>
      <header className={styles["header"]}>
        <Navbar />
      </header>
      <main>
        <section>
          <div className={`${styles["jumbotron"]} ${styles["container-fluid"]}`}>
            <div className="container">
              <h1 className="display-4 text-white text-center pt-5 fw-bold">Change your Password</h1>
            </div>
            <form className={` r-flex jow dustify-content-center ${styles.form}`}>
              <div className={` col-md-3 col-lg-3 col-xl-6 mx-auto d-flex align-items-center ${styles.inputatas}`}>
                <label for="inputEmail"></label>
                <input type={isPwdShown ? "text" : "password"} className={styles["form-control"]} placeholder="Enter your old Password " onChange={handleOldPwd} />
                <input type={isPwdShown2 ? "text" : "password"} className={styles["form-control"]} placeholder="Enter your new Password " onChange={handleNewPwd} />
              </div>

              <div className={`container ${styles["cont-text-here"]}`}>
                <div className={` d-flex justify-content-center  ${styles.change}`}>
                  <button className={styles["btn-b"]} onClick={handleChange}>
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
                      " Change Password"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className={`${styles.conteyes}`}>
              <img onClick={() => setIsPwdShown(true)} src={eyeslash} alt="/" className={isPwdShown === true ? `${styles.none}` : `${styles.show}`} />
              <img onClick={() => setIsPwdShown(false)} src={eye} alt="/" className={isPwdShown === false ? `${styles.none}` : `${styles.shows}`} />
            </div>
            <div className={`${styles.conteyes2}`}>
              <img onClick={() => setIsPwdShown2(true)} src={eyeslash} alt="/" className={isPwdShown2 === true ? `${styles.none}` : `${styles.show}`} />
              <img onClick={() => setIsPwdShown2(false)} src={eye} alt="/" className={isPwdShown2 === false ? `${styles.none}` : `${styles.shows}`} />
            </div>
          </div>
        </section>
        <ToastContainer />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default editPwd;
