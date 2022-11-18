//login pages

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// // import { useDispatch, useSelector } from "react-redux";
// import authAction from "../redux/action/auth";
// import styles from "../styles/Login.module.css";
// import Footer from "../Component/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import withNavigate from "../utils/withNavigate";
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// // import { TabTitle } from "../utils/General-funct.js";

// // Import Images
// import background from "../assets/images/login-bg-1.png";
// import logo from "../assets/images/coffee-logo.png";
// import google from "../assets/images/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png";

// // class Login extends Component {
// function Login({ navigate }) {
//   const dispatch = useDispatch();
//   const [isPwdShown, setIsPwdShown] = useState(false);
//   // const [isLoading, setIsLoading] = useState(false);
//   // state = {
//   //   // url: `http://localhost:8080/api/v1/auth`,
//   //   url: `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth`,
//   //   isPwdShown: false,
//   //   email: "",
//   //   password: "",
//   // };
//   /*  get token localstorage */
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");

//   // const handleEmail = (e) => {
//   //   this.setEmail({ email: e.target.value });
//   // };

//   // const handlePasswords = (e) => {
//   //   this.setState({ password: e.target.value });
//   // };

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleApi = async (event) => {
//     event.preventDefault();

//     const body = {
//       email: email,
//       password: password,
//     };
//     // console.log(body);
//     try {
//       // const result = await login(body);
//       const result = await dispatch(authAction.loginAction(body));
//       // console.log(result.action.payload.data.data);
//       localStorage.setItem("login", JSON.stringify(result.action.payload.data.data));
//       toast.success("Login success", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 2000,
//       });
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       console.log(error);
//       // alert("success login");
//       toast.error("Email/password is wrong", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 2000,
//       });
//     }
//   };

//   const onClickHandler = (to) => {
//     navigate(to);
//   };

//   // render() {
//   return (
//     <>
//       <main className={styles["main-content"]}>
//         <div className={styles["cont-main"]}>
//           <div className={styles["side-images"]}>
//             <div className="col">
//               <img className={styles["img-side"]} src={background} alt="background" />
//             </div>
//           </div>
//           <div className={`container ${styles["cont-form"]}`}>
//             <header className={styles["header"]}>
//               <img className={styles["img-logo"]} src={logo} alt="logo" />
//               <span className={styles["logo-name"]} onClick={() => onClickHandler("/")}>
//                 Coffe Gayoe
//               </span>
//               <span>
//                 <button className={styles["btn-sign-up"]}>
//                   <Link className={styles["no-underline"]} to={"/register"}>
//                     Sign Up
//                   </Link>
//                 </button>
//               </span>
//             </header>
//             <form className={styles["form-content"]} onSubmit={handleApi}>
//               <h1 className={styles["login-text"]}>Login</h1>
//               <div className={`container ${styles["cont-form-email"]} `}>
//                 <form>
//                   <label className={styles["input-text"]}>Email Address :</label> <br />
//                   <input className={styles["input-login"]} type="text" name="email" required="true" placeholder="Enter your email address" onChange={handleEmail} />
//                 </form>
//                 <form>
//                   <label className={styles["input-text"]}>Password :</label> <br />
//                   <input className={styles["input-login"]} type={isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={handlePassword} />
//                   <p>
//                     Show Password
//                     <input
//                       type="checkbox"
//                       defaultChecked={false}
//                       onClick={() => setIsPwdShown(!isPwdShown)}
//                       // onChange={() => {
//                       //   this.setState((prevState) => ({
//                       //     isPwdShown: prevState.isPwdShown ? false : true,
//                       //   }));
//                       // }}
//                     ></input>{" "}
//                   </p>
//                 </form>
//                 <label className={styles["forgot-text"]} onClick={() => onClickHandler("/forgot-password")}>
//                   {" "}
//                   Forgot Password ?
//                 </label>

//                 <button className={`btn btn-warning ${styles["btn-login"]}`}>Login</button>
//                 {/* <ToastContainer /> */}
//                 <button className={`btn btn-outline-secondary ${styles["btn-login-2"]}`}>
//                   <span>
//                     <img src={google} alt="logo-google" />{" "}
//                   </span>
//                   Login with Google
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>

//       <footer className={styles["footer-login"]}>
//         <Footer onClick={() => onClickHandler("/")} />
//       </footer>
//     </>
//   );
//   // }
// }

// const componentLogin = withNavigate(Login);

// export default componentLogin;

// ==============================================================

// // login func
// import React from "react";
// import styles from "../styles/Login.module.css";
// import Footer from "../Component/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import withNavigate from "../utils/withNavigate";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { TabTitle } from "../utils/General-funct";

// // Import Images
// import background from "../assets/images/login-bg.png";
// import logo from "../assets/images/coffee-logo.png";
// import google from "../assets/images/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png";

// function Login() {
//   const navigate = useNavigate();

//   //get token
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   //get token localstorage
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   useState = {
//     isPwdShown: true,
//   };

//   axios
//     .post(`http://localhost:8080/api/v1/auth`, {
//       email,
//       password,
//     })
//     .then((response) => {
//       console.log(response.data.result.data.token);
//       localStorage.setItem("token", JSON.stringify(response.data.result.data.token));
//       navigate("/");
//     })
//     .catch((err) => {
//       alert("Email or Password is WRONG !!!");
//       console.log(err);
//     });
//   TabTitle("Login");

//   return (
//     <>
//       <main className={styles["main-content"]}>
//         <div className={styles["cont-main"]}>
//           <div className={styles["side-images"]}>
//             <div className="col">
//               <img className={styles["img-side"]} src={background} alt="background" />
//             </div>
//           </div>
//           <div className={`container ${styles["cont-form"]}`}>
//             <header className={styles["header"]}>
//               <img className={styles["img-logo"]} src={logo} alt="logo" />
//               <span className={styles["logo-name"]}>Coffe Gayoe</span>
//               <span>
//                 <button className={styles["btn-sign-up"]}>
//                   <Link className={styles["no-underline"]} to={"/register"}>
//                     Sign Up
//                   </Link>
//                 </button>
//               </span>
//             </header>
//             <div className={styles["form-content"]}>
//               <h1 className={styles["login-text"]}>Login</h1>
//               <div className={`container ${styles["cont-form-email"]} `}>
//                 <form>
//                   <label className={styles["input-text"]}>Email Address :</label> <br />
//                   <input className={styles["input-login"]} type="text" placeholder="Enter your email address" onChange={handleEmail} />
//                 </form>
//                 <form>
//                   <label className={styles["input-text"]}>Password :</label> <br />
//                   <input className={styles["input-login"]} type={this.state.isPwdShown ? "text" : "password"} placeholder="Enter your password" onChange={handlePassword} />
//                   <p>
//                     Show Password{" "}
//                     <input
//                       type="checkbox"
//                       defaultChecked={true}
//                       onChange={() => {
//                         this.setState((prevState) => ({
//                           isPwdShown: prevState.isPwdShown ? false : true,
//                         }));
//                       }}
//                     ></input>{" "}
//                   </p>
//                 </form>
//                 <p className={styles["forgot-text"]} onClick={() => this.props.navigate("/forgot")}>
//                   {" "}
//                   Forgot Password ?
//                 </p>

//                 <button className={`btn btn-warning ${styles["btn-login"]}`} onClick={() => this.props.navigate("/profile")}>
//                   {" "}
//                   Login{" "}
//                 </button>
//                 <button className={`btn btn-outline-secondary ${styles["btn-login-2"]}`}>
//                   <span>
//                     <img src={google} alt="logo-google" />{" "}
//                   </span>
//                   Login with Google
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`container ${styles["cont-card-promo"]}`}>
//           <section className={` card ${styles["card-promo"]}`}>
//             <div className={`container ${styles["cont-promo"]}`}>
//               <h1 className={styles["get-card"]}>Get your member card now!</h1>
//               <p>Let's join with our member and enjoy the deals.</p>
//               <span className={styles["create"]}>
//                 <button className={`btn btn-warning ${styles["button"]}`}>Create Now</button>
//               </span>
//             </div>
//           </section>
//         </div>
//       </main>

//       <footer className={styles["footer-login"]}>
//         <Footer />
//       </footer>
//     </>
//   );
// }

// const componentLogin = withNavigate(Login);

// export default componentLogin;

// // end func

// // //  <div className="container">
// // // <main className={styles["main-content"]}>
// // //   <aside className={styles["side-content"]}>
// // //     <img className={styles["side-image"]} src={background} alt="Coffee-Shop" />
// // //   </aside>
// // //   <div className="container">
// // //     <section className={styles["form-content"]}>
// // //       <div className={styles["container-head"]}>
// // //         <img className={styles["logo-top"]} src={logo} alt="coffee-logo" />
// // //         <span>
// // //           <h1 className={styles["text-coffee-1"]}>Coffee Gayoe</h1>
// // //         </span>
// // //         <button className={styles["btn-sign-up"]} id="login">
// // //           Sign Up
// // //         </button>
// // //       </div>
// // //       <div className={styles["container-form"]}>
// // //         <h1 className={styles["text-sign-up"]}>Login</h1>
// // //         <div className={styles["register-form"]}>
// // //           <form className={styles["full-width"]}>
// // //             <div className={styles["input-div"]}>
// // //               <label>Email Address:</label>
// // //               <input className={styles["input-login"]} type="text" placeholder="Enter your email address" />
// // //             </div>
// // //             <div className={styles["input-div"]}>
// // //               <label className={styles["label-pwd"]}>Password:</label>
// // //               <input type="password" placeholder="Enter your password" />
// // //             </div>
// // //             <p className={styles["forgot-pwd"]}>Forgot Password ?</p>
// // //             <div className={styles["btn-yellow"]}>
// // //               <button className={styles.btn} id="sign-up">
// // //                 Login
// // //               </button>
// // //             </div>

// // //             <div className={styles["btn-yellow"]}>
// // //               <button className={styles["google-sign-up"]}>
// // //                 <p className={styles["login-google-white"]}>
// // //                   <span className={styles["button-sign-up-google"]}>
// // //                     <img className={styles["google-icon"]} src={google} alt="google-logo" />
// // //                     Login with Google{" "}
// // //                   </span>
// // //                 </p>
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   </div>
// // // </main>
// // // <section className={styles.jumbotron}>
// // //   <aside className={styles.card}>
// // //     <h1>Get your member card now!</h1>
// // //     <p>Let's join with our member and enjoy the deals.</p>
// // //   </aside>
// // //   <aside className={styles["create-now"]}>
// // //     <button className={styles.create}>Create Now</button>
// // //   </aside>
// // // </section>
// // // </div>

// // //   -----------------------------
// // #login {
// //     position: relative;
// //     width: 130px;
// //     height: 45px;
// //     border-radius: 40px;
// //     margin-right: 60px;
// //     font-family: Rubik;
// //     font-style: medium;
// //     font-size: 16px;
// //     font-weight: 500;
// //     line-height: 100%;
// //     color: #6a4029;
// //   }

// //   .text-sign-up {
// //     font-family: Rubik;
// //     font-style: Bold;
// //     font-size: 35px;
// //     line-height: 100%;
// //     color: #6a4029;
// //     text-align: center;
// //     font-weight: 700;
// //   }

// //   .container-form {
// //     margin: 100px auto;
// //   }
// //   .form-content {
// //     display: flex;
// //     /* flex: 1; */
// //     flex-direction: column;
// //     align-items: center;
// //     margin: 40px auto;
// //     /* flex: 1; */
// //   }
// //   .label-pwd {
// //     font-family: Rubik;
// //     font-style: bold;
// //     font-weight: 500;
// //     font-size: 20px;
// //     line-height: 24px;
// //     line-height: 100%;
// //     color: #4f5665;
// //     margin-left: -12px;
// //   }

// //   .input-login {
// //     display: block;
// //     height: 20px;
// //     width: 460px;
// //     margin-top: 11px;
// //     margin-left: -15px;
// //     border-radius: 17px;
// //     font-family: Rubik;
// //     font-style: normal;
// //     font-size: 15px;
// //     line-height: 24px;
// //     line-height: 100%;
// //     text-align: left;
// //     padding: 20px;
// //     color: #9f9f9f;
// //   }

// //   .input-div {
// //     width: 90%;
// //     margin: 10px;
// //   }

// //   .btn {
// //     border: none;
// //     border-color: #ffba33;
// //     background-color: #ffba33;
// //     width: 100%;
// //     height: 58px;
// //     border-radius: 17px;
// //     margin-top: 25px;
// //     margin-left: none;
// //     font-size: rubik;
// //     font-style: Bold;
// //     font-size: 20px;
// //     font-weight: 700;
// //     line-height: 26px;
// //     line-height: 100%;
// //     vertical-align: Top;
// //     color: #6a4029;
// //   }
// //   .btn {
// //     border-color: #ffba33;
// //     background-color: #ffba33;
// //     width: 100%;
// //     height: 58px;
// //     border-radius: 17px;
// //     margin-top: 25px;
// //   }
// //   .btn-sign-up {
// //     width: 170px;
// //     border-color: #ffba33;
// //     background-color: #ffba33;
// //     border-radius: 22px;
// //     margin-left: 310px;
// //     height: 40px;
// //     font-family: Rubik;
// //     font-style: medium;
// //     font-size: 16px;
// //     font-weight: 500;
// //     line-height: 19px;
// //     color: #6a4029;
// //     border: none;
// //   }

// //   /* form {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     justify-content: center;
// //     margin-top: 50px;
// //   } */

// //   .forgot-pwd {
// //     font-family: Rubik;
// //     font-style: bold;
// //     font-weight: 700;
// //     font-size: 20px;
// //     line-height: 24px;
// //     line-height: 100%;
// //     margin-left: -320px;
// //     margin-top: 15px;
// //     color: #6a4029;
// //     text-decoration: underline;
// //     margin-left: -314px;
// //   }

// //   #sign-up {
// //     justify-content: center;
// //     margin-top: 40px;
// //     text-align: center;
// //     display: block;
// //     height: 70px;
// //     width: 90%;
// //     left: 70%;
// //     top: 7px;
// //     border-radius: 20px;

// //     font-family: Rubik;
// //     font-weight: 500;
// //     font-style: Bold;
// //     font-size: 20px;
// //     line-height: 25px;
// //     line-height: 105%;
// //   }

// //   .btn-yellow {
// //     width: 505px;
// //     margin: 10px;
// //     height: 75px;
// //   }

// //   .google-sign-up {
// //     width: 100%;
// //     border-radius: 15px;
// //     border: 0px;
// //     height: 57px;
// //     margin-top: 10px;
// //     background-color: #f1f0f0da;
// //     border: 2px;
// //   }
// //   .button-sign-up-google {
// //     margin-left: none;
// //     font-size: Poppins;
// //     font-style: Bold;
// //     font-size: 17px;
// //     font-weight: 700;
// //     line-height: 26px;
// //     line-height: 100%;
// //     vertical-align: Top;

// //     color: #000000;
// //   }
// //   /* .google-icon {
// //     display
// //   } */
// //   .jumbotron {
// //     position: absolute;
// //     justify-content: center;
// //     background-color: #ffffff;
// //     height: 227px;
// //     width: 85%;
// //     margin-left: 78px;
// //     margin-top: -122px;
// //     display: flex;
// //     flex: 1;
// //     flex-direction: row;
// //     border-radius: 10px;
// //     box-shadow: 0px 0px 1px #4f5665;
// //   }

// //   .card,
// //   .create-now {
// //     flex: 1;
// //     display: flex;
// //   }
// //   .card {
// //     display: flex;
// //     flex-direction: column;
// //     justify-content: center;
// //     margin-top: 5%;
// //     padding: 80px;
// //   }
// //   .create {
// //     width: 158px;
// //     border-radius: 10px;
// //     height: 44px;
// //     margin-left: 243px;
// //     margin-top: -17px;
// //     border: none;
// //     border-color: #ffba33;
// //     background-color: #ffba33;
// //     font-size: rubik;
// //     font-style: Bold;
// //     font-size: 16px;
// //     font-weight: 700;
// //     line-height: 25px;
// //     line-height: 100%;
// //     vertical-align: Top;
// //     color: #6a4029;
// //   }
// //   .card h1 {
// //     font-family: Rubik;
// //     font-style: Medium;
// //     font-size: 35px;
// //     line-height: 45px;
// //     vertical-align: Center;
// //     color: #0b132a;
// //     width: 350px;
// //     margin-top: -79px;
// //   }
// //   .card p {
// //     font-family: Rubik;
// //     font-style: Regular;
// //     font-size: 16px;
// //     vertical-align: Center;
// //     color: #4f5665;
// //     width: 350px;
// //     margin-top: 10px;
// //   }

// //   /* footer {
// //     background-color: #f8f8f8;
// //     display: flex;
// //     flex-direction: row;
// //     justify-content: center;
// //   } */

// //   .footer-left,
// //   .footer-rigth {
// //     flex: 1;
// //     display: flex;
// //   }
// //   /* img {
// //       margin-top: -5px;
// //       align-items: center;
// //       font-family: Rubik;
// //       font-style: Bold;
// //       font-size: 20px;
// //       font-weight: 700;
// //       line-height: 24px;
// //       letter-spacing: 0em;
// //       text-align: left;
// //       line-height: 100%;
// //       vertical-align: top;
// //       margin-right: 10px;
// //     } */
// //   #create {
// //     width: 208px;
// //     border: none;
// //   }

// //   .footer-left {
// //     display: flex;
// //     flex-direction: column;

// //     margin-top: 5%;
// //     padding: 80px;
// //   }

// //   .logo-top {
// //     margin-left: 20px;
// //     height: 35px;
// //   }
// //   .coffee-review {
// //     width: 400px;
// //     height: 120px;
// //     align-content: space-around;
// //   }
// //   .review-coffee {
// //     margin-top: 15px;
// //     width: 80%;
// //     text-align: left;
// //     font-family: Rubik;
// //     font-style: Medium;
// //     font-size: 16px;
// //     line-height: 30px;
// //     line-height: 158%;
// //     align-content: flex-start;

// //     vertical-align: Top;
// //     color: #4f5665;
// //   }
// //   .image-icon {
// //     position: relative;
// //     display: flex;
// //     flex: 1;
// //     flex-direction: row;
// //     align-items: center;
// //     margin-top: 15px;
// //     margin-left: -3%;
// //   }

// //   .copyright {
// //     color: #afb5c0;

// //     display: flex;
// //     flex: 1;
// //     flex-direction: row;
// //     align-items: center;
// //     margin-top: -14px;
// //   }

// //   .footer-right {
// //     display: flex;
// //     text-align: center;
// //     flex: 1;
// //     margin-top: 150px;
// //     flex-direction: row;
// //     justify-content: space-evenly;
// //   }

// //   .head-footer-left {
// //     text-align: left;
// //     font-family: Rubik;
// //     font-style: Medium;
// //     font-weight: 500;
// //     font-size: 18px;
// //     line-height: 30px;
// //     /* line-height: 141%; */
// //     color: #0b132a;
// //   }

// //   .list {
// //     margin-left: -32px;
// //     list-style: none;
// //     text-align: left;
// //     font-family: Rubik;
// //     font-style: Regular;
// //     font-size: 16px;
// //     line-height: 30px;
// //     line-height: 158%;

// //     color: #4f5665;
// //   }

// //   .text-coffee {
// //     font-family: Rubik;
// //     font-style: Bold;
// //     font-size: 20px;
// //     line-height: 24px;
// //     line-height: 100%;
// //     color: #0b132a;
// //     text-align: center;
// //     margin-left: 37px;
// //     margin-top: -25px;
// //     width: 132px;
// //   }
// //   .text-coffee-1 {
// //     font-family: Rubik;
// //     font-style: Bold;
// //     font-size: 20px;
// //     line-height: 24px;
// //     line-height: 100%;
// //     color: #0b132a;
// //     text-align: center;
// //     margin-left: 3px;
// //     margin-top: 5px;
// //     width: 132px;
// //   }

// //   @media only screen and (max-width: 768px) {
// //     .side-content {
// //       display: none;
// //     }
// //     .full-width {
// //       margin: -25% auto;
// //       margin-bottom: 38px !important;
// //     }
// //     .input {
// //       width: 78%;
// //     }
// //     .jumbotron {
// //       display: none;
// //     }
// //     #sign-up {
// //       width: 80%;
// //       width: 80%;
// //     }
// //     #google-sign-up {
// //       width: 80%;
// //     }
// //     .google-icon {
// //       margin-left: -377px;
// //     }

// //     .product-footer {
// //       margin-top: 3px;
// //       margin-left: -147px;
// //     }
// //     .engage-footer {
// //       margin-top: 3px;
// //       margin-left: -147px;
// //     }
// //     .coffee-review {
// //       width: 345px;
// //     }
// //     .google-icon {
// //       margin-left: -377px;
// //       margin-top: 352px;
// //     }
// //   }

// //   /* start media query */

// //   /* @media only screen and (max-width: 600px) {
// //     main {
// //       background-image: url(../assets/images/home.png);
// //       height: 750px;
// //       margin-left: -200px;
// //     }
// //   } */

// // import React, { Component } from "react";

// // export default class copy extends Component {
// //   render() {
// //     return <div>copy</div>;
// //   }
// // }
// // {
// //   /* <a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by th studio - Flaticon</a> */
// // }

// // {/* <a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by th studio - Flaticon</a> */}
