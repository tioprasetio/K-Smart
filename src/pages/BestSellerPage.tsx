import { Link } from "react-router";
import CardProduct from "../components/CardProduct";
import NavbarComponent from "../components/Navbar";
import { Product } from "../data/products"; // Pastikan path sesuai
import { useEffect, useState } from "react";
import { getBestSellers } from "../api/product/getProduct";

const BestSellersPage = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const topProducts = await getBestSellers();

          setBestSellers(topProducts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <>
      <NavbarComponent />
      <div className="bg-[#f4f6f9] overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24">
        <div className="text-[#353535] text-xl font-medium bg-[#f4f6f9] p-6">
          <span>
            <Link className="text-[#28a154]" to="/">
              Home
            </Link>{" "}
            / Paling Laris
          </span>
        </div>

        <div className="bg-[#f4f6f9] p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <CardProduct key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellersPage;
