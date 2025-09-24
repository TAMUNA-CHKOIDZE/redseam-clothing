import fetchAPI from "./index"; 

export const loginUser = async (email, password) => {
  const response = await fetchAPI("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};
