import React, { Component, Fragment } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footerhome from "../Component/Footer-Home";
// import { TabTitle } from "../utils/General-funct.js";

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
import amazon from "../assets/images/amazon.png";
import discord from "../assets/images/discord.png";
import netflix from "../assets/images/netflix.png";
import reddit from "../assets/images/reddit.png";
import globe from "../assets/images/globe.png";
import vlezh from "../assets/images/Flezh-Robert.png";
import parker from "../assets/images/parker.jpeg";
import kim from "../assets/images/park.png";
import star from "../assets/images/yellow-star.png";
import arrow from "../assets/images/arrow-vector.png";
import back from "../assets/images/back-arrow.png";
import scroll from "../assets/images/scroll-brown.png";
import scrollz from "../assets/images/scroll-zero.png";

// const Home = () => {
//   TabTitle("Coffee Gayoe");

class Home extends Component {
  render() {
    return (
      <Fragment>
        <header className={styles["header"]}>
          <Navbar />
        </header>
        <main className={styles["main-content"]}>
          <div className={styles["jumbotron"]}>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h1 className={styles["display-4"]}>Start Your Day with Coffee and Good Meals</h1>
                  <p className={styles["lead"]}>We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!.</p>
                  <button type="button" className="btn btn-warning" id={styles["get-started"]}>
                    Get Started
                  </button>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-outline-light" id={styles["search"]}>
                    <img id={styles["search-button"]} src={search} alt="..." />
                    <span id={styles["text-search"]}>Search </span>
                  </button>
                </div>
              </div>
              <section className="jumbotron" id={styles["staff"]}>
                <div className="container" id={styles["card-jumbotron"]}>
                  <div className="row">
                    <div className="col-4">
                      <h1 className={styles["card-text"]}>
                        <img id={styles["user-vector"]} src={user} alt="..." />
                        {/* <!-- <img id="yellow-rectangle" src="/Assets/yellow-Rectangle .png" /> --> */}
                        90+
                      </h1>
                      <p id={styles["text-card"]}>Staff</p>
                    </div>
                    <div className="col-4" id={styles["location-border"]}>
                      <h1 className={styles["card-text"]}>
                        <img id={styles["location-vector"]} src={location} alt="..." />
                        {/* <!-- <img id="yellow-rectangle" src="/Assets/yellow-Rectangle .png" /> --> */}
                        30+
                      </h1>
                      <p id={styles["text-card"]}>Stores</p>
                    </div>
                    <div className="col-4">
                      <h1 className={styles["card-text"]}>
                        <img id={styles["love-vector"]} src={love} alt="..." />
                        {/* <!-- <img id="yellow-rectangle" src="/Assets/yellow-Rectangle .png" /> --> */}
                        800+
                      </h1>
                      <p id={styles["text-card"]}>Customers</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <section className={styles["review"]}>
          <div className="container" id={styles["review-cont"]}>
            <div className="row ">
              <div className={`col ${["col-prove"]}`}>
                <img id={styles["teamwork"]} src={teamwork} alt="team-work" />
              </div>
              <div className={`container col ${styles["col-prove"]}`}>
                <h1 id={styles["proved"]}>We Provide Good Coffee and Healthy Meals</h1>
                <p id={styles["explore"]}>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                <ol id={styles["list-prove"]}>
                  <li style={{ padding: "6px" }}>
                    <img id={styles["cheklist"]} src={checklist} alt="checklist" /> &nbsp; High quality beans
                  </li>
                  <li style={{ padding: "6px" }}>
                    <img id={styles["cheklist"]} src={checklist} alt="checklist" /> &nbsp; Healthy meals, you can request the ingredients
                  </li>
                  <li style={{ padding: "6px" }}>
                    <img id={styles["cheklist"]} src={checklist} alt="checklist" /> &nbsp; Chat with our staff to get better experience for ordering
                  </li>
                  <li style={{ padding: "6px" }}>
                    <img id={styles["cheklist"]} src={checklist} alt="checklist" /> &nbsp; Free member card with a minimum purchase of IDR 200.000.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="jumbotron" id={styles["section-prove"]}>
          <div className="jumbotron" id={styles["fav-menu-jumbotron"]}>
            <div className="container" id={styles["title-favorite"]}>
              <h1>Here is People’s Favorite</h1>
              <p id={styles["choose"]}>Let’s choose and have a bit taste of poeple’s favorite. It might be yours too!</p>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className={`card ${styles["card-menu"]}`}>
                    <img className={styles["image-menu"]} src={hezelnut} alt="Hezelnut-Latte" />
                    <h1 id={styles["title-menu"]}>Hazelnut Latte</h1>
                    <div className="container" id={styles["ingredient"]}>
                      <ol className={styles["ol-list-1"]}>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Hazelnut Syrup
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Wanilla Whipped Cream
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Ice / Hot
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Sliced Banana on Top
                        </li>
                      </ol>
                    </div>
                    <div className={styles["cont-price"]}>
                      <h1 id={styles["price-1"]}>IDR 25.000</h1>

                      <button type="button" className={`btn btn-outline-warning ${styles["btn-order"]} `} id={styles["order-now"]}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className={`card ${styles["card-menu"]}`}>
                    <img className={styles["image-menu"]} src={Pinky} alt="Pinky-Promise" />
                    <h1 id={styles["title-menu"]}>Pinky Promise</h1>
                    <div className="container" id={styles["ingredient"]}>
                      <ol className={styles["ol-list-1"]} id={styles["ingredient-list-2"]}>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; 1 Shot of Coffee
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Vanilla Whipped Cream
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Chocolate Biscuits
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Strawberry Syrup
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Sliced strawberry on Top
                        </li>
                      </ol>
                    </div>
                    <div className={styles["cont-price-2"]}>
                      <h1 id={styles["price-2"]}>IDR 30.000</h1>
                      <button button type="button" className={`btn btn-outline-warning ${styles["btn-order"]} `} id={styles["order-now-2"]}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className={`card ${styles["card-menu"]}`}>
                    <img className={styles["image-menu"]} src={wings} alt="Chicken-Wings" />
                    <h1 id={styles["title-menu"]}>Chicken-Wings</h1>
                    <div className="container" id={styles["ingredient"]}>
                      <ol className={styles["ol-list-1"]} id={styles["ingredient-list-3"]}>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Wings
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Drum Sticks
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Mayonaise and Lemon
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Hot Fried
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Secret Recipe
                        </li>
                        <li id={styles["ingredient-list-1"]}>
                          <img src={checkorder} alt="checklist-order" /> &nbsp; Buy 1 Get 1 only for Dine in
                        </li>
                      </ol>
                    </div>
                    <div className={styles["cont-price-3"]}>
                      <h1 id={styles["price-3"]}>IDR 40.000</h1>
                      <button type="button" className={`btn btn-outline-warning ${styles["btn-order"]} `} id={styles["order-now-3"]}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["cont-visit-us"]}>
          <div className="container" id={styles["cont-visit-us"]}>
            <h1 id={styles["visit-us"]}>Visit Our Store in the Spot on the Map Below</h1>
            <p id={styles["see-you"]}>See our store in every city on the spot and spen your good day there. See you soon!</p>
            <img id={styles["huge-global"]} src={globe} alt="Huge-Global" />

            <div className="container">
              <h1 id={styles["our-partner"]}>Our Partner</h1>
            </div>
          </div>
          <div className={`container ${styles["partner"]}`}>
            <div className={`row ${styles["partnership"]}`}>
              <div className="col-2">
                <img className={styles["netflix"]} src={netflix} alt="netflix" />
              </div>
              <div className="col-2">
                <img className={styles["reddit"]} src={reddit} alt="reddit" />
              </div>
              <div className="col-2">
                <img className={styles["amazon"]} src={amazon} alt="amazon" />
              </div>
              <div className="col-2">
                <img className={styles["discord"]} src={discord} alt="discord" />
              </div>
              <div className="col-2">
                <img className={styles["spotify"]} src={spotify} alt="spotify" />
              </div>
            </div>
          </div>
        </section>
        <section className={`container ${styles["section-love-cost"]}`}>
          <div className={`container ${styles["cont-loved-cost"]}`}>
            <h1 id={styles["loved-by-costumer"]}>Loved by Thousands of Happy Customer</h1>
            <p className={styles["story-cost"]}>These are the stories of our customers who have visited us with great pleasure.</p>
          </div>
        </section>
        <section className={`container ${styles["section-comment"]}`}>
          <div className={`container`}>
            <div className="row" id={styles["comment-user"]}>
              <div className="col-3 md-col-2">
                <div className={`card ${styles["card-profile"]}`}>
                  <div className="container">
                    <div className={styles["header"]}>
                      <img className={styles["image-profile"]} src={vlezh} alt="Flezh-Robert" />
                      <h1 className={styles["name-profile"]}>Viezh Robert</h1>
                      <p className={styles["from"]}>Warsaw, Poland</p>
                      <p className={styles["rating"]}>
                        4.5
                        <img className={styles["star"]} src={star} alt="Yellow-Star" />
                      </p>
                    </div>

                    <p className={styles["comment"]}>“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"</p>
                  </div>
                </div>
              </div>
              <div className="col-3 md-col-2">
                <div className={`card ${styles["card-profile"]}`}>
                  <div className="container">
                    <div className={styles["header"]}>
                      <img className={`${styles["image-profile"]} ${styles["parker"]}`} src={parker} alt="parker" />
                      <h1 className={styles["name-profile"]}>Putra Parker</h1>
                      <p className={styles["from"]}>Shanxi, China</p>
                      <p className={styles["rating"]}>
                        4.5
                        <img className={styles["star"]} src={star} alt="Yellow-Star" />
                      </p>
                    </div>

                    <p className={styles["comment"]}>“I like it because I like to travel far and still can make my day better just by drinking their Hazelnut Latte"</p>
                  </div>
                </div>
              </div>
              <div className={`col-3 md-col-2 ${styles["col-kim"]}`}>
                <div className={`card ${styles["card-profile"]}`}>
                  <div className="container">
                    <div className={styles["header"]}>
                      <img className={styles["image-profile"]} src={kim} alt="Kim-Young-Jou" />
                      <h1 className={styles["name-kim"]}>Kim Young Jou</h1>
                      <p className={styles["from-kim"]}>Seoul, South Korea</p>
                      <p className={styles["rating-kim"]}>
                        4.5
                        <img className={styles["star"]} src={star} alt="Yellow-Star" />
                      </p>
                    </div>

                    <p className={styles["comment"]}>“This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!"</p>
                  </div>
                </div>
              </div>
              <div className={styles["scroll-cont"]}>
                <img className={styles["scroll-1"]} src={scroll} alt="/" />
                <img className={styles["scroll"]} src={scrollz} alt="/" />
                <img className={styles["scroll"]} src={scrollz} alt="/" />
                <img className={styles["scroll"]} src={scrollz} alt="/" />
              </div>
              <div className={styles["arrow-position"]}>
                <button type="button" className="btn" id={styles["back-arrow"]}>
                  <img className={styles["arrow-style"]} src={back} alt="arrow" />
                </button>
                <button type="button" className="btn" id={styles["arrow"]}>
                  <img className={styles["arrow-style"]} src={arrow} alt="arrow" />
                </button>
              </div>
            </div>
            <aside className="card" id={styles["promo"]}>
              <div className="container" id={styles["cont-promo"]}>
                <div className="row">
                  <div className="col-6">
                    <h1 id={styles["check-promo"]}>
                      Check our promo today!
                      <p id={styles["deals"]}>Let's see the deals and pick yours!</p>
                    </h1>
                  </div>
                  <div className="col-6">
                    <button type="button" className="btn btn-warning" id={styles["see-promo"]}>
                      See Promo
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
        <footer id={styles["cont-footer"]}>
          <Footerhome />
        </footer>
      </Fragment>
    );
  }
}

export default Home;
