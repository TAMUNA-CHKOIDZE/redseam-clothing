import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import cover from "../assets/images/cover.png";
import cameraIcon from "../assets/icons/camera.svg";
import routes from "../router/routes";
import { registerUser } from "../api/register";

function Register() {
  const navigate = useNavigate();

  // ფორმის ობიექტის სტეტი
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ავატარის ფოტოდ ატვირთვის ლოგიკა
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // input-ების ვალიდაცია პროექტში მოცემული შეზღუდვების მიხედვით
  const validate = () => {
    const newErrors = {};
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.password || formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true); // ნფორმა გაიგზავნა (გამოიყენება ვალიდაციისთვის)
    setErrors({}); // წინა ვალიდაციის შეცდომების გასუფთავება
    setApiError(""); // წინა სერვერული შეცდომის გასუფთავება

    // კლიენტის მხარეს ვალიდაცია
    const validationErrors = validate();
    // შეცდომების შემთხვევაში errors-ის განალხება
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await registerUser(formData);
      navigate(routes.login);
    } catch (error) {
      if (error.status === 422 && error.errors) {
        const apiValidationErrors = {};
        for (const key in error.errors) {
          apiValidationErrors[key] = error.errors[key][0];
        }
        setErrors(apiValidationErrors);
      } else {
        setApiError(error.message || "Registration failed");
      }
    }
  };

  return (
    <section className="flex gap-x-[173px] pr-[245px] bg-white">
      <div className="w-[948px] h-[1000px]">
        <img src={cover} alt="cover" className="object-cover w-full h-full" />
      </div>

      <div className="w-[554px] mt-[152px]">
        <h1 className="heading-primary mb-[48px]">Registration</h1>
        <form onSubmit={handleSubmit}>
          {/* Avatar upload section */}
          <div className="flex items-center gap-x-[15px] mb-[46px]">
            {/* Circle with avatar or camera icon */}
            <div className="w-24 h-24">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full  border border-gray-light flex items-center justify-center">
                  <img src={cameraIcon} alt="camera icon" className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Upload controls */}
            <div className="flex gap-x-[15px] items-center">
              <div className="relative inline-block">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  id="avatar-upload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="text-sm font-normal text-dark-blue cursor-pointer"
                >
                  {avatarPreview ? "Upload new" : "Upload image"}
                </label>
              </div>

              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, avatar: null }));
                    setAvatarPreview(null);
                  }}
                  className="text-sm font-normal text-dark-blue cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* inputs  */}
          <div className="mb-[46px]">
            <div className="mb-[24px]">
              <CustomInput
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholderText="Username"
                required
                hasError={submitted && !!errors.username}
              />
              {errors.username && (
                <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                  {errors.username}
                </p>
              )}
            </div>

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
              {errors.email && (
                <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-[24px]">
              <CustomInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholderText="Password"
                required
                hasError={submitted && !!errors.password}
              />
              {errors.password && (
                <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholderText="Confirm password"
                required
                hasError={submitted && !!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="font-light text-[10px] leading-[100%] tracking-[0] text-primary mt-[4px]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          {/* Register */}
          <button
            type="submit"
            className="w-full btn btn-cta text-base-14 h-[41px]"
          >
            Register
          </button>

          {apiError && (
            <p className="text-primary text-sm text-center">{apiError}</p>
          )}

          {/* Already member? */}
          <p className="text-center mt-4">
            <span className="font-normal text-[14px] leading-[100%] tracking-[0] text-dark-blue mr-[8px]">
              Already member?
            </span>
            <Link
              to={routes.login}
              className="font-medium text-[14px] leading-[100%] tracking-[0] text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
