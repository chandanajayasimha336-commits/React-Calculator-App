import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/login" />;
 //return <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Page */}
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Home */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Protected Product Details */}
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;