import { useCart } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import { formatRupiah } from "../utils/formatCurrency";
import { useDarkMode } from "../context/DarkMode";
import { useEffect, useState } from "react";

const PaymentCallback = () => {
  const [statusMessage, setStatusMessage] = useState("Menunggu verifikasi...");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const { clearCheckedOutItems } = useCart();
  const { selectedProducts, setSelectedProducts } = useCheckout();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const storedOrderId = localStorage.getItem("order_id");
    if (!storedOrderId) {
      setStatusMessage("❌ Tidak ada transaksi yang ditemukan.");
      return;
    }

    setOrderId(storedOrderId);

    // Hapus query params dari URL setelah diakses
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);

    fetch(
      `http://localhost:5000/api/payment/check-status?order_id=${storedOrderId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "berhasil") {
          setStatusMessage("Transaksi berhasil!");
          setTotal(data.transaction.gross_amount);
        } else if (data.status === "pending") {
          setStatusMessage("Transaksi masih dalam proses. Mohon tunggu.");
        } else {
          setStatusMessage("Transaksi gagal atau dibatalkan.");
        }
      })
      .catch(() => setStatusMessage("❌ Gagal mengambil status pembayaran."));
  }, []);

  const handleSelesai = () => {
    localStorage.removeItem("order_id");

    clearCheckedOutItems(selectedProducts);

    // Hapus checkout dari local storage dan state
    localStorage.removeItem("selectedProducts");
    setSelectedProducts([]);

    // Redirect ke halaman utama
    window.location.href = "/";
  };

  // Menentukan ikon berdasarkan status transaksi
  const renderIcon = () => {
    if (statusMessage === "Transaksi berhasil!") {
      return (
        <i className="bx bxs-message-alt-check text-6xl md:text-8xl text-green-500"></i>
      );
    } else if (
      statusMessage === "Transaksi masih dalam proses. Mohon tunggu."
    ) {
      return (
        <i className="bx bxs-hourglass text-6xl md:text-8xl text-yellow-500"></i>
      ); // Ikon pending
    } else if (statusMessage === "Transaksi gagal atau dibatalkan.") {
      return (
        <i className="bx bxs-message-alt-x text-6xl md:text-8xl text-red-500"></i>
      ); // Ikon gagal
    } else {
      return (
        <i className="bx bxs-hourglass text-6xl md:text-8xl text-yellow-500"></i>
      ); // Ikon gagal
    }
  };

  return (
    <>
      <div
        className={`${
          isDarkMode
            ? "bg-[#140c00] text-[#f0f0f0]"
            : "bg-[#f4f6f9] text-[#353535]"
        } flex flex-col items-center justify-center h-screen p-6`}
      >
        <div className="xs:w-full md:w-1/2 flex flex-col items-center justify-center">
          {renderIcon()}{" "}
          {/* Panggil fungsi renderIcon() untuk menampilkan ikon */}
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10">
            {statusMessage}
          </h1>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-white"
          } flex flex-col items-center justify-center rounded-lg md:w-1/2 w-full shadow-md`}
        >
          <div className="w-full p-4 items-center justify-center">
            <div className="text-center">
              <p
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-gray-500"
                } text-sm md:text-LG font-normal`}
              >
                Order ID:
              </p>
              <p
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-text-[#353535]"
                } text-lg md:text-2xl font-bold`}
              >
                {orderId}
              </p>
            </div>
            {total !== null && (
              <div className="text-center">
                <p
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-gray-500"
                  } text-sm md:text-lg mt-4 font-normal`}
                >
                  Nominal Transaksi
                </p>
                <p className="text-2xl md:text-4xl font-bold">
                  {formatRupiah(total)}
                </p>
              </div>
            )}
          </div>

          <div
            className={`${
              isDarkMode ? "bg-[#232222]" : "bg-[#f6f6f6]"
            } w-full flex justify-center items-center p-4 mt-4 rounded-b-lg`}
          >
            <button
              className={`${
                isDarkMode
                  ? "bg-[#28a154] text-white"
                  : "bg-[#28a154] text-white"
              } cursor-pointer px-4 py-2 rounded-full text-xl md:text-2xl flex items-center gap-2`}
              onClick={handleSelesai}
            >
              <i className="bx bx-check-double "></i>
              Selesai
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCallback;
