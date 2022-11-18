import React, { Component, Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import userActions from "../../redux/action/user";
// import { TabTitle } from "../utils/General-funct.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import styles from "../styles/Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import withNavigate from "../utils/withNavigate";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Image
import icon_edit from "../assets/images/icon_editpencil.png";
// import { render } from "@testing-library/react";
// const Profile = () => {
//   TabTitle("Profile - Coffee Gayoe");

// function Profile({ navigate }) {
class Profile extends Component {
  // const [open, setOpen] = useState(false);

  // const handleLogout = async () => {
  //   setOpen(!open);
  // };

  state = {
    editprofile: [],
    url: `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/profile`,
    urlLogout: `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth`,
    token: localStorage.getItem("token"),
    searchParams: {},
    email: "",
    phone_number: "",
    address: null,
    displayname: null,
    firstname: null,
    lastname: null,
    birthday: null,
    gender: null,
    displaynameNotChange: null,
    image: null,
    displayImage: null,
    isEditContact: true,
    isEditDetail: true,
    show: false,
  };

  componentDidMount() {
    axios
      .get(this.state.url, { headers: { "x-access-token": this.state.token } })
      .then((res) => {
        console.log(res);

        this.setState({
          displayname: res.data.result.result[0].display_name,
          displaynameNotChange: res.data.result.result[0].display_name,
          image: res.data.result.result[0].image,
          email: res.data.result.result[0].email,
          firstname: res.data.result.result[0].firstname,
          lastname: res.data.result.result[0].lastname,
          phone_number: res.data.result.result[0].phone_number,
          address: res.data.result.result[0].addres,
        });
      })
      .catch((err) => console.log(err));
  }

  // editData => fungsi untuk memasukan data kedalam database ketika di click button save change
  editData = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    if (this.state.image) formdata.append("image", this.state.image);
    if (this.state.address) formdata.append("address", this.state.address);
    if (this.state.displayname) formdata.append("displayname", this.state.displayname);
    if (this.state.firstname) formdata.append("firstname", this.state.firstname);
    if (this.state.lastname) formdata.append("lastname", this.state.lastname);
    if (this.state.gender) formdata.append("gender", this.state.gender);
    // if (this.state.birthday) formdata.append('birthday', this.state.birthday)
    // for (var pair of formdata.entries()) {
    //     console.log(pair[0] + " - " + pair[1]);
    // }

    axios
      .patch(this.state.url, formdata, { headers: { "x-access-token": this.state.token, "Content-Type": "multipart/form-data" } })
      .then(() => {
        this.SuccessMessage();
        this.setState({ isLoading: false, isEdit: true });
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // get value input
  valueEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  valueAddress = (e) => {
    this.setState({ address: e.target.value });
  };
  valuePhone_number = (e) => {
    this.setState({ phone_number: e.target.value });
  };
  valueBirthday = (e) => {
    this.setState({ birthday: e.target.value, debug: e.target.value });
  };
  valueDisplayname = (e) => {
    this.setState({ displayname: e.target.value });
  };
  valueFirstname = (e) => {
    this.setState({ firstname: e.target.value });
  };
  valueLastname = (e) => {
    this.setState({ lastname: e.target.value });
  };
  valueGender = (e) => {
    this.setState({ gender: e.target.value });
  };
  onEditContacts = () => {
    this.setState({ isEditContact: false });
  };

  handleFile = (e) => {
    this.setState({ image: e.target.files[0] });
    // console.log(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
  };

  inputImage = (event) => {
    // console.log(this.state.image);
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0]),
        // image: event.target.files[0],
      });
    }
  };

  // SuccessMessage, LogoutMessage => notifikasi sukses dan gagal
  SuccessMessage = () => {
    toast.success("Data Save Change !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  LogoutMessage = () => {
    toast.success("Logout Success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  handleLogout = () => {
    axios
      .delete(this.state.urlLogout, { headers: { "x-access-token": this.state.token } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteToken = () => {
    localStorage.removeItem("token");
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  //  onClickHandler = (to) => {
  //   navigate(to);
  // };

  render() {
    return (
      <Fragment>
        <header className={styles["header"]}>
          <Navbar />
        </header>
        <main className={styles["jumbotron"]}>
          <div className={`container`}>
            <h1 className={styles["text-user"]}>User Profile</h1>
          </div>
          <section className={`container ${styles["cont-card"]}`}>
            <div className={`card ${styles["card-body"]}`}>
              <img className={styles["card-img-top"]} src={this.state.image} alt="profile_picture" />
              <label className={styles.editicon} htmlFor="files" id="lable_file">
                <img className={styles["cursor"]} src={icon_edit} alt="icon_edit" />
              </label>
              <input
                id="files"
                type="file"
                name="file"
                // onChange={(e) => {
                //    console.log(e.target.files[0]);
                //    this.setState({
                //       image: e.target.files[0],
                //    });
                // }}
                onChange={this.inputImage}
                className={styles.hidden}
              />
              <div className={`container ${styles["detail-image"]}`}>
                <p className={styles["card-name"]}>{this.state.displayname}</p>
                <p className={styles["card-email"]}>{this.state.email}</p>
              </div>

              <p className={styles["ordered"]}>Has been ordered 15 products</p>
            </div>
            <div></div>
            <div className={`card ${styles["card-address"]}`}>
              <div className={styles["title-contact"]}>
                <h2 className={styles["display-5"]}>contacts</h2>
                <img className={`${styles["editicon-right"]} ${styles["cursor"]}`} src={icon_edit} alt="icon_edit" onClick={this.onEditContats} />
              </div>

              <form className={`container ${styles["cont-email"]}`}>
                <div className={`container ${styles["cont-label"]}`}>
                  <label htmlFor="email">Email address :</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    // onChange={this.onEmail}
                    value={this.state.email}
                    disabled
                  />
                  <hr className={styles["my-1"]} />
                </div>

                <div className={`container ${styles["cont-label"]}`}>
                  <label className={styles.label} htmlFor="phone_number">
                    Mobile Number :
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    id="phones"
                    value={this.state.phone_number}
                    // onChange={this.onPhone}
                    disabled
                  />
                  <hr className={styles["my-1"]} />
                </div>
              </form>

              <div className={`container ${styles["cont-email"]}`}>
                <div className={`container ${styles["cont-address"]}`}>
                  <p>Delivery Address :</p>
                  <p className={styles["street"]}>{this.state.address}</p>
                  <hr className={styles["my-1"]} />
                </div>
              </div>
            </div>
          </section>
          <div className={`container`}>
            <div className={`card ${styles["card-down"]}`}>
              <div className={`row ${["detail-jumbotron"]}`}>
                <h1 className={styles["display-5"]}>Details</h1>
                <div className={`container ${styles["cont-email"]}`}>
                  <div className="container">
                    <p className={styles["title-name"]}>Display name :</p>
                    <p className={styles["dis-name"]}>{this.state.displayname} </p>
                    <hr className={styles["my-1"]} />
                    <p className={styles["title-name"]}>First name :</p>
                    <p className={styles["dis-name"]}>{this.state.firstname} </p>
                    <hr className={styles["my-1"]} />
                    <p className={styles["title-name"]}>Last name :</p>
                    <p className={styles["dis-name"]}>{this.state.lastname} </p>
                    <hr className={styles["my-1"]} />
                  </div>
                  <div className="container">
                    <p>DD/MM/YY</p>
                    <p>24 / 06 /1987 </p>
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
              <button
                type="button"
                className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`}
                onClick={() => {
                  this.handleShow();
                }}
              >
                {/* <button type="button" className={`btn ${styles["btn-size"]} ${styles["btn-3"]}`} onClick={handleLogout}> */}
                <p>Log Out</p>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="fw-bold text-bg-secondary text-white" onClick={this.handleClose}>
                No ❌
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
                Yes ✅
              </Button>
            </Modal.Footer>
          </Modal>
        </main>

        <footer className={styles["footer-cont"]}>
          <Footer />
        </footer>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default withNavigate(Profile);
