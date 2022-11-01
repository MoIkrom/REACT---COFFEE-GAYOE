import React, { Component, Fragment } from "react";
import styles from "../styles/History.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Card from "../Component/Card";
// import { TabTitle } from "../utils/General-funct.js";

// import Images
import tomato from "../assets/images/tomato.png";
import stick from "../assets/images/drum-stick.png";
import hezelnut from "../assets/images/Hezelnut.png";
import salty from "../assets/images/salty-rice.png";

// const History = () => {
//   TabTitle("History - Coffee Gayoe");
class History extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Navbar />
        </header>
        <main className={styles["main-content"]}>
          <div className={`jumbotron ${styles["jumb-title"]}`}>
            <div className={`container ${styles["cont-title"]}`}>
              <h1 className={styles["title"]}>Let’s see what you have bought!</h1>
              <p className={styles["sub-title"]}>Long press to delete item</p>
            </div>
          </div>
          <section className={`container  ${styles["cont-sec"]}`}>
            <div>
              <div className="row">
                <div className="col-4">
                  <Card title="Veggie tomato mix" price="IDR 34000" status="Delivered" image={tomato} />
                  <Card title="Salty Rice" price="IDR 34000" status=" Delivered to Table 4" image={salty} />
                  <Card title="Hezelnut Latte" price="IDR 34000" status=" Delivered to Table 4" image={hezelnut} />
                  <Card title="Drum Stick" price="IDR 34000" status=" Delivered to Table 4" image={stick} />
                </div>
                <div className="col-4">
                  <Card title="Veggie tomato mix" price="IDR 34000" status="Delivered" image={tomato} />
                  <Card title="Salty Rice" price="IDR 34000" status=" Delivered to Table 4" image={salty} />
                  <Card title="Hezelnut Latte" price="IDR 34000" status=" Delivered to Table 4" image={hezelnut} />
                  <Card title="Drum Stick" price="IDR 34000" status=" Delivered to Table 4" image={stick} />
                </div>
                <div className="col-4">
                  <Card title="Veggie tomato mix" price="IDR 34000" status="Delivered" image={tomato} />
                  <Card title="Salty Rice" price="IDR 34000" status=" Delivered to Table 4" image={salty} />
                  <Card title="Hezelnut Latte" price="IDR 34000" status=" Delivered to Table 4" image={hezelnut} />
                  <Card title="Drum Stick" price="IDR 34000" status=" Delivered to Table 4" image={stick} />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles["footer"]}>
          <Footer />
        </footer>
      </Fragment>
    );
  }
}
export default History;
