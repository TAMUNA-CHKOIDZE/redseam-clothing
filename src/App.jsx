import "./App.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <div
      // style={{ border: "5px solid red" }}
      className="max-w-[1920px] w-full mx-auto"
    >
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
