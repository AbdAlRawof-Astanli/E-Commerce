import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage.tsx";
import Navbar from "./components/NavBar";
import AuthProvider from "./context/Auth/AuthProvider.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CartProvider from "./context/Cart/CartProvider.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
