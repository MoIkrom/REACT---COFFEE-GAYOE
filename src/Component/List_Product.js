import React from "react";
// import { useNavigate } from "react-router-dom";

// import css
// import styles from "../styles/Product.module.css"
import styles from "../styles/ListProduct.module.css";

// import image_product from "../assets/images/tomato.png";

function List_Product(props) {
  return (
    <>
      <div className={`col-md-2 p-4 position-relative text-wrap ${styles["content-product"]}`}>
        <img className={styles["list-product-image"]} src={props.image} alt="image_product" />
        <div className={styles["label-promo"]}>
          <p>{props.discount}</p>
        </div>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.price}>{props.price}</p>
      </div>
    </>
  );
}

export default List_Product;
