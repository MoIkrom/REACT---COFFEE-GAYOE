import React, { useState, useEffect } from "react";
import "../styles/History.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Card from "../Component/Card";
import { TabTitle } from "../utils/General-funct.js";

import { historyTransaction } from "../utils/api.js";

const History = () => {
  TabTitle("History - Coffee Gayoe");
  const [historied, setHistoried] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  useEffect(() => {
    getHistory();
    setLoading(false);
    // console.log(historied);
  }, []);

  return (
    <>
      <Navbar />
      <div className="jumb-title">
        <div className="container d-flex flex-column cont-title pt-5 ">
          <h1 className="title ">Let’s see what you have bought!</h1>
        </div>
        <section className="container cont-sec">
          <div className=" d-flex my-5 flex-wrap list-content gap-3 justify-content-around  ">
            {loading ? (
              <div>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p className="loading-text">Loading</p>
              </div>
            ) : (
              historied.map((e) => <Card className="d-flex " key={e.id} title={e.product_name} price={"Rp" + costing(e.total)} image={e.image} status={e.status} />)
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default History;
