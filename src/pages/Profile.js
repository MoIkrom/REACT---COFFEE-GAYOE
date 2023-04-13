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
import editzz from "../assets/images/edit.png";
import icon_profile from "../assets/images/default-img.png";

function Profile() {
  TabTitle("Profile - Coffee Gayoe");

  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState(null);
  const [email, setEmail] = useState(profile.email);
  const [phone_number, setPhone_number] = useState(profile.phone_number);
  const [addres, setAddres] = useState(profile.addres);
  const [username, setUserName] = useState(profile.username);
  const [firstname, setFirstName] = useState(profile.firstname);
  const [lastname, setLastName] = useState(profile.lastname);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgPrev, setImgPrev] = useState(null);
  const [showbtn, sethowbtn] = useState(true);
  const [btnsv, setBtnsv] = useState(false);
  const [form, setForm] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [historiedData, setHistoriedData] = useState("");

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getProfileUser = () => {
    const token = localStorage.getItem("token");
    getProfile(token)
      .then((res) => {
        setProfile(res.data.result.result[0]);
        console.log(res.data.result.result[0]);
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
      formData.append("image", saveImage);
    }
    axios
      .patch(`https://coffee-gayoe.vercel.app/api/v1/users`, formData, {
        headers: {
          "x-access-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
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

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setSaveImage(event.target.files[0]);
  };

  // SuccessMessage, LogoutMessage => notifikasi sukses dan gagal
  const SuccessMessage = () => {
    toast.success("Success Change Data !", {
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
    setImage(profile.image === null ? icon_profile : profile.image);
    setPhone_number(profile.phone_number);
    setFirstName(profile.firstname);
    setLastName(profile.lastname);
    setAddres(profile.addres);
    setEmail(profile.email);
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
                <Card.Img className="card_image" variant="top" src={image !== "" && image !== profile.image && image !== icon_profile ? image : profile.image === null ? icon_profile : profile.image} />

                <label className={showbtn ? "editicon d-flex justify-content-center align-items-center" : "editicon d-flex flex-column justify-content-center align-items-center mt-3 ps-5"} for="lable_file">
                  <input type="file" id="files" name="file" onChange={handleImageChange} className={showbtn === false ? "d-flex justify-content-center" : "hidden"} />
                  <div className={showbtn === true ? "mt-3" : "hidden"}>
                    <Button
                      className={showbtn === true ? "d-flex justify-content-center butzzz" : "hidden"}
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
                  handleCancel();
                  sethowbtn(true);
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

        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Logout Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to log out ?</Modal.Body>
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
      <ToastContainer />

      <Footer />
    </>
  );
}

export default Profile;
