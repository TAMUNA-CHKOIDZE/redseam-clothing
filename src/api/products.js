import fetchAPI from "./index";

export const fetchProducts = async (page = 1, filters = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  if (filters.priceFrom) {
    params.append("filter[price_from]", filters.priceFrom);
  }
  if (filters.priceTo) {
    params.append("filter[price_to]", filters.priceTo);
  }
  if (filters.sort) {
    params.append("sort", filters.sort);
  }

  const endpoint = `/products?${params.toString()}`;

  return fetchAPI(endpoint); 
};
