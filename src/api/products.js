import fetchAPI from "./index";

export const fetchProducts = (page = 1) => {
  return fetchAPI(`/products?page=${page}`);
};
