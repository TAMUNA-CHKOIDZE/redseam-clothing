import React, { useState } from "react";
import eye from "../assets/icons/eye.svg";
import eyeOff from "../assets/icons/eye-off.svg";

function CustomInput({
  type = "text",
  name,
  value,
  onChange,
  placeholderText,
  required = false,
  hasError = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative w-full">
      {!value && !isFocused && (
        // placeholder-ის ნაცვლად გამოვიყენე label, რადგან ვარსკვლავს ვერ ვსტილავდი
        <label
          htmlFor={name}
          className="absolute inset-y-0 left-3 flex items-center leading-[100%] font-normal tracking-[0%] text-[#3E424A] pointer-events-none select-none"
        >
          {placeholderText}{" "}
          {required && <span className="text-primary">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        className={`w-full rounded px-3 py-2 text-sm leading-[100%] tracking-normal
          ${hasError ? "border border-primary" : "border border-[#E1DFE1]"}
          focus:outline-none`}
      />

      {/* პაროლის გამოჩენა დამალვა */}
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5"
          tabIndex={-1}
        >
          {showPassword ? (
            <img src={eye} alt="eye" className="w-5 h-5" />
          ) : (
            <img src={eyeOff} alt="eye-off" className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}

export default CustomInput;
