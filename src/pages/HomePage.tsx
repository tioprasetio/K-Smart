import { Link } from "react-router";
import { useEffect, useState, useMemo } from "react";

import Banner from "../components/Banner";
import CardProduct from "../components/CardProduct";
import Category from "../components/Category";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import SkeletonCardProduct from "../components/SkeletonCardProduct";
import { getBestSellers, getProduct } from "../api/product/getProduct";
import { useDarkMode } from "../context/DarkMode";
import { Product } from "../data/products";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Swal from "sweetalert2";
import PopupVoucher from "../components/PopupVoucher";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, topProducts] = await Promise.all([
          getProduct(),
          getBestSellers(),
        ]);

        setProducts(allProducts);
        setBestSellers(topProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Matikan loading setelah data diambil
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      const pendingTransaction = localStorage.getItem("pendingTransaction");

      if (pendingTransaction) {
        const transaction = JSON.parse(pendingTransaction);

        try {
          const response = await fetch(
            `http://localhost:5000/api/payment/status/${transaction.order_id}`
          );
          const data = await response.json();

          if (data.success && data.status === "berhasil") {
            // Simpan transaksi ke Firestore
            await setDoc(doc(db, "transactions", transaction.order_id), {
              userId: transaction.userId,
              items: transaction.items,
              totalHarga: transaction.totalHarga,
              totalBV: transaction.totalBV,
              shippingMethod: transaction.shippingMethod,
              shippingPrice: transaction.shippingPrice,
              status: "berhasil", // Status berhasil
              createdAt: serverTimestamp(),
            });

            // Hapus transaksi dari localStorage
            localStorage.removeItem("pendingTransaction");

            // Tampilkan alert sukses
            Swal.fire({
              title: "Pembayaran Berhasil!",
              text: `Anda mendapatkan ${transaction.totalBV} BV.`,
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
        }
      }
    };

    checkTransactionStatus();
  }, []);

  // Gunakan useMemo untuk menghindari re-renders yang tidak perlu
  const displayedBestSellers = useMemo(
    () => bestSellers.slice(0, 4),
    [bestSellers]
  );
  const displayedProducts = useMemo(() => products.slice(0, 4), [products]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
      } pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen`}
    >
      <PopupVoucher />
      <NavbarComponent />
      <div className="p-6">
        <Banner />
        <SearchBar />

        {/* Kategori */}
        <div className="w-full">
          <div className="mx-auto">
            <h2
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xl font-bold mb-4`}
            >
              Browse Category
            </h2>
            <Category />
          </div>
        </div>

        {/* Paling laris */}
        <div className="w-full">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } text-xl font-bold`}
              >
                Paling Laris
              </h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#28a154] font-medium">
                  <Link to="/best-sellers">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* bestSellers.slice(0, 2) untuk menampilkan 2 produk */}
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCardProduct key={index} />
                  ))
                : displayedBestSellers.map((product) => (
                    <CardProduct key={product.id} {...product} />
                  ))}
            </div>
          </div>
        </div>

        {/* Semua Produk */}
        <div className="w-full mt-8">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } text-xl font-bold`}
              >
                Semua Produk
              </h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#28a154] font-medium">
                  <Link to="/all-product">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCardProduct key={index} />
                  ))
                : displayedProducts.map((product) => (
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
