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
import { setSelectionRange } from "@testing-library/user-event/dist/utils/index.js";

function Product() {
  TabTitle("Product | Coffee Gayoe");
  const dispatch = useDispatch();
  const [none, setNone] = useState(false);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("");
  const [notfound, setNotfound] = useState("");
  const [sorted, setSorted] = useState("");
  const [order, setOrder] = useState("false");
  const [search, setSearch] = useState("");
  const [navPromo, setNavPromo] = useState(false);
  const [navFav, setNavFav] = useState(true);
  const [navFood, setNavFood] = useState(false);
  const [navCoff, setNavCoff] = useState(false);
  const [navNonCoff, setNavNonCoff] = useState(false);
  const [navadd, setNavadd] = useState(false);
  const [category, setCategory] = useState("favorite");
  const [sort, setSort] = useState("name");
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [type, setType] = useState("");
  const [meta, setMeta] = useState({});

  const [searchParams, setSearchParams] = useSearchParams({ category: category, sort: "name", page: page, limit: 4 });
  const params = useParams();
  const navigate = useNavigate();

  const paramsCategory = searchParams.get("category") || "";
  const paramsName = searchParams.get("name") || "";
  const paramsSort = searchParams.get("sort") || "name";
  const paramsOrder = searchParams.get("order") || "asc";
  const paramsPage = searchParams.get("page" || "1");

  const role = localStorage.getItem("role");

  function handleNext() {
    navigate(`/product?sort=${paramsSort}&order=${paramsOrder}&page=${meta.currentPage + 1}`);
  }

  const getAllproducts = (category, search, sort, order, page) => {
    setLoading(true);
    getFixProducts(category, search, sort, order, page)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
        setMeta(res.data);
        // setPrev(res.data.meta.prev);
        setNext(res.data.meta.next);
        setTotalPage(res.data.meta.totalPage);
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
    getAllproducts(paramsCategory, paramsName, paramsSort, paramsOrder, paramsPage);

    // setCategory(category);
    // console.log(meta);
  }, [searchParams, paramsCategory, paramsName, paramsOrder, paramsSort, paramsPage]);
  useEffect(() => {
    // getFavoriteProducts();
    setLoading(false);
    setShow(true);
    setNavFav(false);
    setNavCoff(true);
    setNavNonCoff(true);
    setNavFood(true);
    setNavadd(true);
    setPage(page);
    setCategory(category);
  }, [page, category]);

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const nav1 = () => {
    setNavFav(false);
    setNavCoff(true);
    setNavNonCoff(true);
    setNavFood(true);
    setNavadd(true);
    setPage(1);
    setCategory("favorite");
    setSort("name");
  };
  const nav2 = () => {
    setNavFav(true);
    setNavCoff(false);
    setNavNonCoff(true);
    setNavFood(true);
    setNavadd(true);
    setPage(1);
    setCategory("coffee");
    setSort(sort);
  };
  const nav3 = () => {
    setNavFav(true);
    setNavCoff(true);
    setNavNonCoff(false);
    setNavFood(true);
    setNavadd(true);
    setPage(1);
    setCategory("non-coffee");
    setSort(sort);
  };
  const nav4 = () => {
    setNavFav(true);
    setNavCoff(true);
    setNavNonCoff(true);
    setNavFood(false);
    setNavadd(true);
    setPage(1);
    setCategory("food");
    setSort(sort);
  };
  const nav5 = () => {
    setNavFav(true);
    setNavCoff(true);
    setNavNonCoff(true);
    setNavFood(true);
    setNavadd(false);
    setPage(1);
    setCategory("add-on");
    setSort(sort);
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
              className={category === "favorite" ? `${styles["cursor"]} ${styles["border"]}` : `${styles["cursor"]} ${styles["nonborder "]}`}
              onClick={() => {
                setCategory("favorite");
                setSearchParams({ category: "favorite", sort: `${sort}`, page: `${page}`, limit: 4 });
                nav1();
                setPage(1);
              }}
            >
              Favorite & Promo
            </span>
            <span
              className={category === "coffee" ? `${styles["cursor"]} ${styles["border"]}` : `${styles["cursor"]} ${styles["nonborder "]}`}
              onClick={() => {
                setCategory("coffee");
                setSearchParams({ category: "coffee", sort: `${sort}`, page: `${page}`, limit: 4 });
                nav2();
                setPage(1);
              }}
            >
              Coffee
            </span>
            <span
              className={category === "non-coffee" ? `${styles["cursor"]} ${styles["border"]}` : `${styles["cursor"]} ${styles["nonborder "]}`}
              onClick={() => {
                setCategory("non-coffee");
                setSearchParams({ category: "non-coffee", sort: `${sort}`, page: `${page}`, limit: 4 });
                nav3();
                setPage(1);
              }}
            >
              Non Coffee
            </span>
            <span
              className={category === "food" ? `${styles["cursor"]} ${styles["border"]}` : `${styles["cursor"]}  ${styles["nonborder "]}`}
              onClick={() => {
                setCategory("food");
                setSearchParams({ category: "food", sort: `${sort}`, page: `${page}`, limit: 4 });
                nav4();
                setPage(1);
              }}
            >
              Foods
            </span>
            <span
              className={category === "add-on" ? `${styles["cursor"]} ${styles["border"]}` : `${styles["cursor"]} ${styles["nonborder "]}`}
              onClick={() => {
                setCategory("add-on");
                setSearchParams({ category: "add-on", sort: `${sort}`, page: `${page}`, limit: 4 });
                nav5();
                setPage(1);
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
                  setSort(e.target.value);
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
                setSort("name");
              }}
            >
              Name
            </option>
            <option
              className={styles["font-opt"]}
              value="cheapest"
              onSelect={() => {
                setSearchParams("cheapest");
                setSort("cheapest");
              }}
            >
              Cheapest
            </option>
            <option
              className={styles["font-opt"]}
              value="expensive"
              onSelect={() => {
                setSearchParams("pricy");
                setSort("pricy");
              }}
            >
              Pricy
            </option>
            <option
              className={styles["font-opt"]}
              value="newest"
              onSelect={() => {
                setSearchParams("new-product");
                setSort("newest");
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
                  <button
                    className={page === 1 ? styles["btn-pagenull"] : styles["btn-page"]}
                    onClick={() => {
                      // none(true);
                      setCategory(category);
                      axios
                        .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=${page - 1}&limit=4`)
                        .then((res) => {
                          setProduct(res.data.data);
                          setLoading(false);
                          setPage(page < 1 ? 1 : page - 1);
                          setSearchParams({ category: `${category}`, sort: `${sort}`, page: `${page - 1}`, limit: 4 });
                          setCategory(category);
                          setSort(sort);
                        })
                        .catch((err) => console.log(err));
                      window.scrollTo({
                        top: 100,
                        left: 100,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Prev
                  </button>
                  <p className={styles["text-page"]}>
                    {" "}
                    Page {page} of {totalPage}
                  </p>
                  <button
                    className={next === null ? styles["btn-pagenull"] : styles["btn-page"]}
                    onClick={
                      // navigate(`/product?sort=${paramsSort}&order=${paramsOrder}&page=${meta.currentPage + 1}`)
                      // console.log(next)

                      () => {
                        setCategory(category);
                        axios
                          .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=${page + 1}&limit=4`)
                          .then((res) => {
                            setProduct(res.data.data);
                            setLoading(false);
                            setPage(page + 1);
                            setSearchParams({ category: `${category}`, sort: `${sort}`, page: `${page + 1}`, limit: 4 });
                            setSort(sort);
                            setCategory(category);
                          })
                          .catch((err) => console.log(err));
                        window.scrollTo({
                          top: 100,
                          left: 100,
                          behavior: "smooth",
                        });
                      }
                    }
                  >
                    Next
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {loading ? (
              ""
            ) : (
              <div className={role === "admin" ? `d-flex justify-content-center ${styles.contbutton}` : `${styles.none}`}>
                <button className={`${styles.addproduct}`}> Add New Product</button>
              </div>
            )}
            {loading ? (
              ""
            ) : (
              <div className={role === "admin" ? `d-flex justify-content-center ${styles.contbutton2}` : `${styles.none}`}>
                <button className={`${styles.addproduct}`}> Add New Promo</button>
              </div>
            )}
          </section>
        </aside>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Product;
