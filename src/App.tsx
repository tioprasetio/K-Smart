import { Routes, Route } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BestSellersPage from "./pages/BestSellerPage";
// import NewProduct from "./pages/NewProduct";
import CategoryPage from "./pages/CategoryPage";
// import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/BestSellers" element={<BestSellersPage />} />

        {/* <Route path="/product-unggulan" element={<UnggulanPage />} /> */}

        <Route path="/category/:category" element={<CategoryPage />} />

        {/* Dynamic Route */}
        <Route path="/product/:productSlug" element={<ProductDetailPage />} />

        {/* <Route path="/products" element={<AllProducts />} /> */}

        {/* Fungsi untuk not found jika tidak ada routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
