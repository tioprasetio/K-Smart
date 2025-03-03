import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { useDarkMode } from "../context/DarkMode";
import NavbarComponent from "../components/Navbar";
import { formatRupiah } from "../utils/formatCurrency";

interface OrderItem {
  picture: string;
  name: string;
  quantity: number;
  harga: number;
}

interface Order {
  id: string;
  status: string;
  totalHarga: number;
  shippingMethod: string;
  items: OrderItem[];
}

const MyOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrders(user.uid);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Tidak ada pesanan ditemukan");
      }

      const ordersData: Order[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#f4f6f9]"
        } flex justify-center items-center min-h-screen`}
      >
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          Memuat data...
        </p>
        {/* Tambahkan spinner atau skeleton loader di sini */}
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140C00] text-[#FFFFFF]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-6 pt-24 mb-24 sm:pt-28 w-full min-h-screen pb-20`}
      >
        <h2 className="text-xl font-semibold mb-4">Pesanan Saya</h2>
        {orders.length === 0 ? (
          <p>Tidak ada pesanan.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${
                  isDarkMode
                    ? "bg-[#404040] text-[#f0f0f0]"
                    : "bg-[#FFFFFF] text-[#353535]"
                } p-4 rounded-lg`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{order.id}</h3>
                  <span className="font-regular">{order.status}</span>
                </div>

                <ul className="mt-2 space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="p-3 rounded-lg flex">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="font-semibold">
                              {formatRupiah(item.harga)}
                            </p>
                          </div>
                          <div className="text-xs pl-2">x{item.quantity}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;
