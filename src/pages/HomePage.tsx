import { Link } from "react-router";
import Banner from "../components/Banner";
import CardProduct from "../components/CardProduct";
import Category from "../components/Category";
import NavbarComponent from "../components/Navbar";
import { Product } from "../data/products";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Payment from "../components/Payment";
import { useEffect, useState } from "react";
import { getBestSellers, getProduct } from "../api/product/getProduct";
import SearchBar from "../components/SearchBar";

// interface Product {
//   id: string;
//   name: { stringValue: string };
//   email: { stringValue: string };
// }

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProduct();
        const topProducts = await getBestSellers();

        setProducts(allProducts);
        setBestSellers(topProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-[#f4f6f9] pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen">
      <NavbarComponent />
      <div className="bg-[#f4f6f9] p-6">
        <Banner />
        <SearchBar />

        {/* Kategori */}
        <div className="bg-[#f4f6f9] w-full">
          <div className="mx-auto">
            <h2 className="text-xl font-bold mb-4 text-[#353535]">
              Browse Category
            </h2>
            <Category />
          </div>
        </div>

        {/* Paling laris */}
        <div className="bg-[#f4f6f9] w-full">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#353535] font-bold">Paling Laris</h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#28a154] font-medium">
                  <Link to="/best-sellers">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* bestSellers.slice(0, 2) untuk menampilkan 2 produk */}
              {bestSellers.map((product) => (
                <CardProduct key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Semua Produk */}
        <div className="bg-[#f4f6f9] w-full mt-8">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#353535] font-bold">Semua Produk</h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#28a154] font-medium">
                  <Link to="/all-product">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <CardProduct key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        <Payment />
      </div>

      <Footer />
      <Copyright />
    </div>
  );
};

export default HomePage;
