import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import css
import "../styles/ListProduct.css";

import icon_edit from "../assets/images/icon_editpencil.png";
import icon_cart from "../assets/images/cart.png";

function List_Product(props) {
  const navigate = useNavigate();

  let params = useParams();
  const role = localStorage.getItem("role");

  return (
    <>
      <div
        // onClick={() => navigate(`/detail-product/${props.id}`)}
        className={
          role === "admin"
            ? "col-md-2 p-4 position-relative text-wrap content-productsadmin"
            : "col-md-2 col-lg-6 m-2 position-relative text-wrap content-product"
        }
      >
        <div className="p-4">
          <img
            className="product_image"
            src={props.image}
            alt="image_product"
          />
        </div>
        <p className="titlezz mb-0 text-center col-12">{props.title}</p>
        <div className="d-flex gap-2 justify-content-between align-items-center mb-3">
          <p
            className="price text-center m-0 text-black" 
          >
            {props.price}
          </p>
          <button
            onClick={props.cart}
            className="border-0 btn rounded"
            style={{
              backgroundColor: "#ffcb65",
              color: "black",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            <img
              src={icon_cart}
              alt="image_cart"
              style={{ height: "12px", width: "12px" }}
            />
          </button>
        </div>
        {params?.id}
        <div>
          <img
            onClick={() => navigate(`/detail-product/${props.id}`)}
            className={role === "admin" ? "edited" : "none"}
            src={icon_edit}
            alt="/"
          />
        </div>
      </div>
    </>
  );
}

export default List_Product;
