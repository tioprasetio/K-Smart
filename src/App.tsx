import { Routes, Route, useLocation } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BestSellersPage from "./pages/BestSellerPage";
// import NewProduct from "./pages/NewProduct";
import CategoryPage from "./pages/CategoryPage";
import AllProduct from "./pages/AllProducts";
import { useEffect } from "react";
import AboutUsPage from "./pages/AboutUsPage";
import { ProductProvider } from "./context/ProductContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrderPage from "./pages/MyOrderPage";
// import AllProducts from "./pages/AllProducts";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

function App() {
  const location = useLocation(); // Mengambil lokasi saat ini di React Router

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userEmail = user?.email || "Guest"; // Ambil email atau set default "Guest"

    if (window.gtag) {
      window.gtag("config", "G-5B1S66Q62L", {
        page_path: location.pathname,
        user_id: userEmail, // Kirim user_id ke Google Analytics
      });
    } else {
      console.warn("Google Analytics (gtag) belum dimuat.");
    }
  }, [location]); // Akan berjalan setiap kali lokasi berubah
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/best-sellers" element={<BestSellersPage />} />

          <Route path="/all-product" element={<AllProduct />} />

          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="/login" element={<AuthPage />} />

          <Route path="/about-us" element={<AboutUsPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/my-order" element={<MyOrderPage />} />

          {/* Dynamic Route */}
          <Route path="/product/:productSlug" element={<ProductDetailPage />} />

          {/* <Route path="/search-products" element={<AllProduct />} /> */}

          {/* Fungsi untuk not found jika tidak ada routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
