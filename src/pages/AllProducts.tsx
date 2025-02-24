import { Link, useSearchParams } from "react-router"; //Perbaiki import
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";
import { Product } from "../data/products";
import { useEffect, useState } from "react";
import { getProduct } from "../api/product/getProduct";

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); //Tambahkan state filter

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword"); //Ambil keyword dari URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProduct();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
      <div className="bg-[#f4f6f9] overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24">
        <div className="text-[#353535] text-xl font-medium bg-[#f4f6f9] p-6">
          <span>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / Semua Produk
          </span>
        </div>

        <div className="bg-[#f4f6f9] p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
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
