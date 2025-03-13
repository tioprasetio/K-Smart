import Swal from "sweetalert2";
import { useCheckout } from "../context/CheckoutContext";
import { formatRupiah } from "../utils/formatCurrency";
import Btn from "../components/Btn";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Impor useUser
import { db } from "../config/Firebase"; // Impor db dari Firebase config

interface ShippingMethod {
  name: string;
  price: number;
}

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useCheckout();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(
    null
  );

  const { user } = useUser(); // Ambil data user dari UserContext
  const userId = user?.uid; // UID user dari UserContext
  const userName = user?.name || ""; // Nama user dari UserContext
  const userAlamat = user?.alamat || ""; // Alamat user dari UserContext
  const userNoHp = user?.no_hp || ""; // Nomor HP user dari UserContext
  const userEmail = user?.email || ""; // Email user dari UserContext

  // Redirect ke cart jika tidak ada produk yang dipilih
  if (selectedProducts.length === 0) {
    navigate("/cart");
  }

  // Fungsi untuk menerapkan voucher
  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      Swal.fire("Error", "Masukkan kode voucher!", "error");
      return;
    }

    try {
      const voucherRef = doc(db, "vouchers", voucherCode);
      const voucherSnap = await getDoc(voucherRef);

      if (voucherSnap.exists()) {
        const voucherData = voucherSnap.data();
        if (voucherData.valid) {
          setDiscount(voucherData.discount);
          Swal.fire("Success", "Voucher berhasil digunakan!", "success");
        } else {
          Swal.fire("Error", "Voucher tidak valid!", "error");
        }
      } else {
        Swal.fire("Error", "Voucher tidak ditemukan!", "error");
      }
    } catch (error) {
      console.error("Error checking voucher:", error);
      Swal.fire("Error", "Terjadi kesalahan!", "error");
    }
  };

  // Ambil metode pengiriman dari Firestore
  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shipping_methods"));
        const shippingData: ShippingMethod[] = querySnapshot.docs.map(
          (doc) => ({
            name: doc.data().name as string,
            price: doc.data().price as number,
          })
        );

        setMethods(shippingData);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };

    fetchShippingMethods();
  }, []);

  // Set loading false jika user sudah ada
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      navigate("/login"); // Arahkan ke halaman login jika user tidak ada
    }
  }, [user, navigate]);

  // Hitung total harga
  const totalHarga =
    selectedProducts.reduce(
      (total, item) => total + item.harga * item.quantity,
      0
    ) *
      (1 - discount / 100) +
    (selectedMethod?.price || 0);

  // Fungsi untuk memilih metode pengiriman
  const handleSelectMethod = (method: ShippingMethod) => {
    setSelectedMethod(method);
  };

  // Hitung total BV
  const totalBV = selectedProducts.reduce(
    (total, item) => total + item.bv * item.quantity,
    0
  );

  // Fungsi untuk menangani pembayaran
  const handlePayment = async () => {
    if (!userId) {
      Swal.fire(
        "Error",
        "Anda harus login untuk melakukan pembayaran!",
        "error"
      );
      return;
    }

    if (!selectedMethod) {
      Swal.fire("Error", "Pilih metode pengiriman!", "error");
      return;
    }

    try {
      const orderId = `ORDER-${Date.now()}`;
      localStorage.setItem("order_id", orderId);

      // Kirim data ke backend untuk membuat transaksi Midtrans
      const response = await axios.post(
        "https://4577-202-57-1-106.ngrok-free.app/api/payment/create-transaction",
        {
          order_id: orderId,
          gross_amount: totalHarga,
          uid: userId,
          products: selectedProducts,
          totalBV, // Total BV
          customer_details: {
            first_name: userName, // Nama dari UserContext
            email: userEmail, // Email dari UserContext
            phone: userNoHp || "", // Nomor HP dari UserContext
          },
        }
      );

      // Redirect ke halaman pembayaran Midtrans
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error("Error saat memproses pembayaran:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memproses pembayaran!",
        "error"
      );
    }
  };

  // Fungsi untuk membatalkan checkout
  const handleCancelCheckout = () => {
    Swal.fire({
      title: "Batalkan Checkout?",
      text: "Apakah Anda yakin ingin membatalkan checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Batalkan",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("selectedProducts");
        setSelectedProducts([]);
        Swal.fire("Dibatalkan!", "Checkout telah dibatalkan.", "success");
        navigate("/cart");
      }
    });
  };

  // Agar user tidak bisa klik back di halaman checkout
  useEffect(() => {
    const handlePopState = () => {
      Swal.fire({
        title: "Batalkan Checkout?",
        text: "Apakah Anda yakin ingin membatalkan checkout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, Batalkan",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("selectedProducts");
          setSelectedProducts([]);
          Swal.fire("Dibatalkan!", "Checkout telah dibatalkan.", "success");
          navigate("/cart");
        } else {
          window.history.pushState(null, "", window.location.href);
        }
      });
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, setSelectedProducts]);

  // Tampilkan loading jika data belum siap
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
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          isDarkMode
            ? "bg-[#140C00] text-[#FFFFFF]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-6 mb-16 w-full min-h-screen pb-20`}
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Informasi Pengguna */}
        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{userName}</h2>
              <p className="text-sm">({userNoHp})</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className={`py-2 px-4 rounded cursor-pointer text-3xl items-center justify-center ${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#959595]"
              }`}
            >
              <i className="bx bx-right-arrow-circle"></i>
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm">{userAlamat}</p>
          </div>
        </div>

        {/* Daftar Produk */}
        {selectedProducts.length === 0 ? (
          <p>Tidak ada produk yang dipilih.</p>
        ) : (
          selectedProducts.map((item) => (
            <div
              key={item.id}
              className={`${
                isDarkMode
                  ? "bg-[#404040] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#353535]"
              } p-4 rounded-lg flex items-center mt-4`}
            >
              <img
                src={item.picture}
                alt={item.name}
                className="h-16 w-16 mr-2 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="font-semibold">{formatRupiah(item.harga)}</p>
                <p>Jumlah: {item.quantity}</p>
              </div>
            </div>
          ))
        )}

        {/* Voucher dan Metode Pengiriman */}
        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex mt-4 flex-col gap-2`}
        >
          <div className="flex justify-between items-center gap-2">
            <p className="font-medium">Voucher K-Smart</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Masukkan kode voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className={`${
                  isDarkMode
                    ? "bg-[#404040] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#353535]"
                } p-2 border rounded-lg w-30`}
              />
              <button
                onClick={handleApplyVoucher}
                className="bg-[#28a154] text-white p-2 rounded"
              >
                Gunakan
              </button>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Metode Pengiriman</label>
            <select
              className={`${
                isDarkMode
                  ? "bg-[#404040] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#353535]"
              } p-2 border rounded-lg w-full`}
              onChange={(e) => {
                const method = methods.find((m) => m.name === e.target.value);
                if (method) handleSelectMethod(method);
              }}
            >
              <option value="">Pilih Metode Pengiriman</option>
              {methods.map((method, index) => (
                <option key={index} value={method.name}>
                  {method.name} - {formatRupiah(method.price)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rincian Pembayaran */}
        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex mt-4 flex-col gap-2`}
        >
          <div className="flex justify-between">
            <p className="font-medium">Total BV didapat</p>
            <p className="font-medium">{totalBV}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Subtotal untuk produk</p>
            <p className="font-medium">{formatRupiah(totalHarga)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Subtotal pengiriman</p>
            <p className="font-medium">
              {formatRupiah(selectedMethod?.price || 0)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Voucher Diskon</p>
            <p className="font-medium">{discount}%</p>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-between">
            <p className="font-semibold">Total Pembayaran</p>
            <p className="font-semibold">{formatRupiah(totalHarga)}</p>
          </div>
        </div>
      </div>

      {/* Tombol Bayar & Batal */}
      <div
        className={`${
          isDarkMode
            ? "bg-[#404040] text-[#FFFFFF]"
            : "bg-[#FFFFFF] text-[#353535]"
        } fixed bottom-0 left-0 w-full p-4 shadow-xl flex flex-col gap-2`}
      >
        <h2 className="text-lg font-semibold">
          Total: {formatRupiah(totalHarga)}
        </h2>
        <div className="flex gap-2">
          <Btn
            onClick={handleCancelCheckout}
            className={`${
              isDarkMode
                ? "bg-[#cb2525] text-[#f0f0f0]"
                : "bg-[#cb2525] text-[#f0f0f0]"
            } px-4 py-2 font-semibold rounded w-1/2`}
          >
            Batal
          </Btn>
          <Btn
            onClick={handlePayment}
            className={`${
              isDarkMode
                ? "bg-[#28a154] text-[#f0f0f0]"
                : "bg-[#28a154] text-[#f0f0f0]"
            } px-4 py-2 font-semibold rounded w-1/2`}
          >
            Bayar Sekarang
          </Btn>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
