import { Link, useLocation } from "react-router-dom";
import { ALL_PRODUCTS } from "../data/products";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";

const AllProducts = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  const filteredProducts = ALL_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  console.log(filteredProducts);

  return (
    <>
      <NavbarComponent />
      <div className="bg-[#f4f6f9] overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24">
        <div className="text-[#353535] text-xl font-medium bg-[#f4f6f9] p-6">
          <span>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / Hasil Pencarian: "{keyword}"
          </span>
        </div>

        <div className="bg-[#f4f6f9] p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              <>
                {filteredProducts.map((product) => (
                  <CardProduct
                    name={product.name}
                    picture={product.picture}
                    harga={product.harga}
                    rate={product.rate}
                    terjual={product.terjual}
                    beratPengiriman={product.beratPengiriman}
                    beratBersih={product.beratBersih}
                    pemesananMin={product.pemesananMin}
                    deskripsi={product.deskripsi}
                    category={product.category}
                    key={product.id}
                    id={product.id}
                  />
                ))}
              </>
            ) : (
              <p>Maaf, Produk tidak ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
