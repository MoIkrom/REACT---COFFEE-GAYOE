/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TabTitle } from "../utils/General-funct.js";
import { useDispatch } from "react-redux";
import { getFixProducts, getFavoriteHome } from "../utils/services/product";
import { debounce } from "../utils/debounce/debounce";
// import css
import "../styles/Product.css";

// import navbar dan footer
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import CardProduct from "../Component/List_Product";

// import image
import beef from "../assets/images/beef-spagheti.png";
import searching from "../assets/images/search2.png";

function Product() {
  TabTitle("Product | Coffee Gayoe");
  const dispatch = useDispatch();
  const [none, setNone] = useState(false);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("");
  const [notfound, setNotfound] = useState("");
  const [sorted, setSorted] = useState("");
  const [prev, setPrev] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [order, setOrder] = useState("false");
  const [navPromo, setNavPromo] = useState(false);
  const [navFav, setNavFav] = useState(true);
  const [navFood, setNavFood] = useState(false);
  const [navCoff, setNavCoff] = useState(false);
  const [navNonCoff, setNavNonCoff] = useState(false);
  const [navadd, setNavadd] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("coffee");
  const [sort, setSort] = useState("name");
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [next, setNext] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [type, setType] = useState("");
  const [meta, setMeta] = useState({});

  const [searchParams, setSearchParams] = useSearchParams({ category: category, search: search, sort: "name", page: page, limit: 8 });
  const params = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const updateChange = (e) => setSearch(e.target.value);
  const debounceOnChange = debounce(updateChange, 1000);

  const getAllproducts = (category, search, sort, order, page) => {
    setLoading(true);
    getFixProducts(category, search, sort, order, page)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
        setMeta(res.data);
        setSearch(search);
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
    // console.log("masuk coy");
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=${page}&limit=8&search=${search}`)
      .then((res) => {
        setProduct(res.data.data);
        setNotfound(search);
        setLoading(false);
        setTotalPage(res.data.meta.totalPage);
        // window.scrollTo({ top: 100, left: 100 });
      })
      .catch((err) => {
        setNotfound(err.response.data.msg);
        console.log(err.response.data.msg);
        setLoading(false);
      });
  }, [category, search, sort, page]);

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
    setSearch(search);
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
    setSearch(search);
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
    setSearch(search);
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
    setSearch(search);
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
    setSearch(search);
  };

  return (
    <>
      <div className="navs">
        <Navbar />
      </div>

      <hr></hr>
      <section className={role === "admin" ? "container d-flex flex-row flex-wrap " : "cont_main container d-flex flex-column flex-md-row flex-wrap mb-md-4"}>
        <aside className=" d-flex flex-column mb-5 col-md-4">
          <div className="d-flex flex-column justify-content-center align-items-center mb-5">
            <p className="title-promo mt-4">Promo Today</p>
            <p className="desc_promo m-0">Coupons will be updated every weeks</p>
            <p className="desc_promo m-0"> Check them out!</p>
          </div>

          <div className="d-flex flex-md-column justify-content-md-between">
            <div className="kupon d-flex flex-column align-items-center col-6 col-md-12">
              <div className=" container d-flex align-items-center card coupon_card">
                <div className="d-flex flex-column align-items-center mt-4 gap-2">
                  <img className="beef" src={beef} alt="coupon" />
                  <p className="card_text text-center">
                    Beef Spaghetti
                    <br />
                    20% OFF
                  </p>
                </div>

                <p className="text-center">Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</p>

                <p className="garis">---------------------------</p>
                <p>COUPON CODE</p>
                <p className="code-text-1">FNPR15RG</p>
                <p className="code-text-2">Valid until October 10th 2023</p>
              </div>

              <button className="apply-coupon col-6 mt-3 rounded-5 ">{role === "admin" ? "Edit Coupon" : "Apply Coupon"}</button>
            </div>

            <div className="noted d-flex justify-content-start mt-5 mt-md-0 pt-5 pt-md-0 px-3 gap-2  flex-column">
              <h3 className=" terms text-center text-md-start mb-2 mt-4">Terms and Condition</h3>
              <div>
                <div className="d-flex align-items-start gap-1 ">
                  <p className="mb-0">1.</p>
                  <p>You can only apply 1 coupon per day</p>
                </div>
                <div className="d-flex align-items-start gap-1 ">
                  <p className="mb-0">2.</p>
                  <p>It only for dine in</p>
                </div>
                <div className="d-flex align-items-start gap-1 ">
                  <p className="mb-0">3.</p>
                  <p>Buy 1 get 1 only for new user</p>
                </div>
                <div className="d-flex align-items-start gap-1 ">
                  <p className="mb-0">4.</p>
                  <p>Should make member card to apply coupon</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <hr></hr>
        <hr></hr>
        <hr className="mb-5"></hr>
        <aside className="container product-right d-flex flex-column py-4 col-md-8">
          <div className="nav-product   d-flex flex-row justify-content-around">
            <span
              className={category === "favorite" ? "cursor" : "cursor nonborder "}
              onClick={(e) => {
                setCategory("favorite");
                setSearchParams({ category: "favorite", search: `${search}`, sort: `${sort}`, page: `${page}`, limit: 8 });
                nav1();
                setPage(1);
              }}
            >
              Favorite & Promo
            </span>
            <span
              className={category === "coffee" ? "cursor" : "cursor nonborder "}
              onClick={(e) => {
                setCategory("coffee");
                setSearchParams({ category: "coffee", search: `${search}`, sort: `${sort}`, page: `${page}`, limit: 8 });
                nav2();
                setPage(1);
              }}
            >
              Coffee
            </span>
            <span
              className={category === "non-coffee" ? "cursor" : "cursor nonborder "}
              onClick={(e) => {
                setCategory("non-coffee");
                setSearchParams({ category: "non-coffee", search: `${search}`, sort: `${sort}`, page: `${page}`, limit: 8 });
                nav3();
                setPage(1);
              }}
            >
              Non Coffee
            </span>
            <span
              className={category === "food" ? "cursor" : "cursor nonborder "}
              onClick={(e) => {
                setCategory("food");
                setSearchParams({ category: "food", search: `${search}`, sort: `${sort}`, page: `${page}`, limit: 8 });
                nav4();
                setPage(1);
              }}
            >
              Foods
            </span>
            <span
              className={category === "add-on" ? "cursor" : "cursor nonborder "}
              onClick={(e) => {
                setCategory("add-on");
                setSearchParams({ category: "add-on", search: `${search}`, sort: `${sort}`, page: `${page}`, limit: 8 });
                nav5();
                setPage(1);
              }}
            >
              Add-on
            </span>
          </div>

          <div className="contsearch">
            <Form.Select
              className="form-select"
              aria-label="Default select example"
              as="select"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                axios
                  .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&search=${search}&sort=${e.target.value}&page=${page}&limit=8`)
                  .then((res) => {
                    setProduct(res.data.data);
                    setLoading(false);
                    setSearchParams({ category: category, search: search, sort: e.target.value, page: page, limit: 8 });
                    setSort(e.target.value);
                    // console.log(res);
                    console.log(page);
                    // window.scrollTo({
                    //   top: 100,
                    //   left: 100,
                    //   behavior: "smooth",
                    // });
                  })
                  .catch((err) => console.log(err));
                console.log("e.target.value : ", e.target.value);
              }}
            >
              <option className="font-opt"> Sort by </option>
              <option
                className="font-opt"
                value="name"
                onSelect={() => {
                  setSearchParams("name");
                  setSort("name");
                }}
              >
                Name
              </option>
              <option
                className="font-opt"
                value="cheapest"
                onSelect={() => {
                  setSearchParams("cheapest");
                  setSort("cheapest");
                }}
              >
                Cheapest
              </option>
              <option
                className="font-opt"
                value="expensive"
                onSelect={() => {
                  setSearchParams("pricy");
                  setSort("pricy");
                }}
              >
                Pricy
              </option>
              <option
                className="font-opt"
                value="newest"
                onSelect={() => {
                  setSearchParams("new-product");
                  setSort("newest");
                }}
              >
                New Product
              </option>
            </Form.Select>
            <InputGroup className="mb-0 inputsearch" onChange={debounceOnChange}>
              <Form.Control className="tx_search" placeholder="Search Product" aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <Button className="searching" variant="outline-secondary" id="button-addon2">
                <img className="searching_img" src={searching} alt="/" />
              </Button>
            </InputGroup>
          </div>
          <section className="container-fluid text-center">
            <div className="row list-content    justify-content-around mt-3 gap-3 px-lg-5">
              {notfound === "Internal server Error" ? (
                <p className="notfound-text">Product Not Found</p>
              ) : loading ? (
                <div className="d-flex mt-5 pt-5  justify-content-center align-items-center flex-column">
                  <div className="lds_ring_product">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  {/* <div className="loading_text">Loading</div> */}
                </div>
              ) : product.length > 0 ? (
                product.map((products) => {
                  return <CardProduct id={products.id} title={products.product_name} price={`${"Rp"} ${costing(products.price)}`} image={products.image} discount="10%" />;
                })
              ) : (
                // "Product Not Found"
                <>
                  <div className="lds_ring_product">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <p className="loading-text">Loading</p>
                </>
              )}

              {notfound === "Internal server Error" ? (
                () => {
                  setPage(1);
                }
              ) : loading ? (
                " "
              ) : product.length > 0 ? (
                <div className="pages container d-flex flex-row align-items-center justify-content-between ">
                  <button
                    className={page === 1 ? "btn-pagenull" : "btn-page"}
                    onClick={() => {
                      setCategory(category);
                      axios
                        .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=${page - 1}&limit=8`)
                        .then((res) => {
                          setProduct(res.data.data);
                          setLoading(false);
                          setPage(page < 1 ? 1 : page - 1);
                          setSearchParams({ category: `${category}`, sort: `${sort}`, page: `${page - 1}`, limit: 4 });
                          setCategory(category);
                          setSort(sort);
                        })
                        .catch((err) => console.log(err));
                      // window.scrollTo({
                      //   top: 100,
                      //   left: 100,
                      //   behavior: "smooth",
                      // });
                    }}
                  >
                    Prev
                  </button>
                  <p className="text-page">
                    Page {page} of {totalPage}
                  </p>
                  <button
                    className={next === null || page === totalPage ? "btn-pagenull" : "btn-page"}
                    onClick={() => {
                      console.log("masuk");
                      setCategory(category);
                      axios
                        .get(`https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=${page + 1}&limit=8`)
                        .then((res) => {
                          setProduct(res.data.data);
                          setLoading(false);
                          setPage(page + 1);
                          setSearchParams({ category: `${category}`, sort: `${sort}`, page: `${page + 1}`, limit: 4 });
                          setSort(sort);
                          setCategory(category);
                        })
                        .catch((err) => console.log(err));
                      // window.scrollTo({
                      //   top: 100,
                      //   left: 100,
                      //   behavior: "smooth",
                      // });
                    }}
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
            ) : notfound === "Internal server Error" ? (
              ""
            ) : (
              <div className={role === "admin" ? "d-flex justify-content-center contbutton " : "none"}>
                <button
                  className="addproduct"
                  onClick={() => {
                    navigate("/new-product");
                    window.scrollTo({
                      top: 100,
                      left: 100,
                      behavior: "smooth",
                    });
                  }}
                >
                  {" "}
                  Add New Product
                </button>
              </div>
            )}
            {loading ? (
              ""
            ) : notfound === "Internal server Error" ? (
              ""
            ) : (
              <div className={role === "admin" ? "d-flex justify-content-center contbutton2" : "none"}>
                <button
                  className="addproduct"
                  onClick={() => {
                    navigate("/new-promo");
                    window.scrollTo({
                      top: 100,
                      left: 100,
                      behavior: "smooth",
                    });
                  }}
                >
                  {" "}
                  Add New Promo
                </button>
              </div>
            )}
          </section>
        </aside>
      </section>

      <Footer />
    </>
  );
}

export default Product;
