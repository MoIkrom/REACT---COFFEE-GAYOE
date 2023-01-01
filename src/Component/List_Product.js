import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import css
// import styles from "../styles/Product.module.css"
import styles from "../styles/ListProduct.module.css";

// import image_product from "../assets/images/tomato.png";

import icon_edit from "../assets/images/icon_editpencil.png";

function List_Product(props) {
  const navigate = useNavigate();
  let params = useParams();
  const role = localStorage.getItem("role");
  return (
    <>
      <div
        onClick={() => navigate(`/detail-product/${props.id}`)}
        className={role === "admin" ? `col-md-2 p-4 position-relative text-wrap ${styles["content-productsadmin"]}` : `col-md-2 p-4 position-relative text-wrap ${styles["content-product"]}`}
      >
        <img className={styles["list-product-image"]} src={props.image} alt="image_product" />
        <div className={styles["label-promo"]}>
          <p>{props.discount}</p>
        </div>
        <p className={`${styles.title} col-12`}>{props.title}</p>
        <p className={`${styles.price} col-12`}>{props.price}</p>
        {params?.id}
        <div>
          <img onClick={() => navigate(`/detail-product/${props.id}`)} className={role === "admin" ? `${styles.edited}` : `${styles.none}`} src={icon_edit} alt="/" />
        </div>
      </div>
    </>
  );
}

export default List_Product;
