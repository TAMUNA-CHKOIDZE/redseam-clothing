import fetchAPI from "./index";

// პროდუქტების წამორება გვერდების და ფილტრის პარამეტრბის მიხედვით
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

// ერთი პროდუქტი კონკრეტული ID-ით
export const fetchProductById = async (id) => {
  const product = await fetchAPI(`/products/${id}`);

  const variants = product.available_colors.map((color, index) => ({
    color,
    image: product.images[index] || product.cover_image,
  }));

  return {
    ...product,
    variants,
    sizes: product.available_sizes,
    brand: product.brand?.name || "",
    logo: product.brand?.image || "",
  };
};
