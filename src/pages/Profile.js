/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utils/api";
import "../styles/Profile.css";
import { Form, Card } from "react-bootstrap";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Image
import editIcone from "../assets/images/edit.png";
import icon_profile from "../assets/images/default-img.png";

function Profile() {
  TabTitle("Profile - Coffee Gayoe");

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [historiedData, setHistoriedData] = useState("");
  const [updatedData, setUpdatedData] = useState("");

  const [form, setForm] = useState(profile);

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
          setForm(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Host]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      profile: prevState.profile
        ? prevState.profile.map((item, index) =>
            index === 0
              ? { ...item, [name]: value } // Perbarui field dalam item pertama
              : item
          )
        : [{ [name]: value }], // Jika profile belum ada, buat array baru
    }));
  };
  const LoadingSpinner = () => (
    <div className="d-flex gap-2 justify-content-center align-items-center">
      <div
        className="spinner-border spinner-border-sm text-dark"
        role="status"
      ></div>
      <div>Loading . . .</div>
    </div>
  );

  const handleProfileUpdate = () => {
    const token = localStorage.getItem("token");
    const host = process.env.REACT_APP_BACKEND_HOST;

    setIsLoading(true);
    setIsEdit(true);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        console.log(form);
        // Data yang akan diupdate
        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("username", form.username);
        formData.append("firstname", form.profile?.[0].firstname);
        formData.append("lastname", form.profile?.[0].lastname);
        formData.append("phone_number", form.profile?.[0].phone_number);
        formData.append("address", form.profile?.[0].address);

        // Tetap gunakan gambar lama jika tidak ada gambar baru
        // if (updatedData.image instanceof File) {
        //   formData.append("image", updatedData.image);
        // } else {
        //   formData.append("image", data.profile?.[0].image); // Gunakan gambar lama
        // }

        // Kirim request ke server untuk update data
        axios
          .patch(
            `${host}/api/v1/users/profile/${userId}`,
            formData, // Data yang akan diupdate
            {
              headers: {
                "x-access-token": token,
                "Content-Type": "multipart/form-data",
              }, // Header dengan token
            }
          )
          .then((res) => {
            toast.success("Success Update Data", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,
            });
            setIsEdit(false);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,
            });
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Token decode error:", error);
        setIsLoading(false);
      }
    } else {
      toast.error("No token found. Please log in again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setIsLoading(false);
    }
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

  const imageSrc = profile[0]?.image || icon_profile;

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
                    src={imageSrc}
                  />
                  <Card.Text
                    className="m-0"
                    style={{
                      fontFamily: "Rubik",
                      fontSize: "20px",
                    }}
                  >
                    {profile.profile?.[0].firstname} &nbsp;
                    {profile.profile?.[0].lastname}
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
                {isEdit && (
                  <div>
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
                        onClick={handleProfileUpdate}
                      >
                        {isLoading ? <LoadingSpinner /> : "Save Change"}
                      </Button>
                      <Button
                        style={{
                          fontFamily: "Poppins",
                          background: " #FFBA33",
                          border: "none",
                          borderRadius: "20px",
                        }}
                        className="px-5 py-2"
                        // onClick={handleCancel}
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column col-lg-8 col-12 p-3 py-lg-5 pe-lg-5">
                <Card
                  style={{
                    boxShadow: "0px 0px 1px #4f5665",
                    borderRadius: "20px",
                  }}
                  className=" d-flex col-12 px-lg-5 pb-lg-5 p-3 "
                >
                  {!isEdit && (
                    <div className="d-flex justify-content-end ">
                      <div
                        className="d-flex justify-content-center align-items-center gap-2 btn p-0 border-0"
                        onClick={() => {
                          setIsEdit(true);
                        }}
                      >
                        <p
                          className="m-0 pt-1"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                            fontSize: "15px",
                            color: "#4F5665",
                          }}
                        >
                          Edit
                        </p>
                        <img
                          src={editIcone}
                          alt="edit_icon"
                          width="20px"
                          height="20px"
                        />
                      </div>
                    </div>
                  )}

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
                            name="email"
                            className="input-no-outline p-0"
                            placeholder="name@example.com"
                            value={form.email}
                            disabled={!isEdit}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
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
                            type="text"
                            name="address"
                            className="input-no-outline p-0"
                            value={form.profile?.[0].address}
                            disabled={!isEdit}
                            onChange={handleChange}
                            placeholder="Sout Jakarta , etc."
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
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
                            name="phone_number"
                            disabled={!isEdit}
                            onChange={handleChange}
                            className="input-no-outline p-0"
                            value={form.profile?.[0].phone_number}
                            placeholder="081-012-000"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
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
                            disabled={!isEdit}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            className="input-no-outline p-0"
                            value={form.username}
                            placeholder="input username"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
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
                            disabled={!isEdit}
                            name="firstname"
                            onChange={handleChange}
                            type="text"
                            className="input-no-outline p-0"
                            placeholder="input your first name"
                            value={form.profile?.[0].firstname}
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ fontStyle: "italic" }}>
                            Last Name :
                          </Form.Label>
                          <Form.Control
                            disabled={!isEdit}
                            onChange={handleChange}
                            type="text"
                            name="lastname"
                            className="input-no-outline p-0"
                            value={form.profile?.[0].lastname}
                            placeholder="input your lastname"
                            style={{
                              border: "none",
                              borderBottom: "2px solid #000",
                              borderRadius: "0",
                              backgroundColor: "white",
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
