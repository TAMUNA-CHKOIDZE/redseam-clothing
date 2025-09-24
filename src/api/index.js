const BASE_URL = "https://api.redseam.redberryinternship.ge/api";

async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      // ავტორიზაციის დამატება
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  const result = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API request failed");
  }

  return result;
}

export default fetchAPI;
