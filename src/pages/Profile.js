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
import editzz from "../assets/images/edit.png";

import icon_profile from "../assets/images/default-img.png";

function Profile() {
  TabTitle("Profile - Coffee Gayoe");

  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [display, setDisplay] = useState(profile.image);
  const [email, setEmail] = useState(profile.email);
  const [phone_number, setPhone_number] = useState(profile.phone_number);
  const [addres, setAddres] = useState(profile.addres);
  const [username, setUserName] = useState(profile.username);
  const [firstname, setFirstName] = useState(profile.firstname);
  const [lastname, setLastName] = useState(profile.lastname);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [edit, setEdit] = useState(false);
  const [deps, setDeps] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgPrev, setImgPrev] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showbtn, sethowbtn] = useState(true);
  const [btnsv, setBtnsv] = useState(false);
  const [form, setForm] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(profile.addres);
  const [historiedData, setHistoriedData] = useState("");
  const [value, onChange] = useState(new Date());

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
  }, [username]);

  // editData => fungsi untuk memasukan data kedalam database ketika di click button save change
  const editData = (e) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    e.preventDefault();
    const formData = new FormData();
    if (username) {
      formData.append("username", username);
    } else {
      formData.append("username", profile.username);
    }
    if (firstname) {
      formData.append("firstname", firstname);
    } else {
      formData.append("firstname", profile.firstname);
    }
    if (lastname) {
      formData.append("lastname", lastname);
    } else {
      formData.append("lastname", profile.lastname);
    }
    if (phone_number) {
      formData.append("phone_number", phone_number);
    } else {
      formData.append("phone_number", profile.phone_number);
    }
    if (email) {
      formData.append("email", email);
    } else {
      formData.append("email", profile.email);
    }
    if (addres) {
      formData.append("addres", addres);
    } else {
      formData.append("addres", profile.addres);
    }
    if (image) {
      formData.append("image", image);
    }
    axios
      .patch(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, formData, { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        SuccessMessage();
        setLoading(false);
        setEdit(true);
        setBtnsv(false);
        setIsEdit(false);
        setIsEdit2(false);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
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

  const valueFirstname = (e) => {
    setFirstName(e.target.value);
  };
  const valueLastname = (e) => {
    setLastName(e.target.value);
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const selectImage = () => {
    if (!image) return display === null ? icon_profile : display;
    return URL.createObjectURL(image);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImgPrev(URL.createObjectURL(e.target.files[0]));
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImgPrev(URL.createObjectURL(event.target.files[0]));
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
    setPhone_number(profile.phone_number);
    setFirstName(profile.firstname);
    setLastName(profile.lastname);
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
            <Card className="card_images d-flex justify-content-center align-items-center  p-lg-4 col-lg-8 ">
              <div className="imagez d-flex flex-column justify-content-center align-items-center gap-2 mt-5 mt-lg-5">
                <Card.Img className="card_image" variant="top" src={!image ? (profile.image === null ? icon_profile : profile.image) : imgPrev} />
                <label className={showbtn ? "editicon d-flex justify-content-center align-items-center" : "editicon d-flex flex-column justify-content-center align-items-center mt-3 ps-5"} for="lable_file">
                  <input type="file" id="files" name="file" onChange={handleImageChange} className={showbtn === false ? "d-flex justify-content-center" : "hidden"} />
                  <div className={showbtn ? "mt-3" : "hidden"}>
                    <Button
                      className={showbtn ? "d-flex justify-content-center butzzz" : "hidden"}
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        sethowbtn(false);
                        setBtnsv(true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className={showbtn === false ? "pe-5 mt-3" : "hidden"}>
                    <Button
                      className={showbtn === false ? "d-flex justify-content-center butzzz" : "hidden"}
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        sethowbtn(true);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </label>
              </div>
              <Card.Body className="text-center">
                <Card.Text>{profile.username}</Card.Text>
                <Card.Text>{profile.email}</Card.Text>
                <Card.Title> Has been ordered {historiedData.length} products</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="contacts col-lg-6 container mt-5 mt-md-0 ">
            <Card className="card_contact px-md-3 py-lg-5 px-lg-4">
              <div className="d-flex justify-content-between align-items-center">
                <Card.Text className="ps-5 mt-3 my-md-2 col-10 ">
                  <u>Contacts</u>
                </Card.Text>
                <div
                  className={isEdit === false ? "d-flex flex-column justify-content-center align-items-center col-2 mt-3" : "hidden"}
                  onClick={() => {
                    setBtnsv(true);
                    setIsEdit(true);
                  }}
                  name="image"
                  onChange={handleChangeForm}
                >
                  <img className="editzz" src={editzz} alt="/" />
                  <p className="m-0 pe-1 ed">Edit</p>
                </div>
              </div>
              <div className="container">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      disabled={isEdit === false ? true : false}
                      type="email"
                      placeholder={profile.email === null ? "Enter Your Email" : profile.email}
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      disabled={isEdit === false ? true : false}
                      type="text"
                      placeholder={profile.phone_number === null ? "Enter Your Phone Number" : profile.phone_number}
                      name="phone_number"
                      value={phone_number}
                      onChange={(event) => setPhone_number(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                      disabled={isEdit === false ? true : false}
                      as="textarea"
                      rows={3}
                      placeholder={profile.addres === null ? "Enter Your Address Here " : profile.addres}
                      name="addres"
                      value={addres}
                      onChange={(event) => setAddres(event.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Card>
          </div>
        </div>
        <div className="cont-detail container d-flex flex-column flex-md-row flex-lg-row flex-xl-row align-items-center">
          <div className="details col-12 col-md-8 col-lg-8 col-xl-8 container mt-5 ps-lg-2 pb-5 px-md-0 d-flex justify-content-center align-items-center">
            <Card className="px-md-3 p-lg-4 col-12 col-lg-10 ">
              <div className="d-flex justify-content-between align-items-center">
                <Card.Text className="ps-5 mt-3 my-md-2 col-10 ">
                  <u>Details</u>
                </Card.Text>
                <div
                  className={isEdit2 === false ? "d-flex flex-column justify-content-center align-items-center col-2 mt-3" : "hidden"}
                  onClick={() => {
                    setBtnsv(true);
                    setIsEdit2(true);
                  }}
                >
                  <img className="editzz" src={editzz} alt="/" />
                  <p className="m-0 pe-1 ed">Edit</p>
                </div>
              </div>
              <div className="container mb-4">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                      disabled={isEdit2 === false ? true : false}
                      type="text"
                      placeholder={profile.username === null ? "Enter Your Display Name" : profile.username}
                      name="username"
                      value={username}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      disabled={isEdit2 === false ? true : false}
                      type="text"
                      placeholder={profile.firstname === null ? "Enter Your First Name" : profile.firstname}
                      name="firstname"
                      value={firstname}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      disabled={isEdit2 === false ? true : false}
                      type="text"
                      placeholder={profile.lastname === null ? "Enter Your Last Name" : profile.lastname}
                      name="lastname"
                      value={lastname}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Card>
          </div>
          <div className=" panel-button container col-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column gap-3 justify-content-center text-center pb-5 pb-md-0">
            <h5 className={btnsv === false ? "hidden" : "doyou"}>Do you want to save the change?</h5>
            <div className=" tombol container d-flex flex-md-column flex-lg-column flex-wrap flex-xl-column gap-2 justify-content-between gap-md-3 ">
              <Button className={btnsv === false ? "hidden" : " font_saved savess col-6 col-md-12 "} onClick={editData}>
                {" "}
                {loading === true ? (
                  <div className="d-flex gap-2 justify-content-center align-items-center">
                    <div class="spinner-border spinner-border-sm text-dark" role="status"></div>
                    <div>Loading . . .</div>
                  </div>
                ) : (
                  "  Save Change"
                )}
              </Button>
              <Button
                className={btnsv === false ? "hidden" : " font_saved col-4 col-md-12"}
                variant="warning"
                onClick={() => {
                  setBtnsv(false);
                  setIsEdit(false);
                  setIsEdit2(false);
                  setForm({});
                }}
              >
                Cancel
              </Button>
              <Button className={btnsv === true ? "hidden" : " font_saved col-6 col-md-12 savess"} onClick={toEditPwd}>
                Change Password
              </Button>
              <Button
                className={btnsv === true ? "hidden" : " font_saved col-4 col-md-12"}
                variant="warning"
                onClick={() => {
                  handleShowModal();
                }}
              >
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
              variant="success"
              className="fw-bold text-bg-success text-white"
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
            <Button variant="danger" className="fw-bold text-bg-danger text-white" onClick={handleCloseModal}>
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
