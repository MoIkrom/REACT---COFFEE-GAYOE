/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-date-picker";
import { jwtDecode } from "jwt-decode";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utils/api";
import "../styles/Profile.css";
import { Form, Card } from "react-bootstrap";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Image
import editzz from "../assets/images/edit.png";
import icon_profile from "../assets/images/default-img.png";

function Profile() {
  TabTitle("Profile - Coffee Gayoe");

  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState(null);
  const [email, setEmail] = useState(dataUser.email);
  const [phone_number, setPhone_number] = useState(dataUser.phone_number);
  const [address, setAddress] = useState(dataUser.addres);
  const [firstname, setFirstName] = useState(dataUser.firstname);
  const [lastname, setLastName] = useState(dataUser.lastname);
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

  const dataHistory = () => {
    const token = localStorage.getItem("token");
    const Host = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${Host}/api/v1/transactions/history`, {
        headers: { "x-access-token": token },
      })
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
  const Host = process.env.REACT_APP_BACKEND_HOST;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token untuk mendapatkan payload
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Ambil id dari payload

      axios
        .get(`${Host}/api/v1/users/${userId}`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          setProfile(res.data.data[0]);
          setDataUser(res.data.data[0].profile[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Host]);

  const handleChangePhone = (e) => {
    setDataUser({ phone_number: e.target.value });
  };

  // editData => fungsi untuk memasukan data kedalam database ketika di click button save change
  const editData = (e) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    e.preventDefault();
    const formData = new FormData();
    // if (username) {
    //   formData.append("username", username);
    // } else {
    //   formData.append("username", profile.username);
    // }
    if (firstname) {
      formData.append("firstname", firstname);
    } else {
      formData.append("firstname", dataUser.firstname);
    }
    if (lastname) {
      formData.append("lastname", lastname);
    } else {
      formData.append("lastname", dataUser.lastname);
    }
    if (phone_number) {
      formData.append("phone_number", phone_number);
    } else {
      formData.append("phone_number", dataUser.phone_number);
    }
    if (email) {
      formData.append("email", email);
    } else {
      formData.append("email", profile.email);
    }
    if (address) {
      formData.append("address", address);
    } else {
      formData.append("address", dataUser.address);
    }
    if (image) {
      formData.append("image", saveImage);
    }
    axios
      .patch(` ${process.env.REACT_APP_BACKEND_HOST}/api/v1/users`, formData, {
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
    // setImage(profile.image === null ? icon_profile : profile.image);
    setPhone_number(dataUser.phone_number);
    setFirstName(dataUser.firstname);
    setLastName(dataUser.lastname);
    setAddress(dataUser.address);
    setEmail(dataUser.email);
  };

  return (
    <>
      <Navbar />

      <main className="jumbotron">
        <div className="p-lg-5 mx-lg-5 mx-3 pb-5">
          <h1 className="text-user ms-2 py-3  ">User Profile</h1>
          <Card
            style={{ borderRadius: "20px" }}
            className="d-flex justify-content-center align-items-center "
          >
            <div className="d-flex justify-content-start flex-column flex-lg-row align-items-lg-start align-items-center col-12">
              <div className="d-flex flex-column justify-content-center align-items-center col-lg-4 p-5">
                <div className="d-flex flex-column justify-content-center align-items-center mb-3 ">
                  <Card.Img
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                    src={icon_profile}
                  />
                  <Card.Text
                    className="m-0"
                    style={{
                      fontFamily: "Rubik",
                      fontSize: "20px",
                    }}
                  >
                    {dataUser.firstname} {dataUser.lastname}
                  </Card.Text>
                  <p
                    className="m-0 "
                    style={{
                      fontFamily: "Rubik",
                      fontSize: "14px",
                    }}
                  >
                    {profile.email}
                  </p>
                </div>
                <div className="d-flex flex-column gap-3">
                  <Button
                    className="px-5"
                    style={{
                      fontFamily: "Poppins",
                      color: "#6A4029",
                      borderRadius: "10px",
                    }}
                    variant="warning"
                    onClick={() => {}}
                  >
                    Choose Photo
                  </Button>
                  <Button
                    className="px-5"
                    style={{
                      fontFamily: "Poppins",
                      background: "#6A4029",
                      border: "none",
                      borderRadius: "10px",
                    }}
                    onClick={() => {}}
                  >
                    Remove Photo
                  </Button>
                </div>
                <div className="mt-5">
                  <Button
                    className="px-5 py-2"
                    style={{
                      fontFamily: "Poppins",
                      background: "#ffffff",
                      borderColor: "#6A4029",
                      color: "#6A4029",
                      borderRadius: "20px",
                    }}
                    onClick={() => {}}
                  >
                    Edit Password
                  </Button>
                </div>
                <Card.Text
                  className="mt-5"
                  style={{
                    fontFamily: "Poppins",
                    color: "#6A4029",
                    fontSize: "20px",
                  }}
                >
                  Do you want to save the change ?
                </Card.Text>
                <div className=" gap-3 d-flex flex-column">
                  <Button
                    className="px-5 py-2"
                    style={{
                      fontFamily: "Poppins",
                      background: "#6A4029",
                      border: "none",
                      color: "#ffffff",
                      borderRadius: "20px",
                    }}
                    onClick={(e) => editData(e)}
                  >
                    Save Change
                  </Button>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      background: " #FFBA33",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    className="px-5 py-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-8 col-12 p-3 py-lg-5 pe-lg-5">
                <Card
                  style={{
                    boxShadow: "0px 0px 1px #4f5665",
                    borderRadius: "20px",
                  }}
                  className=" d-flex col-12 p-lg-5 p-3 "
                >
                  <div className="d-flex justify-content-between align-items-center me-3">
                    <p
                      className="text-decoration-underline"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "700",
                        fontSize: "25px",
                        color: "#4F5665",
                      }}
                    >
                      Contact
                    </p>
                  </div>
                  <div className="d-flex col-12 flex-column flex-lg-row">
                    <div className="col-lg-6 col-12 px-3">
                      <Form>
                        <Form.Group
                          className="mb-3 "
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Email address :
                          </Form.Label>
                          <Form.Control
                            type="email"
                            className="input-no-outline p-0"
                            placeholder="name@example.com"
                            value={profile.email}
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Delivery adress :
                          </Form.Label>
                          <Form.Control
                            type="email"
                            className="input-no-outline p-0"
                            value={dataUser.address}
                            placeholder="Sout Jakarta , etc."
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="col-lg-6 col-12 px-3 ">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Phone Number :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="input-no-outline p-0"
                            value={dataUser.phone_number}
                            onChange={handleChangePhone}
                            placeholder="081-012-000"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <p
                      className="text-decoration-underline"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "700",
                        fontSize: "25px",
                        color: "#4F5665",
                      }}
                    >
                      Details
                    </p>
                  </div>
                  <div className="col-lg-6 col-12 px-3 ">
                    <div className=" col-12">
                      <Form>
                        <Form.Group
                          className="mb-4 "
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Display Name :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="input-no-outline p-0"
                            value={profile.username}
                            placeholder="name@example.com"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontStyle: "italic" }}>
                            First Name :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="input-no-outline p-0"
                            placeholder="name@example.com"
                            value={dataUser.firstname}
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Last Name :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="input-no-outline p-0"
                            value={dataUser.lastname}
                            placeholder="name@example.com"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
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
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }, 1000);
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              className="fw-bold text-bg-danger text-white"
              onClick={handleCloseModal}
            >
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
