/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { TabTitle } from "../utils/General-funct.js";

// Import Image
import search from "../assets/images/search.png";
import user from "../assets/images/user-Vector.png";
import location from "../assets/images/location-Vector.png";
import love from "../assets/images/love-Vector.png";
import checklist from "../assets/images/green-checklist.png";
import teamwork from "../assets/images/team-work.png";
import checkorder from "../assets/images/checklist-order.png";
import wings from "../assets/images/Chicken-Wings.png";
import hezelnut from "../assets/images/Hezelnut-Latte.png";
import Pinky from "../assets/images/Pinky-Promise.png";
import spotify from "../assets/images/spotify.png";
import discord from "../assets/images/discord.png";
import netflix from "../assets/images/netflix.png";
import reddit from "../assets/images/reddit.png";
import globe from "../assets/images/globe.png";
import vlezh from "../assets/images/Flezh-Robert.png";
import parker from "../assets/images/parker.jpeg";
import kim from "../assets/images/park.png";
import star from "../assets/images/yellow-star.png";

function Home() {
  TabTitle(" Welcome to Coffee Gayoe");
  useEffect(() => {
    console.log("masuk coy");
  }, []);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center align-items-md-start">
                <h1 className="display-4">Start Your Day with Coffee and Good Meals</h1>
                <p className="lead">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!.</p>
                <button type="button" className="btn btn-warning" id="get-started">
                  Get Started
                </button>
              </div>
              <div className="d-none d-md-flex mb-1 col-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-start mt-4">
                <form class="form-inline col-12 d-flex  my-2 my-lg-0 gap-md-3 ">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-warning   my-2 my-sm-0" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="container">
        <section className="d-none container d-md-flex jumbotron staff">
          <div className="container d-flex justify-content-evenly align-items-center ">
            <div className="d-flex justify-content-evenly align-items-center ">
              <div className="col-md-12 d-flex flex-column gap-1">
                <div className="d-lg-flex justify-content-lg-center align-items-lg-center gap-lg-2">
                  <img id="user-vector" src={user} alt="..." />
                  <h1 className="card-text">90+</h1>
                </div>
                <p className="m-0 text-card">Staff</p>
              </div>
            </div>
            <div className="d-flex justify-content-evenly align-items-center ">
              <div className="col-md-12  d-flex flex-column gap-1">
                <div className="d-lg-flex justify-content-lg-center align-items-lg-center gap-lg-2">
                  <img id="user-vector" src={love} alt="..." />
                  <h1 className="card-text">30+</h1>
                </div>
                <p className="m-0 text-card">Customers</p>
              </div>
            </div>
            <div className="d-flex justify-content-evenly align-items-center">
              <div className="col-md-12 d-flex flex-column gap-1">
                <div className="d-lg-flex justify-content-lg-center align-items-lg-center gap-lg-2 ">
                  <img id="user-vector" src={location} alt="..." />
                  <h1 className="card-text">30+</h1>
                </div>
                <p className="m-0 text-card">Stores</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container mt-2 mt-md-0 p-md-0">
        <div className="row ">
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center col-md-6 col-12 my-3 mt-md-0 p-md-0">
            <img id="teamwork" src={teamwork} alt="team-work" />
          </div>
          <div className="container col-md-6 p-md-0">
            <div className="col-12 ">
              <h1 className="text-center proved">We Provide Good Coffee and Healthy Meals</h1>
              <p className="p-3 ps-md-1 m-0 explore">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
              <ol className="list-prove">
                <li style={{ padding: "6px" }}>
                  <img id="cheklist" src={checklist} alt="checklist" /> &nbsp; High quality beans
                </li>
                <li style={{ padding: "6px" }}>
                  <img id="cheklist" src={checklist} alt="checklist" /> &nbsp; Healthy meals, you can request the ingredients
                </li>
                <li style={{ padding: "6px" }}>
                  <img id="cheklist" src={checklist} alt="checklist" /> &nbsp; Chat with our staff to get better experience for ordering
                </li>
                <li style={{ padding: "6px" }}>
                  <img id="cheklist" src={checklist} alt="checklist" /> &nbsp; Free member card with a minimum purchase of Rp 200.000 .
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="jumbotron my-5">
          <div className="container" id="title-favorite">
            <h1>Here is People’s Favorite</h1>
            <p className="p-3 m-0 explore ">Let’s choose and have a bit taste of poeple’s favorite. It might be yours too!</p>
          </div>

          <div className="container overflows_card">
            <div className="container d-flex justify-content-lg-center gap-3">
              <div className="col-8 col-lg-3 col-md-5">
                <div className="card card-menu">
                  <img className="image-menu" src={hezelnut} alt="Hezelnut-Latte" />
                  <h1 id="title-menu">Hazelnut Latte</h1>
                  <div className="container font_menu ps-5 pe-0 mb-5">
                    <ol className="m-0 p-0 gap-2 d-flex flex-column list_menu">
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Hazelnut Syrup
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Wanilla Whipped Cream
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Ice / Hot
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Sliced Banana on Top
                      </li>
                    </ol>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 id="price-1">IDR 25.000</h1>

                    <button type="button" className="btn btn-outline-warning btn-order" id="order-now">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-3 col-md-5">
                <div className="card card-menu">
                  <img className="image-menu" src={Pinky} alt="Pinky-Promise" />
                  <h1 id="title-menu">Pinky Promise</h1>
                  <div className="container font_menu ps-5 pe-0 mb-5">
                    <ol className="m-0 p-0 gap-2 d-flex flex-column list_menu">
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; 1 Shot of Coffee
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Vanilla Whipped Cream
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Chocolate Biscuits
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Strawberry Syrup
                      </li>
                    </ol>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 id="price-1">IDR 30.000</h1>
                    <button button type="button" className="btn btn-outline-warning btn-order" id="order-now">
                      Select
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-3 col-md-5">
                <div className="card card-menu">
                  <img className="image-menu" src={wings} alt="Chicken-Wings" />
                  <h1 id="title-menu">Chicken-Wings</h1>
                  <div className="container font_menu ps-5 pe-0 mb-5">
                    <ol className="m-0 p-0 gap-2 d-flex flex-column list_menu">
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Wings
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Drum Sticks
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Mayonaise and Lemon
                      </li>
                      <li>
                        <img src={checkorder} alt="checklist-order" /> &nbsp; Hot Fried
                      </li>
                    </ol>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 id="price-1">IDR 40.000</h1>
                    <button type="button" className="btn btn-outline-warning btn-order" id="order-now">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-md-5">
          <h1 id="visit-us">Visit Our Store in the Spot on the Map Below</h1>
          <p id="see-you">See our store in every city on the spot and spen your good day there. See you soon!</p>
          <img id="huge-global" src={globe} alt="Huge-Global" />

          <div className="container mt-5 mb-md-5 text-center">
            <h1>Our Partner</h1>
            <div className="container gap-2">
              <div className="row justify-content-evenly mt-4 ">
                <img className="col-5 col-md-6 mt-md-4 h-img" src={netflix} alt="netflix" />
                <img className="col-5 col-md-6 mt-md-4 h-img" src={reddit} alt="reddit" />
                <img className="col-5 col-md-6 mt-3 mt-md-5 h-img" src={discord} alt="discord" />
                <img className="col-5 col-md-6 mt-3 mt-md-5 h-img" src={spotify} alt="spotify" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-5 pt-md-5">
        <div className="container d-flex flex-column justify-content-center text-center align-items-center">
          <h1>Loved by Thousands of Happy Customer</h1>
          <p className="story-cost">These are the stories of our customers who have visited us with great pleasure.</p>
        </div>
      </section>
      <section className="container">
        <div className="container my-4">
          <div className="d-flex gap-3 gap-lg-5 overflows_card">
            <div className="col-12 col-lg-4 col-md-6">
              <div className="card gap-3 p-3 height_card">
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-3">
                    <img src={vlezh} alt="Flezh-Robert" />
                    <div className="d-flex flex-column">
                      <h1 className="name_profile">Viezh Robert</h1>
                      <p className="m-0">Warsaw, Poland</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <p className="m-0">4.5</p>
                    <img src={star} alt="Yellow-Star" />
                  </div>
                </div>
                <p className="m-0">“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"</p>
              </div>
            </div>
            <div className="col-12  col-lg-4 col-md-6">
              <div className="card gap-3 p-3 height_card">
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-3">
                    <img className="parker" src={parker} alt="Flezh-Robert" />
                    <div className="d-flex flex-column">
                      <h1 className="name_profile">Putra Parker</h1>
                      <p className="m-0">Shanxi, China</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <p className="m-0">4.5</p>
                    <img src={star} alt="Yellow-Star" />
                  </div>
                </div>
                <p className="m-0">“I like it because I like to travel far and still can make my day better just by drinking their Hazelnut Latte"</p>
              </div>
            </div>
            <div className="col-12  col-lg-4 col-md-6">
              <div className="card gap-3 p-3 height_card">
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-3">
                    <img src={kim} alt="Flezh-Robert" />
                    <div className="d-flex flex-column">
                      <h1 className="name_profile"> Kim Young Jou</h1>
                      <p className="m-0">Seoul, South Korea</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <p className="m-0">4.5</p>
                    <img src={star} alt="Yellow-Star" />
                  </div>
                </div>
                <p className="m-0">“This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-5">
        <aside className="container card promo d-flex flex-md-row align-items-center gap-3 justify-content-center text-center p-3">
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-start">
            <h1 className="m-0">
              Check our promo today!
              <p id="deals">Let's see the deals and pick yours!</p>
            </h1>
          </div>
          <div className="col-6 col-md-4">
            <button type="button" className="btn btn-warning" id="see-promo">
              See Promo
            </button>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Home;
