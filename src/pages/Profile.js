/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { getProfile } from "../utils/api";
import styles from "../styles/Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Image
import icon_edit from "../assets/images/icon_editpencil.png";

import icon_profile from "../assets/images/default-img.png";

function Profile() {
  TabTitle("Profile - Coffee Gayoe");

  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [firstName, setFirstName] = useState(profile.firstname);
  const [lastName, setLastName] = useState(profile.lastname);
  const [phone_number, setPhone_number] = useState(profile.phone_number);
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [gender, setGender] = useState(profile.gender);
  const [email, setEmail] = useState(profile.email);
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [deps, setDeps] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgPrev, setImgPrev] = useState(null);

  const [isEdit, setIsEdit] = useState(true);
  const [isEdit2, setIsEdit2] = useState(true);
  const [saved, setSaved] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(profile.addres);
  const [historiedData, setHistoriedData] = useState("");

  const getProfileUser = () => {
    const token = localStorage.getItem("token");
    getProfile(token)
      .then((res) => {
        setProfile(res.data.result.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dataHistory = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/transactions/history`, { headers: { "x-access-token": token } })
      .then((res) => {
        setHistoriedData(res.data.result.data);
        console.log(res.data.result.data);
        // console.log(`ini adalah data history: ${historiedData}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toEditPwd = () => {
    navigate("/profile/edit-password");
    window.scrollTo({
      top: 100,
      left: 100,
    });
  };

  useEffect(() => {
    getProfileUser();
    dataHistory();
    setLoading(false);
    // console.log(profile.image);
  }, []);

  // editData => fungsi untuk memasukan data kedalam database ketika di click button save change
  const editData = (e) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    e.preventDefault();
    let formdata = new FormData();
    if (image) formdata.append("image", image);
    if (deliveryAddress) formdata.append("addres", deliveryAddress);
    if (displayName) formdata.append("display_name", displayName);
    if (phone_number) formdata.append("phone_number", phone_number);
    if (firstName) formdata.append("firstname", firstName);
    if (lastName) formdata.append("lastname", lastName);
    if (gender) formdata.append("gender", gender);
    // for (var pair of formdata.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }
    axios
      // .patch(`http://localhost:8080/api/v1/users/profile`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .patch(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        SuccessMessage();
        setLoading(false);
        setEdit(true);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleAddress = (e) => {
    // setBody({ ...body, delivery_address: e.target.value });
    setDeliveryAddress(e.target.value);
  };
  // const handlelastname= (e) => {
  //   // setBody({ ...body, delivery_address: e.target.value });
  //   setDeliveryAddress(e.target.value);
  // };

  // get value input
  const valueEmail = (e) => {
    setEmail(e.target.value);
  };
  // const valueAddress = (e) => {
  //   setAddress(e.target.value);
  // };
  const valuePhone_number = (e) => {
    setPhone_number(e.target.value);
  };
  const valueDisplayname = (e) => {
    setDisplayName(e.target.value);
  };
  const valueFirstname = (e) => {
    setFirstName(e.target.value);
  };
  const valueLastname = (e) => {
    setLastName(e.target.value);
  };
  const valueGender = (e) => {
    setGender(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImgPrev(URL.createObjectURL(e.target.files[0]));
  };
  // handleFile => memndapatkan value inputan dari gambar yang telah di choose file
  const handleFile = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setImage(file);
  };

  // SuccessMessage, LogoutMessage => notifikasi sukses dan gagal
  const SuccessMessage = () => {
    toast.success("Data Save Change !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
  const LogoutMessage = () => {
    toast.success("Logout Success !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  // const handleLogout = () => {
  //   axios
  //     .delete(urlLogout, { headers: { "x-access-token": this.state.token } })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const deleteToken = () => {
    localStorage.clear();
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setImage(profile.image);
    setDeliveryAddress(profile.addres);
    setDisplayName(profile.display_name);
    setPhone_number(profile.phone_number);
    setFirstName(profile.firstname);
    setLastName(profile.lastname);
  };

  const handleImages = () => {
    if (profile.image !== null) {
      return profile.image;
    }

    if (imgPrev !== "") {
      return imgPrev;
    }
    return profile.image;
  };

  return (
    <>
      <header className={styles["header"]}>
        <Navbar />
      </header>
      <main className={styles["jumbotron"]}>
        <div className={`container ${styles.usertitle}`}>
          <h1 className={styles["text-user"]}>User Profile</h1>
        </div>
        <div className={` container d-flex ${styles["cont-one"]} `}>
          <section className={`container ${styles["cont-card"]}`}>
            <div className={`card ${styles["card-body"]}`}>
              <img
                className={styles["card-img-top"]}
                // src={profile.image === null ? icon_profile : imgPrev !== "" ? imgPrev : profile.image}
                src={!image ? profile.image : imgPrev}
                alt=""
              />
              <label className={styles.editicon} htmlFor="files" id="lable_file">
                <img className={`${styles["cursor"]}  ${styles.pencils}`} src={icon_edit} alt="icon_edit" />
              </label>
              <input id="files" type="file" name="file" onChange={handleImage} className={styles.hidden} />
              <div className={`container ${styles["detail-image"]}`}>
                <p className={styles["card-name"]}>{profile.display_name}</p>
                <p className={styles["card-email"]}>{profile.email}</p>
              </div>
              <p className={styles["ordered"]}>Has been ordered {historiedData.length} products</p>
            </div>
            <div className={`card ${styles["card-address"]}`}>
              <div className={styles["title-contactone"]}>
                <h2 className={show === true ? styles["display-5"] : styles["contactshowone"]}>contacts</h2>
                <div
                  className={`${styles.contedit}`}
                  onClick={(e) => {
                    setShow(false);
                    e.preventDefault();
                    setIsEdit(!isEdit);
                  }}
                >
                  <img className={show === true ? `${styles["editicon-right"]} ${styles["cursor"]}` : `${styles.none}`} src={icon_edit} alt="icon_edit" />

                  <p className={show === true ? `${styles.edits} ${styles["cursor"]}` : `${styles.none}`}>Edit</p>
                </div>
              </div>

              <form className={`container col-12 d-flex ${styles.contform}`}>
                <div className={`container col-6 ${styles.contemailform} `}>
                  <label className={styles.genderone} htmlFor="email">
                    Email address :
                  </label>
                  <input className={`${styles.emailinput}`} type="email" disabled value={profile.email} />
                </div>

                <div className={`container ${styles["cont-label"]}`}>
                  <label className={styles.genderone} htmlFor="phone_number">
                    Mobile Number :
                  </label>
                  <input className={`${styles.emailinput}`} type="tel" disabled value={profile.phone_number} />
                </div>
              </form>

              <div className={`container ${styles["cont-email"]}`}>
                <div className={`container ${styles["cont-address"]}`}>
                  <label className={styles.genderone} htmlFor="phone_number">
                    Delivery Address :
                  </label>
                  <input
                    className={show === true ? styles["street"] : styles["streetoneshow"]}
                    type="text"
                    onChange={handleAddress}
                    placeholder={show === true ? profile.addres : ""}
                    // value={show === true ? profile.addres : }
                    disabled={isEdit}
                  />
                </div>
              </div>
              <p
                className={show === true ? `${styles.none}` : `${styles["tombolsaveone"]} ${styles["cursor"]}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(!isEdit);
                  setShow(true);
                }}
              >
                Save
              </p>
            </div>
          </section>
          <div className={`${styles.contTwo}`}>
            <div className={`card col-8 ${styles.displaynames}`}>
              <div className={styles["title-contact"]}>
                <h2 className={show2 === true ? styles["display-5"] : styles["contactshow"]}>Details</h2>
                <div
                  className={`${styles.contedit}`}
                  onClick={(e) => {
                    setShow2(false);
                    e.preventDefault();
                    setIsEdit2(!isEdit2);
                  }}
                >
                  <img className={show2 === true ? `${styles["editicon-right"]} ${styles["cursor"]}` : `${styles.none}`} src={icon_edit} alt="icon_edit" />

                  <p className={show2 === true ? `${styles.edits} ${styles["cursor"]}` : `${styles.none}`}>Edit</p>
                </div>
              </div>
              <div className={`d-flex gap-5 ${styles.fleks}`}>
                <div className={`col-7 ${styles.col7}`}>
                  <div className={`container ${styles[""]}`}>
                    <div className={`container  ${styles["cont-display"]}`}>
                      <label className={styles.gender} htmlFor="phone_number">
                        Display Name :
                      </label>
                      <input className={show2 === true ? styles["streetshow"] : styles["streetshow"]} type="text" onChange={valueDisplayname} disabled={isEdit2} value={displayName} />
                    </div>
                  </div>
                  <div className={`container ${styles[""]}`}>
                    <div className={`container ${styles["cont-display"]}`}>
                      <label className={styles.gender} htmlFor="phone_number">
                        First Name :
                      </label>
                      <input className={show2 === true ? styles["streetshow"] : styles["streetshow"]} type="text" onChange={valueFirstname} disabled={isEdit2} value={firstName} />
                    </div>
                  </div>
                  <div className={`container ${styles[""]}`}>
                    <div className={`container ${styles["cont-display"]}`}>
                      <label className={styles.gender} htmlFor="phone_number">
                        Last Name :
                      </label>
                      <input className={show2 === true ? styles["streetshow"] : styles["streetshow"]} type="text" onChange={valueLastname} disabled={isEdit2} placeholder={show === true ? profile.lastName : ""} value={lastName} />
                    </div>
                  </div>
                </div>

                <div className={`${styles.divgender}`}>
                  <p className={`${styles.gender}`}> Gender : </p>
                  <form
                    className={`${styles["radio-payment"]} ${styles["cursor"]}`}
                    onChange={(e) => {
                      valueGender(e.target.value);
                    }}
                  >
                    <div className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}>
                      <input className={`form-check-input ${styles.cursor}`} type="radio" value="Male" name="flexRadioDefault" />
                      <label className="form-check-label" for="flexRadioDefault1"></label>
                      <span className={`${styles.spans}`}>Male</span>
                    </div>
                    <div className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}>
                      <input className={`form-check-input ${styles.cursor}`} value="Female" type="radio" name="flexRadioDefault" />
                      <label className="form-check-label" for="flexRadioDefault1"></label>
                      <span className={`${styles.spans}`}>Female</span>
                    </div>
                  </form>
                </div>
              </div>

              <p
                className={show2 === true ? `${styles.none}` : `${styles["tombolsave"]} ${styles["cursor"]}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit2(!isEdit2);
                  setShow2(true);
                }}
              >
                Save
              </p>
            </div>

            <div className={`container ${styles["cont-btn"]}`}>
              <h1 className={styles["save-btn"]}>Do you want to save the change?</h1>
              <button type="button" className={`btn ${styles["btn-1"]}  ${styles["btn-size"]}`} onClick={editData}>
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
                  " Save Change "
                )}
              </button>
              <button type="button" className={`btn ${styles["btn-2"]} ${styles["btn-size"]}`} onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`} onClick={toEditPwd}>
                Edit Password
              </button>
              <button
                type="button"
                className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}
                onClick={() => {
                  handleShowModal();
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* </div>  */}
        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="fw-bold text-bg-secondary text-white"
              onClick={() => {
                deleteToken();
                setTimeout(() => {
                  navigate("/");
                }, 1000);
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              Yes
            </Button>
            <Button variant="success" className="fw-bold text-bg-success text-white" onClick={handleCloseModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </main>

      <footer className={styles["footer-cont"]}>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
}

export default Profile;
