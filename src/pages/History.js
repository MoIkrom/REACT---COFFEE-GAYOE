import React, { useState, useEffect } from "react";
import "../styles/History.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import axios from "axios";
import Card from "../Component/Card";
import { jwtDecode } from "jwt-decode";
import { TabTitle } from "../utils/General-funct.js";

const History = () => {
  TabTitle("History - Coffee Gayoe");
  const [historied, setHistoried] = useState([]);
  const [detailhistory, setDetailHistory] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const Host = process.env.REACT_APP_BACKEND_HOST;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token untuk mendapatkan payload
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Ambil id dari payload
      setLoading(true);
      axios
        .get(`${Host}/api/v1/transactions/history/${userId}?`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          setHistoried(res.data.data);
          setDetailHistory(res.data.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [Host]);

  return (
    <>
      <Navbar />
      <div
        className="jumb-title d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "700px",
        }}
      >
        <div className="container d-flex flex-column cont-title pt-5 ">
          <h1 className="title ">Let’s see what you have bought!</h1>
        </div>
        <section className="container cont-sec py-5">
          <div
            className=" card d-flex p-3 p-lg-5"
            style={{
              borderRadius: "20px",
            }}
          >
            {historied.length < 1 ? (
              <div className="text-center">
                <p
                  className="m-0"
                  style={{
                    fontWeight: "700",
                  }}
                >
                  {loading
                    ? "Loading . . ."
                    : "You don't hane any transaction yet"}
                </p>
              </div>
            ) : (
              historied.map((e) => (
                <Card
                  key={e.id}
                  date={e.created_at}
                  total={detailhistory.total_belanja}
                  detailhistory={e}
                />
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default History;
