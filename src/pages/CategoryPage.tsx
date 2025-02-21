import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../data/products";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";

const CategoryPage = () => {
  const { category } = useParams(); // Ambil kategori dari URL
  const decodedCategory = decodeURIComponent(category || ""); // Dekode jika ada spasi
  const products = getProductsByCategory(decodedCategory); // Ambil produk sesuai kategori

  return (
    <>
      <NavbarComponent />
      <div className="bg-[#f4f6f9] overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24">
        <div className="text-[#353535] text-xl font-medium bg-[#f4f6f9] p-6">
          <span>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / {decodedCategory}
          </span>
        </div>

        <div className="bg-[#f4f6f9] p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <CardProduct key={index} {...product} />
              ))
            ) : (
              <p className="text-gray-500">Maaf, Tidak ada produk tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
