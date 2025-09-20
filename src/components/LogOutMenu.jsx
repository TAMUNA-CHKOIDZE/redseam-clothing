import React, { useState } from "react";
import select from "../assets/icons/chevron-down.svg";

function LogOutMenu({ logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={toggleMenu} title="User menu">
        <img src={select} alt="select" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 z-10">
          <button onClick={handleLogout} className="btn btn-cta w-full px-4 py-2 cursor-pointer">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default LogOutMenu;
