import React from "react";

// import css
import "../styles/Card.css";

function Card(props) {
  return (
    <>
      <div className="cont__carsd col-10 col-md-5 col-lg-3 pb-5">
        <div className="card card-style">
          <div className="item-content d-flex ps-3 gap-3 align-items-center">
            <img className="images col-4" src={props.image} alt="Product_Image" />
            <div className="desc-card">
              <h1 className="title-card mt-3">{props.title}</h1>
              <p className="price-card">{props.price}</p>
              <p className={props.status === "Pending" ? "pending" : "paid"}>{props.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
