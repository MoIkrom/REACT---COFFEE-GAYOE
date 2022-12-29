import React from "react";

// import css
// import styles from "../styles/Product.module.css"
import styles from "../styles/Card.module.css";

// import tomato from "../assets/images/tomato.png";

function Card(props) {
  return (
    <>
      <div className={`row ${styles["row-card"]}`}>
        <div className="col">
          <div className={`card ${styles["card-style"]}`}>
            <div className={styles["item-content"]}>
              <img className={styles["images"]} src={props.image} alt="Product_Image" />
              <div className={styles["desc-card"]}>
                <h1 className={styles["title-card"]}>{props.title}</h1>
                <p className={styles["price-card"]}>
                  {props.price} <br />
                  {props.status}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-4">
          <div className={`card ${styles["card-style"]}`}>
            <div className={styles["item-content"]}>
              <img className={styles["images"]} src={tomato} alt="tomato" />
              <div className={styles["desc-card"]}>
                <h1 className={styles["title-card"]}>{props.title}</h1>
                <p className={styles["price-card"]}>
                  {props.price} <br />
                  {props.status}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className={`card ${styles["card-style"]}`}>
            <div className={styles["item-content"]}>
              <img className={styles["images"]} src={tomato} alt="tomato" />
              <div className={styles["desc-card"]}>
                <h1 className={styles["title-card"]}>{props.title}</h1>
                <p className={styles["price-card"]}>
                  {props.price} <br />
                  {props.status}
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Card;
