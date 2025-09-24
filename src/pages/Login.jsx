import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import cover from "../assets/images/cover.png";
import routes from "../router/routes";
import CustomInput from "../components/CustomInput";
import { loginUser } from "../api/loginUser";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    } else if (formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters";
    }

    if (!formData.password || formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await loginUser(formData.email, formData.password);

      login(data.user);
      navigate(routes.productList);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setApiError("Invalid email or password.");
      }
    }
  };

  return (
    <section className="flex gap-x-[173px] pr-[245px] bg-white">
      <div className="w-[948px] h-[1000px]">
        <img src={cover} alt="cover" className="object-cover w-full h-full" />
      </div>

      <div className="w-[554px] mt-[241px]">
        <h1 className="heading-primary mb-[48px]">Log in</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-[24px]">
            <CustomInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholderText="Email"
              required
              hasError={submitted && !!errors.email}
            />
            {submitted && errors.email && (
              <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-[46px]">
            <CustomInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholderText="Password"
              required
              hasError={submitted && !!errors.password}
            />
            {submitted && errors.password && (
              <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn btn-cta text-base-14 h-[41px] mb-[24px]"
          >
            Log in
          </button>

          {apiError && (
            <p className="text-primary text-sm text-center">{apiError}</p>
          )}

          <p className="text-center mt-4">
            <span className="font-normal text-[14px] leading-[100%] tracking-[0] text-dark-blue mr-[8px]">
              Not a member?
            </span>
            <Link
              to={routes.register}
              className="font-medium text-[14px] leading-[100%] tracking-[0] text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
