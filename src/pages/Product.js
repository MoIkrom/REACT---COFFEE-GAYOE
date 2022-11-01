import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// import css
import styles from "../styles/Product.module.css";

// import navbar dan footer
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import CardProduct from "../Component/List_Product";

// import image

import tomato from "../assets/images/tomato.png";
import wings from "../assets/images/Chicken-Wings.png";
import hezelnut from "../assets/images/Hezelnut.png";
import fire from "../assets/images/Chicken-Wings.png";
import beef from "../assets/images/beef-spagheti.png";

class Product extends Component {
  state = {
    products: [],
    url: `http://localhost:8080/api/v1/product`,
    food: `http://localhost:5000/api/product/?category=foods`,
    coffee: `http://localhost:5000/api/product/?category=coffee`,
    non_coffee: `http://localhost:5000/api/product/?category=non_coffee`,
    addons: `http://localhost:5000/api/product/?category=add-on`,
  };
  componentDidMount() {
    axios
      .get(this.state.url)
      .then((res) => {
        // this.setState({ products: res.result });
        console.log(res.data.result);
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <>
        {/* <!-- Start Navbar --> */}
        <main classNameName="container-fluid bg-white">
          <Navbar />
        </main>
        {/* <!-- End Navbar --> */}

        <hr></hr>
        <section className="container-fluid d-flex flex-row flex-wrap">
          <aside className={`${styles["product-left"]} d-flex flex-column align-items-center mb-5`}>
            <span className={`${styles["title-promo"]} text-center mt-4`}>Promo Today</span>
            <span className={`${styles["desc-promo"]} text-center mt-3 px-5`}>Coupons will be updated every weeks. Check them out!</span>
            <div className={`container ${styles["cont-promos"]}`}>
              <div className={`container ${styles["coupon-card"]}`}>
                <img className={styles["beef"]} src={beef} alt="coupon" />
                <p className={styles["card-text-1"]}>
                  Beef Spaghetti
                  <br />
                  20%OFF
                </p>
                <p className={styles["off"]}>Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</p>

                <p>-----------------------------------</p>
                <p className={styles["code-coupon"]}>COUPON CODE</p>
                <p className={styles["code-text-1"]}>FNPR15RG</p>
                <p className={styles["code-text-2"]}>Valid untill October 10th 2020</p>
              </div>
            </div>

            <button className={`${styles["apply-coupon"]} mt-5 rounded-5`}>Apply Coupon</button>
            <div className={`${styles["noted"]} d-flex flex-column my-5`}>
              <span className="py-3">Terms and Condition</span>
              <p>1. You can only apply 1 coupon per day</p>
              <p>2. It only for dine in</p>
              <p>3. Buy 1 get 1 only for new user</p>
              <p>4. Should make member card to apply coupon</p>
            </div>
          </aside>

          <aside className={`${styles["product-right"]} d-flex flex-column py-4`}>
            <div className={`${styles["nav-product"]} d-flex flex-row justify-content-around`}>
              <span>
                <Link to="">Favorite & Promo</Link>
              </span>
              <span>
                <Link to="">Coffee</Link>
              </span>
              <span>
                <Link to="">Non Coffee</Link>
              </span>
              <span>
                <Link to="">Foods</Link>
              </span>
              <span>
                <Link to="">Add-on</Link>
              </span>
            </div>

            <section className="container-fluid text-center ps-5 ms-4">
              <div className={`row ${styles["list-content"]} justify-content-start ${styles["gap-Row"]} ${styles["position-settings"]}`}>
                <CardProduct title="Veggie tomato mix" price="IDR 34000" discount="10%" image={tomato} />
                <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} />
                <CardProduct title="Veggie tomato mix" price="IDR 34000" discount="10%" image={tomato} />
                <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} />
                <CardProduct title="Veggie tomato mix" price="IDR 34000" discount="10%" image={tomato} />
                <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} />
              </div>
            </section>
          </aside>
        </section>

        <Footer />
      </>
    );
  }
}

export default Product;
