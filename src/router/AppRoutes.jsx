import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductPage from "../pages/ProductPage";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import RootRedirect from "./RootRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      {/* საიტზე შესვლისას RootRedirect-ით ვწყვეტ productList გამოუჩნდეს მომხმარებელს თუ login */}
      <Route path="/" element={<RootRedirect />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />

      {/* ProtectedRoute კომპონენტი იცავს /products, /product/:id, /checkout გვერდებს, 
      რათა მომხმარებელმა ვერ შეძლოს გადასვლა, თუ არ არის დალოგინებული ან რეგისტრირებული. */}
      <Route
        path={routes.productList}
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={routes.productDetail}
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={routes.checkout}
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
