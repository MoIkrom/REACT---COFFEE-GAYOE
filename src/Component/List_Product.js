import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import css
import "../styles/ListProduct.css";

import icon_edit from "../assets/images/icon_editpencil.png";

function List_Product(props) {
  const navigate = useNavigate();
  let params = useParams();
  const role = localStorage.getItem("role");
  return (
    <>
      <div onClick={() => navigate(`/detail-product/${props.id}`)} className={role === "admin" ? "col-md-2 p-4 position-relative text-wrap content-productsadmin" : "col-md-2 col-lg-4 position-relative text-wrap content-product"}>
        <div className="p-4">
          <img className="product_image" src={props.image} alt="image_product" />
        </div>
        {/* <div className={ ["label-promo"]}>
          <p>{props.discount}</p>
        </div> */}
        <p className="titlezz mb-0 text-center col-12">{props.title}</p>
        <p className="price text-center col-12">{props.price}</p>
        {params?.id}
        <div>
          <img onClick={() => navigate(`/detail-product/${props.id}`)} className={role === "admin" ? "edited" : "none"} src={icon_edit} alt="/" />
        </div>
      </div>
    </>
  );
}

export default List_Product;
