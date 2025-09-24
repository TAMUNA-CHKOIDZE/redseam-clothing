import fetchAPI from "./index";

export const registerUser = async (formData) => {
  // სერვერზე მომხმარებლის დარეგისტრირებულ მონაცემებს ვაგზავნი multipart/form-data ფორმატით — იმიტომ, რომ მომხმარებელს შეიძლება ჰქონდეს სურათიც (avatar) ასატვირთი, რაც JSON-ს არ შეუძლია (ანუ JSON ფორმატით ვერ გავაგზავნი).
  // ვქმნი FormData ობიექტს და ვამატებ საჭირო ველებს
  const data = new FormData();
  data.append("username", formData.username);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("password_confirmation", formData.confirmPassword);
  //   თუ აიტვირთა ფოტო, მასაც ვამატებ
  if (formData.avatar) {
    data.append("avatar", formData.avatar);
  }

  // fetch()-ით ვაგზავნი POST მოთხოვნას Content-Type: multipart/form-data ფორმატით, რათა მონაცემები გავაგზავნო/შევინახო
  const response = await fetchAPI("/register", {
    method: "POST", // POST გამოიყენება მაშინ, როცა სერვერზე ახალი ობიექტი უნდა შეიქმნას
    headers: {
      Accept: "application/json", // სერვერისგან ველოდები პასუხს JSON ფორმატში
    },
    body: data, // ვაგზავნი მონაცემებს (data არის FormData, რომელიც შეიცავს ველებს)
  });

  const result = await response.json(); // response.json() ფუნქცია იღებს HTTP-ს პასუხს (response) და აქცევს JSON ობიექტად და await ელის, სანამ ეს პროცესი დასრულდება

  //   თუ პასუხი წარუმატებელია
  if (!response.ok) {
    const error = new Error(result.message || "Registration failed");
    error.status = response.status;
    error.errors = result.errors;
    throw error;
  }

  return result;
};
