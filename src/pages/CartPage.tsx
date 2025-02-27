import { useState } from "react";
import { useCart } from "../context/CartContext";
import NavbarComponent from "../components/Navbar";
import { formatRupiah } from "../utils/formatCurrency";
import { useDarkMode } from "../context/DarkMode";
import Btn from "../components/Btn";
import Swal from "sweetalert2";

const CartPage = () => {
  const { isDarkMode } = useDarkMode();
  const { cart, setCart, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Simpan item yang dicentang

  // Fungsi untuk toggle checkbox
  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); // Uncheck semua
    } else {
      setSelectedItems(cart.map((item) => item.id)); // Pilih semua
    }
  };

  // Fungsi untuk mengurangi quantity
  const decreaseQuantity = (id: number) => {
    const updatedCart = cart.find((item) => item.id === id);

    if (updatedCart && updatedCart.quantity === 1) {
      Swal.fire({
        title: "Hapus Produk?",
        text: "Ingin menghapus produk dari keranjang?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          removeFromCart(id);
          Swal.fire(
            "Dihapus!",
            "Produk telah dihapus dari keranjang.",
            "success"
          );
        }
      });
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Fungsi untuk menambah quantity
  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hitung total harga dari item yang dipilih
  const totalHarga = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.harga * item.quantity, 0);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140c00] text-[#f0f0f0]"
            : "bg-[#f0f0f0] text-[#353535]"
        } p-6 pt-24 sm:pt-28 w-full min-h-screen`}
      >
        <h1 className="text-2xl font-bold mb-4">
          Keranjang Saya {totalItems > 0 ? `(${totalItems})` : ""}
        </h1>

        {cart.length === 0 ? (
          <p>Keranjang masih kosong.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className={`${
                isDarkMode
                  ? "bg-[#404040] text-[#f0f0f0]"
                  : "bg-[#FFFFFF] text-[#353535]"
              } p-3 rounded-lg flex items-center mt-4`}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="mr-3"
              />
              <a className="inline-block" href="#">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="h-16 w-16 mr-2 object-cover rounded-md"
                />
              </a>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <a
                      className="inline-block font-medium w-32 truncate"
                      href="#"
                    >
                      {item.name}
                    </a>
                    <a className="inline-block font-semibold" href="#">
                      {formatRupiah(item.harga * item.quantity)}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-400 dark:text-gray-300"
                    >
                      <i className="bx bx-minus-circle text-2xl"></i>
                    </button>
                    <span className="text-base font-semibold text-center w-6">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-400 dark:text-gray-300"
                    >
                      <i className="bx bx-plus-circle text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Tombol Checkout */}
        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#f0f0f0]"
              : "bg-[#FFFFFF] text-[#353535]"
          } fixed bottom-0 left-0 w-full p-4 shadow-xl flex flex-col gap-2`}
        >
          {/* Bagian Atas: Checkbox Pilih Semua & Total Harga */}
          <div className="flex justify-between items-center">
            {/* Checkbox Pilih Semua */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5 cursor-pointer"
                checked={
                  selectedItems.length === cart.length && cart.length > 0
                }
                onChange={toggleSelectAll}
              />
              <p className="text-sm font-medium">Semua</p>
            </div>

            {/* Total Harga */}
            <h2 className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"} text-lg font-semibold`}>
              Total: {formatRupiah(totalHarga)}
            </h2>
          </div>

          {/* Tombol Checkout di Bawah */}
          <Btn
            className="px-4 py-2 font-semibold rounded w-full"
            disabled={selectedItems.length === 0}
          >
            Checkout ({selectedItems.length})
          </Btn>
        </div>
      </div>
    </>
  );
};

export default CartPage;
