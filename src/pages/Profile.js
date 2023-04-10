/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utils/api";
import "../styles/Profile.css";
import Card from "react-bootstrap/Card";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

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
  const [value, onChange] = useState(new Date());

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
    // setBody( ..body, delivery_address: e.target.value });
    setDeliveryAddress(e.target.value);
  };
  // const handlelastname= (e) => {
  //   // setBody( ..body, delivery_address: e.target.value });
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
      <Navbar />

      <main className="jumbotron">
        <div className="container d-flex text center justify-content-center ">
          <h1 className="text-user my-4">User Profile</h1>
        </div>
        <div className="cont-kontak container d-flex align-items-center flex-column flex-md-row flex-lg-row flex-xl-row">
          <div className="Image-Profile col-lg-6 d-flex justify-content-center">
            <Card className="card_images d-flex justify-content-center align-items-center  p-lg-5 col-lg-8 ">
              <div className="imagez d-flex justify-content-center align-items-center mt-3 mt-lg-5">
                <Card.Img className="card_image" variant="top" src={icon_profile} />
              </div>
              <Card.Body className="text-center">
                <Card.Text>Messi</Card.Text>
                <Card.Text>Messi@gmail.com</Card.Text>
                <Card.Title> Has been ordered {historiedData.length} products</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="contacts col-lg-6 container mt-5 mt-md-0 ">
            <Card className="card_contact px-md-3 py-lg-5 px-lg-4">
              <Card.Text className="mt-3 my-md-2">
                <u>Contacts</u>
              </Card.Text>
              <div className="container">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Phone Number" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </div>
            </Card>
          </div>
        </div>
        <div className="cont-detail container d-flex flex-column flex-md-row flex-lg-row flex-xl-row align-items-center">
          <div className="details col-12 col-md-8 col-lg-8 col-xl-8 container mt-5 ps-lg-2 pb-5 px-md-0 d-flex justify-content-center align-items-center">
            <Card className="px-md-3 p-lg-4 col-12 col-lg-10 ">
              <Card.Text className="mt-3">
                <u>Details</u>
              </Card.Text>
              <div className="container mb-4">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Display Name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your First Name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Last Name" />
                  </Form.Group>
                  {/* <div>
                  <div class="form-check ">
                    <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label " for="flexRadioDefault1">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
                </div> */}
                  {/* <div>
                  Date of Birth
                  <div>
                    <DatePicker onChange={onChange} value={value} />
                  </div>
                </div> */}
                </Form>
              </div>
            </Card>
          </div>
          <div className=" panel-button container col-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column gap-3 justify-content-center text-center pb-5 pb-md-0">
            <h5 className="doyou">Do you want to save the change?</h5>
            <div className=" tombol container d-flex flex-md-column flex-lg-column flex-wrap flex-xl-column gap-2 justify-content-between gap-md-3 ">
              <Button className=" font_saved savess col-6 col-md-12 ">Save Change</Button>
              <Button className=" font_saved col-4 col-md-12" variant="warning">
                Cancel
              </Button>
              <Button className=" font_saved col-6 col-md-12 savess">Change Password</Button>
              <Button className=" font_saved col-4 col-md-12" variant="warning">
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="cont-one container d-flex">
          <section className="cont-card container ">
            <div className="card-body card">
              <img
                className="card-img-top"
                // src={profile.image === null ? icon_profile : imgPrev !== "" ? imgPrev : profile.image}
                src={!image ? profile.image : imgPrev}
                alt=""
              />
              <label className="editicon" htmlFor="files" id="lable_file">
                <img className="pencils cursor" src={icon_edit} alt="icon_edit" />
              </label>
              <input id="files" type="file" name="file" onChange={handleImage} className="hidden" />
              <div className="detail-image container ">
                <p className="card-name ">{profile.display_name}</p>
                <p className="card-email">{profile.email}</p>
              </div>
              <p className="ordered">Has been ordered {historiedData.length} products</p>
            </div>
            <div className="card-address  card ">
              <div className="title-contactone">
                <h2 className={show === true ? "display-5" : "contactshowone"}>contacts</h2>
                <div
                  className="contedit"
                  onClick={(e) => {
                    setShow(false);
                    e.preventDefault();
                    setIsEdit(!isEdit);
                  }}
                >
                  <img className={show === true ? "editicon-right cursor " : "none"} src={icon_edit} alt="icon_edit" />

                  <p className={show === true ? "edits cursor" : "none"}>Edit</p>
                </div>
              </div>

              <form className="container col-12 d-flex  contform">
                <div className="container col-6  contemailform">
                  <label className="genderone" htmlFor="email">
                    Email address :
                  </label>
                  <input className="emailinput" type="email" disabled value={profile.email} />
                </div>

                <div className="container cont-label">
                  <label className="genderone" htmlFor="phone_number">
                    Mobile Number :
                  </label>
                  <input className="emailinput" type="tel" disabled value={profile.phone_number} />
                </div>
              </form>

              <div className="container cont-email">
                <div className="container cont-address">
                  <label className="genderone" htmlFor="phone_number">
                    Delivery Address :
                  </label>
                  <input
                    className={show === true ? "street" : "streetoneshow"}
                    type="text"
                    onChange={handleAddress}
                    placeholder={show === true ? profile.addres : ""}
                    // value={show === true ? profile.addres : }
                    disabled={isEdit}
                  />
                </div>
              </div>
              <p
                className={show === true ? "none" : "tombolsaveone  cursor"}
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
          {/* <div className="contTwo">
            <div className="card col-8  displaynames">
              <div className="title-contact ">
                <h2 className={show2 === true ? "display-5" : "contactshow"}>Details</h2>
                <div
                  className="contedit"
                  onClick={(e) => {
                    setShow2(false);
                    e.preventDefault();
                    setIsEdit2(!isEdit2);
                  }}
                >
                  <img className={show2 === true ? "editicon-right cursor " : "none"} src={icon_edit} alt="icon_edit" />

                  <p className={show2 === true ? "edits cursor" : "none"}>Edit</p>
                </div>
              </div>
              <div className="d-flex gap-5  fleks">
                <div className="col-7  col7">
                  <div className="container">
                    <div className="container  cont-display">
                      <label className="gender" htmlFor="phone_number">
                        Display Name :
                      </label>
                      <input className={show2 === true ? "streetshow" : "streetshow"} type="text" onChange={valueDisplayname} disabled={isEdit2} value={displayName} />
                    </div>
                  </div>
                  <div className="container">
                    <div className="container cont-display">
                      <label className="gender" htmlFor="phone_number">
                        First Name :
                      </label>
                      <input className={show2 === true ? "streetshow" : "streetshow"} type="text" onChange={valueFirstname} disabled={isEdit2} value={firstName} />
                    </div>
                  </div>
                  <div className="container">
                    <div className="container cont-display">
                      <label className="gender" htmlFor="phone_number">
                        Last Name :
                      </label>
                      <input className={show2 === true ? "streetshow" : "streetshow"} type="text" onChange={valueLastname} disabled={isEdit2} placeholder={show === true ? profile.lastName : ""} value={lastName} />
                    </div>
                  </div>
                </div>

                <div className="divgender">
                  <p className="gender"> Gender : </p>
                  <form
                    className="radio-payment cursor"
                    onChange={(e) => {
                      valueGender(e.target.value);
                    }}
                  >
                    <div className="form-check d-flex flex-row align-items-center styling-data-radio">
                      <input className="form-check-input  cursor " type="radio" value="Male" name="flexRadioDefault" />
                      <label className="form-check-label" for="flexRadioDefault1"></label>
                      <span className="spans">Male</span>
                    </div>
                    <div className="form-check d-flex flex-row align-items-center styling-data-radio">
                      <input className="form-check-input cursor" value="Female" type="radio" name="flexRadioDefault" />
                      <label className="form-check-label" for="flexRadioDefault1"></label>
                      <span className="spans">Female</span>
                    </div>
                  </form>
                </div>
              </div>
              <p
                className={show2 === true ? "none" : "tombolsave cursor"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit2(!isEdit2);
                  setShow2(true);
                }}
              >
                Save
              </p>
            </div>
            <div className="container cont-btn">
              <h1 className="save-btn">Do you want to save the change?</h1>
              <button type="button" className="btn btn-1 btn-size" onClick={editData}>
                {loading ? (
                  <>
                    <div className="lds-ring ">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <p className="loading-text">Loading . . .</p>
                  </>
                ) : (
                  " Save Change "
                )}
              </button>
              <button type="button" className="btn btn-2  btn-size " onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-size  btn-3 " onClick={toEditPwd}>
                Edit Password
              </button>
              <button
                type="button"
                className="btn btn-size  btn-3 "
                onClick={() => {
                  handleShowModal();
                }}
              >
                Log Out
              </button>
            </div>
          </div> */}
        {/* </div> */}

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

      <Footer />
      <ToastContainer />
    </>
  );
}

export default Profile;
