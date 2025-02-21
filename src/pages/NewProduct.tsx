import { Link } from "react-router";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";
import { NEW_PRODUCTS } from "../data/products"; // Pastikan path sesuai

const NewProduct = () => {
  return (
    <>
      <NavbarComponent />
      <div className="bg-[#f4f6f9] overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24">
        <div className="text-[#353535] text-xl font-medium bg-[#f4f6f9] p-6">
          <span>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / Produk Baru
          </span>
        </div>

        <div className="bg-[#f4f6f9] p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {NEW_PRODUCTS.map((product) => (
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
                category={product.deskripsi}
                key={product.id}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
