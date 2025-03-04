import { Link, useParams } from "react-router";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";
import { Product } from "../data/products";
import { useEffect, useState } from "react";
import { getProduct } from "../api/product/getProduct";
import { useDarkMode } from "../context/DarkMode";

const CategoryPage = () => {
  const { isDarkMode } = useDarkMode();
  const { category } = useParams(); // Ambil kategori dari URL
  const decodedCategory = decodeURIComponent(category || ""); // Dekode jika ada spasi
  // const products = getProductsByCategory(decodedCategory); // Ambil produk sesuai kategori

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProduct = await getProduct();
        // console.log("All products:", allProduct);

        // Filter berdasarkan kategori
        const filteredProducts = allProduct.filter(
          (product: Product) => product.category === decodedCategory
        );

        // console.log("Filtered products:", filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [decodedCategory]); // Tambahkan `decodedCategory` agar re-fetch jika kategori berubah

  return (
    <>
      <NavbarComponent />
      <div className={`${isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"} overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24`}>
        <div className="text-[#353535] text-xl font-medium p-6">
          <span className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / {decodedCategory}
          </span>
        </div>

        <div className="p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product: Product, index: number) => (
                <CardProduct key={index} {...product} />
              ))
            ) : (
              <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>Maaf, Tidak ada produk tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
