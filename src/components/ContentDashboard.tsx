import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkMode";
import { db } from "../config/Firebase";

const ContentDashboard = () => {
  const [count, setCount] = useState<number | null>(null);
  const [countProduct, setCountProduct] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const q = query(
          collection(db, "transactions"),
          where("status", "==", "berhasil")
        );
        const snapshot = await getCountFromServer(q);
        setCount(snapshot.data().count);
      } catch (error) {
        console.error("Error fetching count:", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
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
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1
          className={`${
            isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
          } text-xl font-bold mb-4`}
        >
          Dashboard
        </h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div
            className={`${
              isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
            } flex flex-col text-left p-4 h-24 rounded-sm`}
          >
            <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
              Total Transaksi
            </p>
            <p className="text-xl font-bold text-gray-400 dark:text-gray-500">
              {count !== null ? `${count}` : "No data"}
            </p>
          </div>

          <div
            className={`${
              isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
            } flex flex-col text-left p-4 h-24 rounded-sm`}
          >
            <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
              Total Product
            </p>
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              {countProduct !== null ? `${countProduct}` : "No data"}
            </p>
          </div>

          <div
            className={`${
              isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
            } flex flex-col text-left p-4 h-24 rounded-sm`}
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">Test 3</p>
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
      </div>
    </div>
  );
};

export default ContentDashboard;
