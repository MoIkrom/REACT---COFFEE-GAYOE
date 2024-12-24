import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { addItemToCart } from "../features/cart/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TabTitle } from "../utils/General-funct.js";
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
  const [notfound, setNotfound] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("product_name");
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState("");
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({
    page: page,
    limit: 8,
    category: category,
    sortField: sortField,
    search: search,
    sortOrder: "asc",
  });
  const params = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const updateChange = (e) => {
    setSearch(e.target.value);
    setSearchParams({
      category: category,
      search: e.target.value,
      sortField: sortField,
      page: page,
      limit: 8,
    });
  };

  const debounceOnChange = debounce(updateChange, 1000);
  const Host = process.env.REACT_APP_BACKEND_HOST;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${Host}/api/v1/product?page=${page}&limit=8&category=${category}&sortField=${sortField}&search=${search}&sortOrder=${sortOrder}`
      )
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
        setPagination(res.data.pagination);
        setCurrentPage(res.data.pagination.page);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [Host, category, search, page, sortField, sortOrder]);

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  const handleCart = (products) => {
    const item = { ...products, quantity: 1 };
    dispatch(addItemToCart(item));
    console.log(item);
    toast.success("Success Add to Cart", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <>
      <Navbar />
      <hr></hr>
      <section
        className={
          role === "admin"
            ? "container d-flex flex-row flex-wrap "
            : "cont_main container d-flex flex-column flex-md-row flex-wrap mb-md-4"
        }
      >
        <aside className=" d-flex flex-column mb-5 col-md-3">
          <div className="d-flex flex-column justify-content-center align-items-center mb-4 mb-lg-5">
            <p className="title-promo mt-4">Promo Today</p>
            <p className="desc_promo m-0">
              Coupons will be updated every weeks
            </p>
            <p className="desc_promo m-0"> Check them out!</p>
          </div>

          <div className="d-flex flex-md-column justify-content-md-between">
            <div className="kupon d-flex flex-column align-items-center col-md-12">
              <div className=" container d-flex align-items-center card coupon_card">
                <div className="d-flex flex-column align-items-center mt-4 gap-2">
                  <img className="beef" src={beef} alt="coupon" />
                  <p className="card_text text-center">
                    Beef Spaghetti
                    <br />
                    20% OFF
                  </p>
                </div>

                <p className="text-center">
                  Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
                </p>

                <p className="garis">---------------------------</p>
                <p>COUPON CODE</p>
                <p className="code-text-1">FNPR15RG</p>
                <p className="code-text-2">Valid until October 10th 2023</p>
              </div>

              <button className="apply-coupon col-6 mt-3 rounded-5 ">
                {role === "admin" ? "Edit Coupon" : "Apply Coupon"}
              </button>
            </div>

            <div className="noted d-flex justify-content-start mt-5 mt-md-0 pt-5 pt-md-0 px-3 gap-2  flex-column">
              <h3 className=" terms text-center text-md-start mb-2 mt-4">
                Terms and Condition
              </h3>
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
        <aside className="container product-right d-flex flex-column py-4 col-md-8">
          <div className="nav-product d-flex flex-row justify-content-around">
            <span
              className={
                category === ""
                  ? "cursor border-bottom border-2 border-warning"
                  : "cursor nonborder "
              }
              onClick={(e) => {
                setCategory("");
                setSearchParams({
                  category: "",
                  search: `${search}`,
                  sortField: `${sortField}`,
                  page: `${page}`,
                  limit: 8,
                });
                setPage(1);
              }}
            >
              All menu
            </span>
            <span
              className={
                category === "Food"
                  ? "cursor border-bottom border-2 border-warning"
                  : "cursor nonborder "
              }
              onClick={(e) => {
                setCategory("Food");
                setSearchParams({
                  category: "Food",
                  search: `${search}`,
                  sortField: `${sortField}`,
                  page: `${page}`,
                  limit: 8,
                });
                setPage(1);
              }}
            >
              Foods
            </span>
            <span
              className={
                category === "Drink"
                  ? "cursor border-bottom border-2 border-warning"
                  : "cursor nonborder "
              }
              onClick={(e) => {
                setCategory("Drink");
                setSearchParams({
                  category: "Drink",
                  search: `${search}`,
                  sortField: `${sortField}`,
                  page: `${page}`,
                  limit: 8,
                });
                setPage(1);
              }}
            >
              Drinks
            </span>
            <span
              className={
                category === "add-on"
                  ? "cursor border-bottom border-2 border-warning"
                  : "cursor nonborder "
              }
              onClick={(e) => {
                setCategory("add-on");
                setSearchParams({
                  category: "add-on",
                  search: `${search}`,
                  sortField: `${sortField}`,
                  page: `${page}`,
                  limit: 8,
                });
                setPage(1);
              }}
            >
              Add-on
            </span>
          </div>

          <div className="contsearch">
            <Form.Select
              className="form-select"
              aria-label="Sort by"
              value={type}
              onChange={(e) => {
                const selectedValue = e.target.value;

                // Set sortField dan sortOrder sesuai dengan nilai yang dipilih
                let newSortField = "";
                let newSortOrder = "";
                let newType = selectedValue;

                switch (selectedValue) {
                  case "product_name":
                    newSortField = "product_name";
                    newSortOrder = "asc";
                    break;
                  case "cheap":
                    newSortField = "price";
                    newSortOrder = "asc"; // Default descending order for "price"
                    break;
                  case "pricy":
                    newSortField = "price";
                    newSortOrder = "desc"; // Default descending order for "price"
                    break;
                  case "newest":
                    newSortField = "created_at";
                    newSortOrder = "desc";
                    break;
                  default:
                    break;
                }

                // Update state
                setType(newType);
                setSortField(newSortField);
                setSortOrder(newSortOrder);

                axios
                  .get(
                    `${Host}/api/v1/product?page=${page}&limit=8&category=${category}&sortField=${newSortField}&search=${search}&sortOrder=${newSortOrder}`
                  )
                  .then((res) => {
                    setProduct(res.data.data);
                    setLoading(false);
                    setSearchParams({
                      page: page,
                      limit: 8,
                      category: category,
                      sortField: newSortField,
                      search: search,
                      sortOrder: newSortOrder,
                    });
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <option className="font-opt" value="">
                Sort by
              </option>
              <option className="font-opt" value="product_name">
                Name
              </option>
              <option className="font-opt" value="cheap">
                Cheapest
              </option>
              <option className="font-opt" value="pricy">
                Pricy
              </option>
              <option className="font-opt" value="newest">
                New Product
              </option>
            </Form.Select>
            <InputGroup
              className="mb-0 inputsearch"
              onChange={debounceOnChange}
            >
              <Form.Control
                className="tx_search"
                placeholder="Search Product"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button
                className="searching"
                variant="outline-secondary"
                id="button-addon2"
              >
                <img className="searching_img" src={searching} alt="/" />
              </Button>
            </InputGroup>
          </div>
          <section className="container-fluid text-center ms-3 border-2 border-start">
            <div className="row list-content justify-content-around ms-2  mt-5 gap-2">
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
                </div>
              ) : product.length > 0 ? (
                product.map((products) => {
                  return (
                    <CardProduct
                      id={products.id}
                      title={products.product_name}
                      cart={() => handleCart(products)}
                      price={`${"Rp"} ${costing(products.price)}`}
                      image={`${process.env.REACT_APP_BACKEND_HOST}/${products.image}`}
                      discount="10%"
                    />
                  );
                })
              ) : (
                <div className="mt-5 pt-5">
                  <p className="loading-text mt-5 pt-5 me-5 pe-4">
                    Product Not Found
                  </p>
                </div>
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
                        .get(
                          `${Host}/api/v1/product?category=${category}&sortField=${sortField}&page=${
                            page - 1
                          }&limit=8`
                        )
                        .then((res) => {
                          setProduct(res.data.data);
                          setLoading(false);
                          setPage(page < 1 ? 1 : page - 1);
                          setSearchParams({
                            category: `${category}`,
                            sortField: `${sortField}`,
                            search: `${search}`,
                            page: `${page - 1}`,
                            limit: 4,
                          });
                          setCategory(category);
                          setSortField(sortField);
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    Prev
                  </button>
                  <p className="text-page">
                    Page {currentPage} of {pagination.totalPage}
                  </p>
                  <button
                    className={
                      next === null || currentPage === pagination.totalPage
                        ? "btn-pagenull"
                        : "btn-page"
                    }
                    onClick={() => {
                      setCategory(category);
                      axios
                        .get(
                          `${Host}/api/v1/product?category=${category}&sortField=${sortField}&page=${
                            currentPage + 1
                          }&limit=8`
                        )
                        .then((res) => {
                          setProduct(res.data.data);
                          setLoading(false);
                          setPage(currentPage + 1);
                          setSearchParams({
                            category: `${category}`,
                            sortField: `${sortField}`,
                            page: `${currentPage + 1}`,
                            limit: 4,
                          });
                          setSortField(sortField);
                          setCategory(category);
                        })
                        .catch((err) => console.log(err));
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
              <div
                className={
                  role === "admin"
                    ? "d-flex justify-content-center contbutton "
                    : "none"
                }
              >
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
                  Add New Product
                </button>
              </div>
            )}
            {loading ? (
              ""
            ) : notfound === "Internal server Error" ? (
              ""
            ) : (
              <div
                className={
                  role === "admin"
                    ? "d-flex justify-content-center contbutton2"
                    : "none"
                }
              >
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
