import Swal from "sweetalert2";
import { useCheckout } from "../context/CheckoutContext";
import NavbarComponent from "../components/Navbar";
import { formatRupiah } from "../utils/formatCurrency";
import Btn from "../components/Btn";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import { db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useCheckout();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { clearCheckedOutItems } = useCart();

  // Ambil data user dari localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData?.uid; // UID user dari localStorage

  // Hitung total harga
  const totalHarga = selectedProducts.reduce(
    (total, item) => total + item.harga * item.quantity,
    0
  );

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

    try {
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

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140C00] text-[#FFFFFF]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-6 pt-24 sm:pt-28 w-full min-h-screen pb-20`}
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

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
              } p-3 rounded-lg flex items-center mt-4`}
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
          } p-3 rounded-lg flex mt-4 flex-col gap-2`}
        >
          Rincian Pembayaran
          <div className="flex justify-between">
            <p className="font-medium">Total BV didapat</p>
            <p className="font-semibold">{totalBV}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Subtotal untuk produk</p>
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
            className="bg-red-500 text-white px-4 py-2 font-semibold rounded w-1/2"
          >
            Batal
          </Btn>
          <Btn
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 font-semibold rounded w-1/2"
          >
            Bayar Sekarang
          </Btn>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
