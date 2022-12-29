/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import userActions from "../../redux/action/user";
import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getProfile } from "../utils/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import styles from "../styles/Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import withNavigate from "../utils/withNavigate";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Image
import icon_edit from "../assets/images/icon_editpencil.png";

import icon_profile from "../assets/images/default-img.png";
// import { render } from "@testing-library/react";
// const Profile = () => {
//   TabTitle("Profile - Coffee Gayoe");

function Profile() {
  TabTitle("History - Coffee Gayoe");
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState(true);
  const [showedit, setShowEdit] = useState(true);
  const [firstName, setFirstName] = useState(profile.firstname);
  const [lastName, setLastName] = useState(profile.lastname);
  const [phone_number, setPhone_number] = useState(profile.phone_number);
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [gender, setGender] = useState(profile.gender);
  const [email, setEmail] = useState(profile.email);
  const [filePath, setFilePath] = useState(profile.image);
  const [image, setImage] = useState("");
  const [editPhoto, setEditPhoto] = useState(false);
  const [address, setAddress] = useState(profile.addres);
  const [edit, setEdit] = useState(false);
  const [deps, setDeps] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgPrev, setImgPrev] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [isEdit, setIsEdit] = useState(true);
  const [saved, setSaved] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showInput, setShowInput] = useState(true);

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

  useEffect(() => {
    getProfileUser();
  }, []);

  // editData => fungsi untuk memasukan data kedalam database ketika di click button save change
  const editData = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    let formdata = new FormData();
    if (image) formdata.append("image", image);
    // if (address) formdata.append("addres", address);
    // if (displayName) formdata.append("displayname", displayName);
    // if (phone_number) formdata.append("phone_number", phone_number);
    // if (firstName) formdata.append("firstname", firstName);
    // if (lastName) formdata.append("lastname", lastName);
    // if (gender) formdata.append("gender", gender);
    // for (var pair of formdata.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }

    axios
      .patch(`https://coffee-gayoe.vercel.app/api/v1/users`, formdata, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        SuccessMessage();
        setLoading(false);
        setEdit(true);
        window.location.reload();
        console.log("uda di kirim");
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleAddress = (e) => {
    // setBody({ ...body, delivery_address: e.target.value });
    setDeliveryAddress(e.target.value);
  };

  // get value input
  const valueEmail = (e) => {
    setEmail(e.target.value);
  };
  const valueAddress = (e) => {
    setAddress(e.target.value);
  };
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
  // const onEditContacts = () => {
  //   set(isEditContact: false });
  // };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImgPrev(URL.createObjectURL(e.target.files[0]));
  };

  const inputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // SuccessMessage, LogoutMessage => notifikasi sukses dan gagal
  const SuccessMessage = () => {
    toast.success("Data Save Change !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const LogoutMessage = () => {
    toast.success("Logout Success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //   const handleLogout = () => {
  //    axios
  //      .delete(urlLogout, { headers: { "x-access-token": this.state.token } })
  //      .then((response) => {
  //        console.log(response.data);
  //      })
  //      .catch((err) => {
  //        console.log(err);
  //      });
  //  };
  const deleteToken = () => {
    localStorage.removeItem("token");
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  //  onClickHandler = (to) => {
  //   navigate(to);
  // };

  return (
    <>
      <header className={styles["header"]}>
        <Navbar />
      </header>
      <main className={styles["jumbotron"]}>
        <div className={`container`}>
          <h1 className={styles["text-user"]}>User Profile</h1>
        </div>
        <section className={`container ${styles["cont-card"]}`}>
          <div className={`card ${styles["card-body"]}`}>
            <img className={styles["card-img-top"]} src={image !== "" ? image : profile.image === null ? icon_profile : profile.image} alt="profile_picture" />
            <label className={styles.editicon} htmlFor="files" id="lable_file">
              <img className={styles["cursor"]} src={icon_edit} alt="icon_edit" />
            </label>
            <input id="files" type="file" name="file" onChange={inputImage} className={styles.hidden} />
            <div className={`container ${styles["detail-image"]}`}>
              <p className={styles["card-name"]}>{profile.display_name}</p>
              <p className={styles["card-email"]}>{profile.email}</p>
            </div>

            <p className={styles["ordered"]}>Has been ordered 15 products</p>
          </div>
          <div></div>
          <div className={`card ${styles["card-address"]}`}>
            <div className={styles["title-contact"]}>
              <h2 className={styles["display-5"]}>contacts</h2>
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

            <form className={`container ${styles["cont-email"]}`}>
              <div className={`container ${styles["cont-label"]}`}>
                <label htmlFor="email">Email address :</label>
                <input type="email" disabled value={profile.email} />
                <hr className={styles["my-1"]} />
              </div>

              <div className={`container ${styles["cont-label"]}`}>
                <label className={styles.label} htmlFor="phone_number">
                  Mobile Number :
                </label>
                <input type="tel" disabled value={profile.phone_number} />
                <hr className={styles["my-1"]} />
              </div>
            </form>

            <div className={`container ${styles["cont-email"]}`}>
              <div className={`container ${styles["cont-address"]}`}>
                <label className={styles.label} htmlFor="phone_number">
                  Delivery Address :
                </label>
                <input className={styles["street"]} type="text" onChange={handleAddress} disabled={isEdit} value={deliveryAddress} />
                <hr className={styles["my-1"]} />
              </div>
            </div>
            <p
              className={show === true ? `${styles.none}` : `${styles["tombolsave"]} ${styles["cursor"]}`}
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
        <div className={`container`}>
          <div className={`card ${styles["card-down"]}`}>
            <div className={`row ${["detail-jumbotron"]}`}>
              <h1 className={styles["display-5"]}>Details</h1>
              <div className={`${styles.contedit}`}>
                <img
                  onClick={(e) => {
                    setShowEdit(false);
                    e.preventDefault();
                    setIsEdit(!isEdit);
                  }}
                  className={showedit === true ? `${styles["editicon-right"]} ${styles["cursor"]}` : `${styles.none}`}
                  src={icon_edit}
                  alt="icon_edit"
                />

                <p className={showedit === true ? `${styles.edits} ${styles["cursor"]}` : `${styles.none}`}>Edit</p>
              </div>
              <div className={`container ${styles["cont-email"]}`}>
                <div className="container">
                  <p className={styles["title-name"]}>Display name :</p>
                  <p className={styles["dis-name"]}>{profile.display_name} </p>
                  <hr className={styles["my-1"]} />
                  <p className={styles["title-name"]}>First name :</p>
                  <p className={styles["dis-name"]}>{profile.firstname} </p>
                  <hr className={styles["my-1"]} />
                  <p className={styles["title-name"]}>Last name :</p>
                  <p className={styles["dis-name"]}>{profile.lastname} </p>
                  <hr className={styles["my-1"]} />
                </div>
                <div className="container">
                  {/* <p>DD/MM/YY</p>
                  <p>24 / 06 /1987 </p>
                  <hr className={styles["my-1"]} /> */}

                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="Male" />
                    <label className="form-check-label" for="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="Female" />
                    <label className="form-check-label" for="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`container ${styles["cont-btn"]}`}>
            <h1 className={styles["save-btn"]}>Do you want to save the change?</h1>
            <button type="button" className={`btn ${styles["btn-1"]}  ${styles["btn-size"]}`} onClick={editData}>
              Save Change
            </button>
            <button type="button" className={`btn ${styles["btn-2"]} ${styles["btn-size"]}`}>
              Cancel
            </button>
            <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}>
              Edit Password
            </button>
            <button
              type="button"
              className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}
              onClick={() => {
                handleShow();
              }}
            >
              {/* <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`} onClick={handleLogout}> */}
              <p>Log Out</p>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        {/* <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="fw-bold text-bg-secondary text-white" onClick={this.handleClose}>
              Yes
            </Button>
            <Button
              variant="success"
              className="fw-bold text-bg-success text-white"
              // onClick={() => {
              //   this.SuccessToastMessage();
              //   // this.handleLogout();
              //   this.deleteToken();
              //   setTimeout(() => {
              //     this.props.navigate("/");
              //   }, 1000);
              // }}
              onClick={() => {
                this.deleteToken();
                setTimeout(() => {
                  this.props.navigate("/");
                }, 1000);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal> */}
      </main>

      <footer className={styles["footer-cont"]}>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
}

export default withNavigate(Profile);
