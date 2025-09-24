import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function CheckoutForm({ onSubmit }) {
  const { user } = useContext(AuthContext); // ვიღებ user-ს კონტექსტიდან

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip: "",
  });

  // API-დან ელფოსტის წამოღება - pre populated from API, but editable
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // ← formData გავგზავნოთ მშობელ კომპონენტში
    // გავასუფთავოთ ფორმა (მაგ: name/surname/address/zip — მაგრამ email დარჩეს)
    setFormData({
      name: "",
      surname: "",
      email: user?.email || "",
      address: "",
      zip: "",
    });
  };
  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-y-[33px]"
    >
      <div className="flex gap-x-[24px]">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
          className="input"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input"
      />

      <div className="flex gap-x-[24px]">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip code"
          value={formData.zip}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
    </form>
  );
}

export default CheckoutForm;
