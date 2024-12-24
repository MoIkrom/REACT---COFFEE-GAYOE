import React from "react";
// import css
import "../styles/Card.css";

function Card({ date, detailhistory, total }) {
  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const dayName = new Intl.DateTimeFormat("en-EN", {
      weekday: "long",
    }).format(date);
    const formattedDate = date.toLocaleDateString("en-EN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${dayName} - ${formattedDate}`;
  };
  return (
    <>
      <div className="d-flex flex-column gap-3 col-12 mb-5">
        <div className="card rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div className=" pt-4 pb-2 ps-3">
              <h5
                className="text-decoration-underline text-success text-mobile"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                {formatDate(date)}
              </h5>
            </div>
            <div className="pe-4 pt-2 text-mobile">
              <p
                className="m-0 text-success"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                TOTAL : {`Rp ${costing(total)}`}
              </p>
              <p
                className="text-danger m-0 "
                style={{
                  fontFamily: "Rubik",
                  fontSize: "10px",
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                *include TAX 10%
              </p>
            </div>
          </div>

          <hr></hr>
          {detailhistory.transaction_items.length > 0
            ? detailhistory.transaction_items.map((e) => (
                <div className="item-content d-flex ps-3 py-3 gap-3 align-items-center border-bottom mx-2">
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    className="col-4"
                    src={`${process.env.REACT_APP_BACKEND_HOST}/${e.products.image}`}
                    alt="Product_Image"
                  />
                  <div className="text-mobile">
                    <p
                      className="m-0 "
                      style={{
                        fontFamily: "Poppins",
                      }}
                    >
                      {e.products.product_name}
                    </p>
                    <p
                      className="m-0 text-mobile"
                      style={{
                        fontFamily: "Rubik",
                      }}
                    >
                      Rp {costing(e.products.price)}
                    </p>
                    <p
                      className="m-0"
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "12px",
                      }}
                    >
                      {e.quantity} items
                    </p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default Card;
