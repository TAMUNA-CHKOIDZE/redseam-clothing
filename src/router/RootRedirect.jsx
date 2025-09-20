import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import routes from "./routes";

function RootRedirect() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    // ვიყენებ როუტის სწორად გადამისამართებისთვის: თუ ავტორიზებულია იუზერი, მაშინ საიტზე შესვლისას
    // ავტომატურად გამოუჩინოს productList-ის გვერდი თუ არადა login-ის გვერდი. 
    // იქიდან შეუძლია გადავიდეს რეგისტრაციის გვერდზე თუ ჯერ არ აქვს ანგარიში.
    // <Navigate
    //   to={isAuthenticated ? routes.productList : routes.login}
    //   replace
    // />
    <Navigate to={isAuthenticated ? "/products" : "/login"} replace />
  );
}

export default RootRedirect;
