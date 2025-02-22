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
import { getProduct } from "../api/product/getProduct";

// interface Product {
//   id: string;
//   name: { stringValue: string };
//   email: { stringValue: string };
// }

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        console.log("data=", data);
        setProducts(data);

        // setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-[#f4f6f9] pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen">
      <NavbarComponent />
      <div className="bg-[#f4f6f9] p-6">
        <Banner />

        {/* Kategori */}
        <div className="bg-[#f4f6f9] w-full">
          <div className="mx-auto">
            <h2 className="text-xl font-bold mb-4">Browse Category</h2>
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
                  <Link to="/BestSellers">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* BEST_SELLERS.slice(0, 2) untuk menampilkan 2 produk */}
              {products.map((product) => {
                return (
                  <CardProduct
                    // Kalo product.name dihapus baru akan memunculkan Unknown
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
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Produk Baru */}
        {/* <div className="bg-[#f4f6f9] w-full mt-8">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#353535] font-bold">Produk Baru</h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#28a154] font-medium">
                  <Link to="/NewProducts">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => {
                return (
                  <CardProduct
                    // Kalo product.name dihapus baru akan memunculkan Unknown
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
                  />
                );
              })}
            </div>
          </div>
        </div> */}

        <Payment />
      </div>

      <Footer />
      <Copyright />
    </div>
  );
};

export default HomePage;
