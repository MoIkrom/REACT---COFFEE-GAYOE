import axios from "axios";

const HOST = process.env.REACT_APP_BACKEND_HOST;
const PREFIKS = "api/v1/";

export const login = (body) => {
  const URL = HOST + PREFIKS + "auth";
  return axios.post(URL, body);
};

export const signup = (body) => {
  const URL = HOST + PREFIKS + "users";
  return axios.post(URL, body);
};

// Axios History
export const historyTransaction = (token) => {
  return axios.get(`${HOST}api/v1/transactions/history`, {
    headers: {
      "x-access-token": token,
    },
  });
};
// Axios Transactions
export const transactions = (token, body) => {
  return axios.post(`${HOST}api/v1/transactions`, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const getProfile = (token) => {
  const URL = HOST + PREFIKS + "users/profile";
  return axios.get(URL, { headers: { "x-access-token": token } });

  // return axios.get(URL, {
  //   headers: {
  //     "x-access-token": token,
  //   },
  // });
};

export const editProfile = (body) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + PREFIKS + "users";
  return axios.patch(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

// export const logout = () => {
//   const login = JSON.parse(localStorage.getItem("login"));
//   const token = login.token;
//   console.log(token);
//   const URL = HOST + "/auth/logout";
//   return axios.delete(URL, {
//     headers: {
//       "x-access-token": token,
//     },
//   });
// };

export const getProduct = (param) => {
  console.log("<<<", param);
  const queryParam = {
    search: param.search ?? "",
    category: param.category ?? "",
    sort: param.sort ?? "id",
    // order: param.order ?? "asc",
    page: param.page ?? "1",
    limit: param.limit ?? "12",
  };
  // const URL = HOST + `product?search=${queryParam.search}&category=${queryParam.category}&order=${queryParam.order}&sort=$
  const URL = HOST + `product?search=${queryParam.search}&category=${queryParam.category}&sort=${queryParam.sort}&page=${queryParam.page}&limit=${queryParam.limit}`;
  return axios.get(URL);
};

// Masi Belum
// export const getFavorite = () => {
//   const URL = HOST + `/products/get_products?order=desc&sort=total_selling&page=1&limit=3`;
//   return axios.get(URL);
// };

// Masi Belum
// export const getProductById = (id) => {
//   const login = JSON.parse(localStorage.getItem("login"));
//   const token = login.token;
//   console.log(token);
//   const URL = HOST + `/products/product_detail/${id}`;
//   return axios.get(URL, {
//     headers: {
//       "x-access-token": token,
//     },
//   });
// };

// ==============================================================

// export const getHistory = (param) => {
//   const login = JSON.parse(localStorage.getItem("login"));
//   const token = login.token;
//   const queryParam = {
//     page: param.page ?? "1",
//     limit: param.limit ?? "15",
//   };
//   const URL = HOST + `/transactions/history?page=${queryParam.page}&limit=${queryParam.limit}`;
//   return axios.get(URL, {
//     headers: {
//       "x-access-token": token,
//     },
//   });
// };

// ==============================================================

// export const deleteHistory = (id) => {
//   const login = JSON.parse(localStorage.getItem("login"));
//   const token = login.token;
//   console.log(token);
//   const URL = HOST + `/transactions/delete_history/${id}`;
//   return axios.delete(URL, {
//     headers: {
//       "x-access-token": token,
//     },
//   });
// };

// export const getSizeProduct = () => {
//   const URL = HOST + `/size_products`;
//   return axios.get(URL);
// };

// export const getDeliveryMethod = () => {
//   const URL = HOST + `/delivery_methods`;
//   return axios.get(URL);
// };

// export const getCategory = () => {
//   const URL = HOST + `/categories`;
//   return axios.get(URL);
// };

// ==============================================================

export const createTransaction = (body) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + PREFIKS + "transactions";
  return axios.post(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

// ==============================================================

export const createProduct = (body) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + PREFIKS + "/products/create_product";
  return axios.post(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

// ==============================================================

export const editProduct = (body, id) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + PREFIKS + `/products/edit_products/${id}`;
  return axios.patch(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
// ==============================================================

export const deleteProduct = (id) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  console.log(token);
  const URL = HOST + PREFIKS + `/products/delete_products/${id}`;
  return axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });
};
// ==============================================================

export const createPromo = (body) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + PREFIKS + "promos";
  return axios.post(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
// ==============================================================

export const editPromo = (body, id) => {
  const login = JSON.parse(localStorage.getItem("login"));
  const token = login.token;
  // const token = localStorage.getItem("token");
  const URL = HOST + `/promos/edit_promo/${id}`;
  return axios.patch(URL, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
