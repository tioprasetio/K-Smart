import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkMode";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";

const HomeDashboard = () => {
    const [countTransaction, setCountTransaction] = useState<number | null>(
      null
    );
    const [countProduct, setCountProduct] = useState<number | null>(null);
    const [countVoucher, setCountVoucher] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
      const fetchCountTransaction = async () => {
        try {
          const q = query(
            collection(db, "transactions"),
            where("status", "==", "berhasil")
          );
          const snapshot = await getCountFromServer(q);

          setCountTransaction(snapshot.data().count);
        } catch (error) {
          console.error("Error fetching count:", error);
          setCountTransaction(0);
        } finally {
          setLoading(false);
        }
      };

      fetchCountTransaction();
    }, []);

    useEffect(() => {
      const fetchCountProduct = async () => {
        try {
          const q = query(collection(db, "product"));
          const snapshot = await getCountFromServer(q);

          setCountProduct(snapshot.data().count);
        } catch (error) {
          console.error("Error fetching count:", error);
          setCountProduct(0);
        } finally {
          setLoading(false);
        }
      };

      fetchCountProduct();
    }, []);

    useEffect(() => {
      const fetchCountVoucher = async () => {
        try {
          const q = query(collection(db, "vouchers"));
          const snapshot = await getCountFromServer(q);

          setCountVoucher(snapshot.data().count);
        } catch (error) {
          console.error("Error fetching count:", error);
          setCountVoucher(0);
        } finally {
          setLoading(false);
        }
      };

      fetchCountVoucher();
    }, []);

    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <p className={`${isDarkMode ? "text-white" : "text-[#353535]"}`}>
            Memuat data...
          </p>
        </div>
      );
    }

  return (
    <>
      <h1
        className={`${
          isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
        } text-xl font-bold mb-4`}
      >
        Dashboard
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex gap-2 text-left p-4 h-24 rounded-sm justify-between`}
        >
          <div className="flex flex-col justify-between">
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xs md:text-sm font-semibold`}
            >
              Total Transaksi
            </p>
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xl font-bold`}
            >
              {countTransaction !== null ? `${countTransaction}` : "No data"}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2422/2422792.png"
            alt=""
          />
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex gap-2 text-left p-4 h-24 rounded-sm justify-between`}
        >
          <div className="flex flex-col justify-between">
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xs md:text-sm font-semibold`}
            >
              Total Product
            </p>
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xl font-bold`}
            >
              {countProduct !== null ? `${countProduct}` : "No data"}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2897/2897818.png"
            alt=""
          />
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex gap-2 text-left p-4 h-24 rounded-sm justify-between`}
        >
          <div className="flex flex-col justify-between">
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xs md:text-sm font-semibold`}
            >
              Total Voucher
            </p>
            <p
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              } text-xl font-bold`}
            >
              {countVoucher !== null ? `${countVoucher}` : "No data"}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8633/8633496.png"
            alt=""
          />
        </div>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
        } flex items-center justify-center h-48 mb-4 rounded-sm`}
      >
        <p className="text-2xl text-gray-400 dark:text-gray-500">Test 4</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex items-center justify-center rounded-sm h-28`}
        >
          <p className="text-2xl text-gray-400 dark:text-gray-500">Test 5</p>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex items-center justify-center rounded-sm h-28`}
        >
          <p className="text-2xl text-gray-400 dark:text-gray-500">Test 6</p>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex items-center justify-center rounded-sm h-28`}
        >
          <p className="text-2xl text-gray-400 dark:text-gray-500">Test 7</p>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
          } flex items-center justify-center rounded-sm h-28`}
        >
          <p className="text-2xl text-gray-400 dark:text-gray-500">Test 8</p>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
