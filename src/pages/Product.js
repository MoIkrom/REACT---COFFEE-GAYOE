/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { TabTitle } from "../utils/General-funct.js";
import { useDispatch } from "react-redux";
import { getFixProducts, getFavoriteHome } from "../utils/services/product";
// import css
import styles from "../styles/Product.module.css";

// import navbar dan footer
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import CardProduct from "../Component/List_Product";

// import image
import beef from "../assets/images/beef-spagheti.png";

function Product() {
  TabTitle("Product | Coffee Gayoe");

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [navFav, setNavFav] = useState(false);
  const [navPromo, setNavPromo] = useState(true);
  const [navFood, setFood] = useState(true);
  const [navCoff, setNavCoff] = useState(true);
  const [navNonCoff, setNavNonCoff] = useState(true);
  const [navadd, setNavadd] = useState(true);
  const [category, setCategory] = useState("favorite");
  const [sort, setSort] = useState("false");
  const [sorted, setSorted] = useState("");
  const [order, setOrder] = useState("false");
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [notfound, setNotfound] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [meta, setMeta] = useState({});

  const [searchParams, setSearchParams] = useSearchParams({ category: category, sort: "name", page: page, limit: 4 });
  const params = useParams();
  const navigate = useNavigate();

  const paramsCategory = searchParams.get("category") || "";
  const paramsName = searchParams.get("name") || "";
  const paramsSort = searchParams.get("sort") || "name";
  const paramsOrder = searchParams.get("order") || "asc";
  const paramsPage = searchParams.get("page") || "1";

  const getAllproducts = (category, search, sort, order, page) => {
    setLoading(true);
    getFixProducts(category, search, sort, order, page)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
        setMeta(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFavoriteProducts = () => {
    setLoading(false);
    getFavoriteHome()
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toDetailProduct = () => {
    navigate("/detail-product");
    console.log("masuk coy");
  };

  useEffect(() => {
    getFavoriteProducts();
    setLoading(false);
    setShow(true);
  }, []);
  useEffect(() => {
    getAllproducts(paramsCategory, paramsName, paramsSort, paramsOrder, paramsPage);
  }, [searchParams, paramsCategory, paramsName, paramsOrder, paramsSort, paramsPage]);

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <>
      <div className={`${styles["navs"]}`}>
        <Navbar />
      </div>

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
                setCategory("favorite");
                setSearchParams({ category: "favorite" });
              }}
            >
              Favorite & Promo
            </span>
            <span
              className={`${styles["cursor"]}`}
              onClick={() => {
                setCategory("coffee");
                setSearchParams({ category: "coffee" });
              }}
            >
              Coffee
            </span>
            <span
              className={`${styles["cursor"]}`}
              onClick={() => {
                setCategory("non-coffee");
                setSearchParams({ category: "non-coffee" });
              }}
            >
              Non Coffee
            </span>
            <span
              className={`${styles["cursor"]}`}
              onClick={() => {
                setCategory("food");

                setSearchParams({ category: "food" });
              }}
            >
              Foods
            </span>
            <span
              className={`${styles["cursor"]}`}
              onClick={() => {
                setCategory("add-on");
                setSearchParams({ category: "add-on" });
              }}
            >
              Add-on
            </span>
          </div>
          <Form.Select
            className={styles["form-select"]}
            aria-label="Default select example"
            as="select"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              axios
                .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${e.target.value}&page=${page}&limit=4`)
                .then((res) => {
                  setProduct(res.data.data);
                  setLoading(false);
                  setSearchParams({ category: category, sort: e.target.value, page: page, limit: 4 });

                  // console.log(res);
                  console.log(page);
                })
                .catch((err) => console.log(err));
              console.log("e.target.value : ", e.target.value);
            }}
          >
            <option className={styles["font-opt"]}> Sort by </option>
            <option
              className={styles["font-opt"]}
              value="name"
              onSelect={() => {
                setSearchParams("name");
              }}
            >
              Name
            </option>
            <option
              className={styles["font-opt"]}
              value="cheapest"
              onSelect={() => {
                setSearchParams("cheapest");
              }}
            >
              Cheapest
            </option>
            <option
              className={styles["font-opt"]}
              value="expensive"
              onSelect={() => {
                setSearchParams("pricy");
              }}
            >
              Pricy
            </option>
            <option
              className={styles["font-opt"]}
              value="newest"
              onSelect={() => {
                setSearchParams("new-product");
              }}
            >
              New Product
            </option>
          </Form.Select>

          <section className="container-fluid text-center ps-5 ms-4">
            <div className={`row ${styles["list-content"]} justify-content-start ${styles["gap-Row"]} ${styles["position-settings"]}`}>
              {loading ? (
                <>
                  <div className={styles["lds-ring"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <p className={styles["loading-text"]}>Loading</p>
                </>
              ) : product.length > 0 ? (
                product.map((products) => {
                  return <CardProduct id={products.id} title={products.product_name} price={`${"Rp"} ${costing(products.price)}`} image={products.image} discount="10%" />;
                })
              ) : (
                // "Product Not Found"
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

              {loading ? (
                " "
              ) : product.length > 0 ? (
                <div className={`${styles["container"]} , ${styles["page"]}`}>
                  <button className={styles["btn-page"]}> prev</button>
                  <p className={styles["text-page"]}> Page 1 of 1</p>
                  <button className={styles["btn-page"]}> next</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
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

export default Product;
