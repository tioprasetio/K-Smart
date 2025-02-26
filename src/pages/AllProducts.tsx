import { Link, useSearchParams } from "react-router";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

const AllProduct = () => {
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { isDarkMode } = useDarkMode();

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword"); //Ambil keyword dari URL

  useEffect(() => {
    if (keyword) {
      setFilteredProducts(
        products.filter((product) =>
          product.name?.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [keyword, products]);

  //Tambahkan efek untuk filter produk berdasarkan keyword
  useEffect(() => {
    if (keyword) {
      const filtered = products.filter((product) =>
        product.name?.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [keyword, products]);

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
        } overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24`}
      >
        <div className="text-[#353535] text-xl font-medium p-6">
          <span
            className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}
          >
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / Semua Produk
          </span>
        </div>

        <div className="p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardProduct key={product.id} {...product} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Produk tidak ditemukan.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
