import { Routes, Route } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BestSellersPage from "./pages/BestSellerPage";
// import NewProduct from "./pages/NewProduct";
import CategoryPage from "./pages/CategoryPage";
import AllProduct from "./pages/AllProducts";
// import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/best-sellers" element={<BestSellersPage />} />

        <Route path="/all-product" element={<AllProduct />} />

        <Route path="/category/:category" element={<CategoryPage />} />

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
