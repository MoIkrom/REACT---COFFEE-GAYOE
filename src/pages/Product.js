import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import withNavigate from "../utils/withNavigate";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import withParams from "../utils/withRouteParams";
import withSearchParams from "../utils/withSearchParams";

// import css
import styles from "../styles/Product.module.css";

// import navbar dan footer
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import CardProduct from "../Component/List_Product";

// import image

// import tomato from "../assets/images/tomato.png";
// import wings from "../assets/images/Chicken-Wings.png";
// import hezelnut from "../assets/images/Hezelnut.png";
// import fire from "../assets/images/Chicken-Wings.png";
import beef from "../assets/images/beef-spagheti.png";

class Product extends Component {
  state = {
    products: [],
    favorite: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?sort=favorite&sort=name&page=1&limit=4`,
    food: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?category=food&sort=name&page=1&limit=4`,

    coffee: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?category=Coffee&sort=name&page=1&limit=4`,
    non_coffee: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?category=Non Coffee&sort=name&page=1&limit=4`,
    addons: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?category=Add On&sort=name&page=1&limit=4`,
    sort: `${process.env.REACT_APP_BACKEND_HOST}api/v1/product?sort=name&page=1&limit=4`,
    searchParams: {},
  };

  costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  componentDidMount() {
    axios
      .get(this.state.favorite)
      .then((res) => {
        // console.log(res.data.data);
        this.setState({
          products: res.data.data,
        });
      })
      .catch((err) => console.log(err));
  }
  onFavorite = () => {
    axios
      .get(this.state.favorite)
      .then((res) => this.setState({ products: res.data.result.data }))
      .catch((err) => console.log(err));
  };

  onCoffee = () => {
    axios
      .get(this.state.coffee)
      .then((res) => this.setState({ products: res.data.data }))
      .catch((err) => console.log(err));
  };
  onfood = () => {
    axios
      .get(this.state.food)
      .then((res) => this.setState({ products: res.data.data }))
      .catch((err) => console.log(err));
  };
  onNonCoffee = () => {
    axios
      .get(this.state.non_coffee)
      .then((res) => this.setState({ products: res.data.data }))
      .catch((err) => console.log(err));
  };
  onAddOns = () => {
    axios
      .get(this.state.addons)
      .then((res) => this.setState({ products: res.data.data }))
      .catch((err) => console.log(err));
  };

  onSort = () => {
    axios
      .get(this.state.sort)
      .then((res) => this.setState({ products: res.data.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {/* <!-- Start Navbar --> */}
        <main className="container">
          <Navbar />
        </main>
        {/* <!-- End Navbar --> */}

        <hr></hr>
        <section className="container d-flex flex-row flex-wrap">
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
              <span
                className={`${styles["cursor"]}`}
                onClick={() => {
                  this.onFavorite();
                  this.setState(
                    {
                      searchParams: { sort: "favorite" },
                    },

                    () => {
                      this.props.setSearchParams(this.state.searchParams);
                    }
                  );
                }}
              >
                Favorite & Promo
              </span>
              <span
                className={`${styles["cursor"]}`}
                onClick={() => {
                  this.onCoffee();
                  this.setState(
                    {
                      searchParams: { sort: "coffee" },
                    },

                    () => {
                      this.props.setSearchParams(this.state.searchParams);
                    }
                  );
                }}
              >
                Coffee
              </span>
              <span
                className={`${styles["cursor"]}`}
                onClick={() => {
                  this.onNonCoffee();
                  this.setState(
                    {
                      searchParams: { sort: "non-coffee" },
                    },

                    () => {
                      this.props.setSearchParams(this.state.searchParams);
                    }
                  );
                }}
              >
                Non Coffee
              </span>
              <span
                className={`${styles["cursor"]}`}
                onClick={() => {
                  this.onfood();
                  this.setState(
                    {
                      searchParams: { sort: "food" },
                    },

                    () => {
                      this.props.setSearchParams(this.state.searchParams);
                    }
                  );
                }}
              >
                Foods
              </span>
              <span
                className={`${styles["cursor"]}`}
                onClick={() => {
                  this.onAddOns();
                  this.setState(
                    {
                      searchParams: { sort: "add-ons" },
                    },

                    () => {
                      this.props.setSearchParams(this.state.searchParams);
                    }
                  );
                }}
              >
                Add-on
              </span>
            </div>
            <Form.Select className={styles["form-select"]} aria-label="Default select example">
              <option className={styles["font-opt"]}> Sort by </option>
              <option className={styles["font-opt"]} value="1">
                Name
              </option>
              <option className={styles["font-opt"]} value="2">
                Cheapest
              </option>
              <option className={styles["font-opt"]} value="3">
                Pricy
              </option>
              <option className={styles["font-opt"]} value="4">
                New Product
              </option>
            </Form.Select>

            <section className="container-fluid text-center ps-5 ms-4">
              <div className={`row ${styles["list-content"]} justify-content-start ${styles["gap-Row"]} ${styles["position-settings"]}`}>
                {this.state.products.length > 0 ? (
                  this.state.products.map((products) => {
                    return <CardProduct title={products.product_name} price={`${"IDR"} ${this.costing(products.price)}`} image={products.image} discount="10%" />;
                  })
                ) : (
                  <>
                    <div className={styles["lds-ring"]}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <p className={styles["loading-text"]}>Loading</p>
                  </>
                )}

                {/* <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} />
                <CardProduct title="Veggie tomato mix" price="IDR 34000" discount="10%" image={tomato} />
                <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} />
                <CardProduct title="Veggie tomato mix" price="IDR 34000" discount="10%" image={tomato} />
                <CardProduct title="Chicken EIngs" price="IDR 24000" discount="10%" image={wings} />
                <CardProduct title="Ice Cream Hezelnut" price="IDR 30000" discount="15%" image={hezelnut} />
                <CardProduct title="Fire Chicken" price="IDR 25000" discount="10%" image={fire} /> */}
              </div>
            </section>
            <div className={`${styles["container"]} , ${styles["page"]}`}>
              <button className={styles["btn-page"]}> prev</button>
              <p className={styles["text-page"]}> Page 1 of 1</p>
              <button className={styles["btn-page"]}> next</button>
            </div>
          </aside>
        </section>
        {/* <section className=" text-center row d-flex justify-content-between flex-wrap">
          <div className={` ${styles["list-content"]} d-flex flex-wrap col-12`}>
            {this.state.products.map((products) => (
              <CardProduct title={products.product_name} price={products.price} image={products.image} />
              // <CardProduct title={products.product_name} price={products.price} image={products.image} size={products.size} />
            ))}
          </div>
        </section> */}
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

export default withSearchParams(withParams(Product));
