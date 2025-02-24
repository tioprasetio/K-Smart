import { Routes, Route, useLocation } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BestSellersPage from "./pages/BestSellerPage";
// import NewProduct from "./pages/NewProduct";
import CategoryPage from "./pages/CategoryPage";
import AllProduct from "./pages/AllProducts";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
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
    const username = localStorage.getItem("username") || "Guest"; // Ambil username dari localStorage

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-5B1S66Q62L", {
        page_path: location.pathname,
        user_id: username, // Kirim user_id ke Google Analytics
      });

      console.log("Google Analytics Updated:", {
        page_path: location.pathname,
        user_id: username,
      });
    } else {
      console.warn("Google Analytics (gtag) belum dimuat.");
    }
  }, [location]); // Akan berjalan setiap kali lokasi berubah
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/best-sellers" element={<BestSellersPage />} />

        <Route path="/all-product" element={<AllProduct />} />

        <Route path="/category/:category" element={<CategoryPage />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Dynamic Route */}
        <Route path="/product/:productSlug" element={<ProductDetailPage />} />

        {/* <Route path="/search-products" element={<AllProduct />} /> */}

        {/* Fungsi untuk not found jika tidak ada routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
