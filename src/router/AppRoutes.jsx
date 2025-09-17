import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductPage from "../pages/ProductPage";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.productDetail} element={<ProductPage />} />
      <Route path={routes.checkout} element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
