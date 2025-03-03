import Swal from "sweetalert2";
import { useCheckout } from "../context/CheckoutContext";
import NavbarComponent from "../components/Navbar";
import { formatRupiah } from "../utils/formatCurrency";
import Btn from "../components/Btn";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import { auth, db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

interface ShippingMethod {
  name: string;
  price: number;
}

interface PaymentMethod {
  name: string;
  rekening: number;
}

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useCheckout();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { clearCheckedOutItems } = useCart();
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  // Untuk voucher
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

  // Untuk metode pengiriman
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

  // Untuk metode pembayaran
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payment_method"));
        const paymentData: PaymentMethod[] = querySnapshot.docs.map((doc) => ({
          name: doc.data().name as string,
          rekening: doc.data().rekening as number,
        }));

        setPaymentMethods(paymentData);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Untuk ambil data user dari localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setName(userData.name || "");
            setAlamat(userData.alamat || "");
            setNoHp(userData.no_hp || "");
          }
        } catch (error) {
          console.error("Error mengambil data user:", error);
        } finally {
          setLoading(false); // Pastikan loading dihentikan
        }
      } else {
        navigate("/login"); // Arahkan ke halaman login jika belum login
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, [navigate]);

  // Ambil data user dari localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData?.uid; // UID user dari localStorage

  // Hitung total harga
  const totalHarga =
    selectedProducts.reduce(
      (total, item) => total + item.harga * item.quantity,
      0
    ) *
      (1 - discount / 100) +
    (selectedMethod?.price || 0);

  // Untuk pilih metode pengiriman
  const handleSelectMethod = (method: ShippingMethod) => {
    setSelectedMethod(method);
  };

  // Untuk pilih metode pembayaran
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

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

    if (!selectedPaymentMethod) {
      Swal.fire("Error", "Pilih metode pembayaran!", "error");
      return;
    }

    try {
      // Simpan transaksi ke Firestore
      await addDoc(collection(db, "transactions"), {
        userId,
        items: selectedProducts,
        totalHarga,
        totalBV,
        shippingMethod: selectedMethod.name,
        shippingPrice: selectedMethod.price,
        status: "pending", // Status awal
        paymentMethod: selectedPaymentMethod.name,
        paymentRekening: selectedPaymentMethod.rekening,
        createdAt: serverTimestamp(), // Timestamp dari Firestore
      });

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const newBV = (userData.BV || 0) + totalBV;

        // Update BV di Firestore
        await updateDoc(userRef, { BV: newBV });

        // Hapus produk yang sudah dibayar dari cart di state dan localStorage
        clearCheckedOutItems(selectedProducts);

        // Hapus checkout dari local storage dan state
        localStorage.removeItem("selectedProducts");
        setSelectedProducts([]);

        // Tampilkan alert sukses
        Swal.fire({
          title: "Pembayaran Berhasil!",
          text: `Anda mendapatkan ${totalBV} BV.`,
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/"); // Redirect setelah pembayaran
      } else {
        Swal.fire("Error", "User tidak ditemukan!", "error");
      }
    } catch (error) {
      console.error("Error updating BV:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memproses pembayaran!",
        "error"
      );
    }
  };

  // Hapus checkout dari state & localStorage
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
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg`}
        >
          {/* Bagian atas: Nama dan Nomor HP */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{name}</h2>
              <p className="text-sm">({no_hp})</p>
            </div>
            <button
              onClick={() => navigate("/profile")} // Arahkan ke halaman edit alamat
              className={`py-2 px-4 rounded cursor-pointer text-3xl items-center justify-center ${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#959595]"
              }`}
            >
              <i className="bx bx-right-arrow-circle"></i>
            </button>
          </div>

          {/* Bagian bawah: Alamat */}
          <div className="space-y-2">
            <p className="text-sm">{alamat}</p>
          </div>
        </div>

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
          <div
            className={`${
              isDarkMode
                ? "bg-[#e1ffec] text-[#353535] border-1 border-[#28a154]"
                : "bg-[#e1ffec] text-[#353535] border-1 border-[#28a154]"
            } p-4 rounded-lg flex flex-col gap-2`}
          >
            {/* Bagian atas: Judul dan Harga */}
            <div className="flex justify-between items-center text-sm">
              <p className="font-bold">{selectedMethod?.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {formatRupiah(selectedMethod?.price || 0)}
                </p>
                <i className="bx bx-checkbox-checked text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex mt-4 flex-col gap-2`}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Metode Pembayaran</label>
            <select
              className={`${
                isDarkMode
                  ? "bg-[#404040] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#353535]"
              } p-2 border rounded-lg w-full`}
              onChange={(e) => {
                const method = paymentMethods.find(
                  (m) => m.name === e.target.value
                );
                if (method) handleSelectPaymentMethod(method);
              }}
            >
              <option value="">Pilih Metode Pembayaran</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method.name}>
                  {method.name} - {formatRupiah(method.rekening)}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`${
              isDarkMode
                ? "bg-[#e1ffec] text-[#353535] border-1 border-[#28a154]"
                : "bg-[#e1ffec] text-[#353535] border-1 border-[#28a154]"
            } p-4 rounded-lg flex flex-col gap-2`}
          >
            {/* Bagian atas: Judul dan Harga */}
            <div className="flex justify-between items-center text-sm">
              <p className="font-bold">{selectedPaymentMethod?.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{selectedPaymentMethod?.rekening}</p>
                <i className="bx bx-checkbox-checked text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex mt-4 flex-col gap-2`}
        >
          Rincian Pembayaran
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

      {/* Tombol Bayar & Batal di Bawah */}
      <div
        className={`${
          isDarkMode
            ? "bg-[#404040] text-[#FFFFFF]"
            : "bg-[#FFFFFF] text-[#353535]"
        } fixed bottom-0 left-0 w-full p-4 shadow-xl flex flex-col gap-2`}
      >
        {/* Total Harga */}
        <h2 className="text-lg font-semibold">
          Total: {formatRupiah(totalHarga)}
        </h2>

        {/* Tombol Batal & Bayar */}
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
