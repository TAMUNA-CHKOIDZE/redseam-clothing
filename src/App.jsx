import "./App.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <div
      // style={{ border: "5px solid red" }}
      className="max-w-[1920px] w-full mx-auto"
    >
      <AuthProvider>
        <CartProvider>
          <Header />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
