const BASE_URL = "https://api.redseam.redberryinternship.ge/api";

async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "API request failed");
    error.status = response.status;
    error.errors = result.errors || null;
    throw error;
  }

  return result;
}

export default fetchAPI;
