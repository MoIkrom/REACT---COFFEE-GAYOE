/* eslint-disable no-unused-vars */
import axios from "axios";
const BaseUrl = process.env.REACT_APP_BACKEND_HOST;
const Prefix = "api/v1/";

export const getFavoriteHome = () => {
  const URL = `${BaseUrl}${Prefix}product?category=favorite&page=1&limit=4`;
  return axios.get(URL);
};
export const getProductNav = (category, sort, page) => {
  const URL = `${BaseUrl}${Prefix}`;
  return axios.get(`${URL}product?category=${category}&sort=${sort}&page=${page}&limit=4`);
};

// export const getFavorite = () => {
//   const URL = `${BaseUrl}/api/products/favorite?page=1&limit=12`;
//   return axios.get(URL);
// };
export const getProductDetail = (id) => {
  const URL = `${BaseUrl}${Prefix}product/${id}`;
  return axios.get(URL);
};

// export const sortCheapest = (order = "", page = 1) => {
//   const URL = `${BaseUrl}${Prefix}product?sort=cheapest&order=${order}&page=${page}&limit=4`;
//   return axios.get(URL);
// };

export const getFixProducts = (category = "", search = "", sort = "name", page = 1) => {
  const URL = `${BaseUrl}${Prefix}product?category=${category}&sort=${sort}&search=${search}&page=${page}&limit=4`;
  return axios.get(URL);
};

// export const editProductAxios = (id, body, token) => {
//   const URL = `${BaseUrl}${Prefix}product/${id}`;
//   return axios.patch(URL, body, {
//     headers: {
//       "x-access-token": token,
//       "content-type": "multipart/form-data",
//     },
//   });
// };

export const createProductAxios = (body, token) => {
  const URL = `${BaseUrl}${Prefix}product`;
  return axios.post(URL, body, {
    headers: { "Content-Type": "multipart/form-data", "x-access-token": token },
  });
};
