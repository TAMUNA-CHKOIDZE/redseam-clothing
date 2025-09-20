import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import routes from "../router/routes";
import LogOutMenu from "../components/LogOutMenu";
import logo from "../assets/icons/HandEye.svg";
import userIcon from "../assets/icons/user.svg";
import cart from "../assets/icons/shopping-cart-black.svg";
import defaultAvatar from "../assets/images/profile.svg";

function Header() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  // isAuthPage-ში ვინახავ ლოგინის ან რეგისტრაციის გვერდზეა თუ არა
  const isAuthPage =
    location.pathname === routes.login || location.pathname === routes.register;

  return (
    <header className="flex items-center justify-between px-[100px] bg-white h-[80px]">
      <Link
        to={isAuthenticated ? routes.productList : routes.login}
        className="flex items-center gap-[4px]"
      >
        <img src={logo} alt="logo" className="w-[24px] h-[24px]" />
        <span className="font-semibold text-[16px] leading-[100%] tracking-[0%] text-dark-blue">
          RedSeam Clothing
        </span>
      </Link>

      <div>
        {isAuthPage ? (
          <Link to={routes.login} className="flex items-center gap-2">
            <img src={userIcon} alt="user" className="w-[20px] h-[20px]" />
            <span className="font-medium text-[12px] leading-[100%] tracking-[0%] text-dark-blue">
              Log in
            </span>
          </Link>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-[20px]">
            <button className="cursor-pointer">
              <img src={cart} alt="cart" className="w-[24px] h-[24px]" />
            </button>
            <div className="flex items-center gap-[4px]">
              <img
                src={user?.avatar || defaultAvatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <LogOutMenu logout={logout} />
            </div>
          </div>
        ) : (
          <Link to={routes.login} className="flex items-center gap-2">
            <img
              src={defaultAvatar}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>Log in</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
