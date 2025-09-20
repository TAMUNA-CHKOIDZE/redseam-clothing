import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // თუ არ არის რეგისტრირებული, მომხმარებელს გადაიყვანს log in-ის გვერდზე
    return <Navigate to="/login" replace />;
  }

  // თუ მომხმარებელი ავტორიზებულია, იმ შემთხვევაში იმ როუტზე გადადის და ის გვერდი ჩნდება,
  // რომელიც აქვს მარშრუტის შესაბამისად ანუ AppRoutes-ში რაც ჰყავს children-ად.
  return children;
}

export default ProtectedRoute;
