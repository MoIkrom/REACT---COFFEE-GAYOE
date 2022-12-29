import React, { useState, useEffect } from "react";
import styles from "../styles/History.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Card from "../Component/Card";
import { TabTitle } from "../utils/General-funct.js";

import { historyTransaction } from "../utils/api.js";

const History = () => {
  TabTitle("History - Coffee Gayoe");
  const [historied, setHistoried] = useState([]);

  const getHistory = () => {
    const token = localStorage.getItem("token");
    historyTransaction(token)
      .then((res) => {
        setHistoried(res.data.result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHistory();
    // console.log(historied);
  }, []);

  return (
    <>
      <div className={`${styles["navs"]}`}>
        <Navbar />
      </div>
      <main className={styles["main-content"]}>
        <div className={`jumbotron ${styles["jumb-title"]}`}>
          <div className={`container ${styles["cont-title"]}`}>
            <h1 className={styles["title"]}>Let’s see what you have bought!</h1>
            <p className={styles["sub-title"]}>Long press to delete item</p>
          </div>
        </div>
        <section className={`container  ${styles["cont-sec"]}`}>
          <div>
            <div className={` row ${styles.contHist} d-flex align-items-center justify-content-center`}>
              <div className="col-4">
                {historied.map((e) => (
                  <Card key={e.id} title={e.product_name} price={e.total} image={e.image} status={e.status} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles["footer"]}>
        <Footer />
      </footer>
    </>
  );
};

export default History;
