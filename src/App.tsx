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
import PaymentRedirectHandler from "./pages/PaymentRedirectHandler";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import AccountPage from "./pages/AccountPage";
import VoucherPage from "./pages/VoucherPage";
import { VoucherProvider } from "./context/VoucherContext";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import { useDarkMode } from "./context/DarkMode";
import HistoryBvPage from "./pages/HistoryBvPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./context/UserContext";
// import AllProducts from "./pages/AllProducts";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

function App() {
  const location = useLocation(); // Mengambil lokasi saat ini di React Router
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Tambahkan atau hapus class sesuai mode
    if (isDarkMode) {
      document.body.classList.add("bg-[#140c00]", "text-[#f0f0f0]");
      document.body.classList.remove("bg-[#f4f6f9]", "text-[#353535]");
    } else {
      document.body.classList.remove("bg-[#140c00]", "text-[#f0f0f0]");
      document.body.classList.add("bg-[#f4f6f9]", "text-[#353535]");
    }
  }, [isDarkMode]); // Akan berjalan setiap kali `isDarkMode` berubah

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
      <UserProvider>
        <VoucherProvider>
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

              <Route path="/akun" element={<AccountPage />} />

              <Route path="/my-order" element={<MyOrderPage />} />

              <Route path="/voucher" element={<VoucherPage />} />

              {/* Rute dashboard yang hanya bisa diakses admin */}
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route
                path="/history-BV"
                element={
                  <ProtectedRoute>
                    <HistoryBvPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment-redirect"
                element={<PaymentRedirectHandler />}
              />

              <Route
                path="/payment-callback"
                element={<PaymentCallbackPage />}
              />

              {/* Dynamic Route */}
              <Route
                path="/product/:productSlug"
                element={<ProductDetailPage />}
              />

              {/* Dynamic Route */}
              <Route
                path="/voucher/:voucherSlug"
                element={<VoucherDetailPage />}
              />

              {/* Fungsi untuk not found jika tidak ada routes */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ProductProvider>
        </VoucherProvider>
      </UserProvider>
    </>
  );
}

export default App;
