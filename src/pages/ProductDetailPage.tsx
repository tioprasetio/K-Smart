import { useNavigate, useLocation } from "react-router";
import NavbarComponent from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import { useDarkMode } from "../context/DarkMode";
import PromoProduct from "../components/PromoProduct";
import { useState } from "react";
import Btn from "../components/Btn";
import { formatRupiah } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import { useCheckout } from "../context/CheckoutContext";
import { useUser } from "../context/UserContext";

const ProductDetailPage = () => {
  // const params = useParams<{ productSlug: string }>();
  const { user } = useUser();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { setSelectedProducts } = useCheckout();

  const product = location.state;

  // State untuk kuantitas produk
  const [quantity, setQuantity] = useState(1);

  // Fungsi untuk menambah kuantitas
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Fungsi untuk mengurangi kuantitas
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        title: "Oops...",
        text: "Anda harus login terlebih dahulu!",
        icon: "error",
      });
      navigate("/login");
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        picture: product.picture,
        harga: product.harga,
        quantity: quantity,
        bv: product.bv,
      };

      addToCart(productToAdd);
      Swal.fire({
        title: "Berhasil!",
        text: "Produk telah ditambahkan ke keranjang!",
        icon: "success",
        showConfirmButton: false, // Supaya langsung otomatis hilang
        timer: 1500, // Hilang dalam 1,5 detik
      }).then(() => {
        navigate("/cart"); // Pindah ke halaman cart setelah alert selesai
      });
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      Swal.fire({
        title: "Oops...",
        text: "Anda harus login terlebih dahulu!",
        icon: "error",
      });
      navigate("/login");
    } else {
      const productToCheckout = {
        id: product.id,
        name: product.name,
        picture: product.picture,
        harga: product.harga,
        quantity: quantity,
        bv: product.bv,
      };

      // Tambahkan produk ke selectedProducts di konteks checkout
      setSelectedProducts([productToCheckout]);
      navigate("/checkout");
    }
  };

  return (
    <>
      <NavbarComponent />
      {product ? (
        <>
          <div
            className={`${
              isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
            } p-6 pt-24 sm:pt-28 pb-24 sm:pb-28 w-full min-h-screen`}
          >
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 xl:gap-4 md:pt-5">
                {/* <!-- Gambar Produk --> */}
                <div className="flex flex-col">
                  <section className="bg-[#ffffff] rounded-lg p-4 mb-3 xl:mb-4">
                    <div className="swiper thumbnailSwiper">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          {/* <!-- Gambar Produk --> */}
                          <img
                            src={product.picture}
                            alt="Produk"
                            className="w-full object-cover"
                          />
                        </div>
                        <div className="swiper-slide">
                          {/* <!-- Gambar Produk --> */}
                          <img
                            src="https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202209/08-rp23v1--K-OMEGA_SQUA_PLUS.jpg"
                            alt="Produk"
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
                  </section>

                  <div className="hidden md:block">
                    <section
                      className={`${
                        isDarkMode
                          ? "bg-[#303030] text-[#f0f0f0]"
                          : "bg-[#ffffff] text-[#353535]"
                      } rounded-lg p-4 mb-3 xl:mb-4`}
                    >
                      <div className="p6">Informasi Produk</div>
                      <hr className="mt-4 border-t border-gray-300" />
                      <div className="flex items-center justify-between pt-4">
                        <div>BV</div>
                        <div>{product.bv} gr</div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>Berat Pengiriman</div>
                        <div>{product.beratPengiriman} gr</div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>Berat Bersih Satuan</div>
                        <div>{product.beratBersih} ml</div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>Pemesanan Minimal</div>
                        <div>{product.pemesananMin} pcs</div>
                      </div>
                    </section>

                    <section
                      className={`${
                        isDarkMode
                          ? "bg-[#303030] text-[#f0f0f0]"
                          : "bg-[#ffffff] text-[#353535]"
                      } rounded-lg p-6 mb-3 xl:mb-4`}
                    >
                      <h2 className="h3 pb-2">Jaminan Mutu</h2>
                      <div className="pt-4 flex items-center">
                        <i className="text-xl bx bx-check-circle text-[#28a154]"></i>
                        <div>100% Produk Original</div>
                        <button
                          type="button"
                          className="ml-auto text-xl text-primary"
                        >
                          <i className="text-xl bx bx-info-circle text-[#28a154]"></i>
                        </button>
                      </div>
                    </section>
                    <div
                      className={`${
                        isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                      } fixed gap-4 bottom-0 left-0 w-full p-4 shadow-2xl flex justify-between items-center z-50`}
                    >
                      <Btn
                        className="flex-1"
                        variant="outline"
                        onClick={handleAddToCart}
                      >
                        <i className="bx bx-cart-add text-lg"></i> Keranjang
                      </Btn>
                      <Btn className="flex-1" onClick={handleBuyNow}>
                        Beli Sekarang
                        <i className="bx bx-right-arrow-alt text-lg"></i>
                      </Btn>
                    </div>
                  </div>
                </div>

                {/* <!-- Judul --> */}
                <section className="rounded-lg">
                  <div className="flex flex-col">
                    <section
                      className={`${
                        isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                      } p-6 mb-3 xl:mb-4 rounded-lg`}
                    >
                      {/* <!-- Judul Produk, rating, dan jumlah penjualan --> */}
                      <h1
                        className={`${
                          isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                        } text-2xl font-semibold mb-2`}
                      >
                        {product.name}
                      </h1>
                      <div className="flex flex-row items-center">
                        <span className="text-[#959595] text-lg">
                          <i className="bx bxs-star text-lg text-[#FFD52DFF]"></i>
                          {product.rate}
                        </span>
                        <span className="text-[#959595] text-lg px-1">|</span>
                        <span className="text-[#959595] text-lg">
                          Terjual {product.terjual}
                        </span>
                      </div>

                      {/* <!-- Harga produk --> */}
                      <div className="flex flex-row items-center mt-10">
                        <h1
                          className={`${
                            isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                          } text-3xl font-bold`}
                        >
                          {formatRupiah(product.harga)}
                        </h1>
                        <span
                          className={`${
                            isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                          } text-xl font-medium`}
                        >
                          &nbsp;/ pcs
                        </span>
                      </div>

                      {/* <!-- Harga berdasarkan wilayah --> */}
                      {/* <div className="flex flex-col mt-10">
                          <h3 className="text-[#353535] text-sm font-bold">
                            Harga berdasarkan Wilayah
                          </h3>
                          <div className="flex flex-row gap-4">
                            <button className="flex items-center justify-center cursor-pointer my-2 px-4 py-1 rounded-full bg-[linear-gradient(to_right,#4ca54c,#76c345)] text-white">
                              <span className="text-xs font-medium">
                                Harga Wilayah A
                              </span>
                            </button>
                            <button className="flex items-center justify-center cursor-pointer my-2 px-4 py-1 rounded-full bg-[linear-gradient(to_right,#4ca54c,#76c345)] text-white">
                              <span className="text-xs font-medium">
                                Harga Wilayah A
                              </span>
                            </button>
                          </div>
                        </div> */}

                      {/* <hr className="mt-4 border-t border-gray-300" /> */}

                      {/* <!-- Kuantitas Produk --> */}
                      <div className="flex items-center justify-between pt-4">
                        <h3
                          className={`${
                            isDarkMode ? "text-[#F0F0F0]" : "text-[#353535]"
                          } text-lg font-semibold `}
                        >
                          Kuantitas
                        </h3>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={decreaseQuantity} // Tambahkan fungsi
                            className={`focus:outline-none cursor-pointer text-gray-400 ${
                              quantity === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={quantity === 1}
                          >
                            <i className="bx bx-minus-circle text-2xl"></i>
                          </button>
                          <input
                            type="text"
                            className={`${
                              isDarkMode
                                ? "text-[#F0F0F0] bg-[#303030]"
                                : "text-[#353535] bg-[#ffffff]"
                            } text-base font-semibold text-center focus:outline-none w-14 border-none`}
                            name="quantity"
                            id="quantity"
                            value={quantity} // Gunakan state quantity
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={increaseQuantity} // Tambahkan fungsi
                            className="focus:outline-none cursor-pointer"
                          >
                            <i className="bx bx-plus-circle text-2xl text-gray-400"></i>
                          </button>
                        </div>
                      </div>

                      {/* <!-- Muncul jika produk termasuk bundle --> */}
                      <hr className="mt-4 border-t border-gray-300" />
                      <h3
                        className={`${
                          isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                        } mt-4 text-lg font-semibold`}
                      >
                        Isi Produk:
                      </h3>
                      <div
                        className={`${
                          isDarkMode
                            ? "bg-[#404040] text-[#f0f0f0]"
                            : "bg-[#f4f6f9] text-[#353535]"
                        } p-3 rounded-lg flex rounded-t-lg mt-4 rounded-b-lg`}
                      >
                        <a className="inline-block" href="">
                          <img
                            src={product.picture}
                            alt={product.picture}
                            className="h-16 w-16 mr-2 object-cover"
                          />
                        </a>
                        <div
                          className={`${
                            isDarkMode ? "text-[#F0F0F0]" : "text-[#353535]"
                          } flex-1`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <a className="inline-block" href="">
                                {product.name}
                              </a>
                              <a className="inline-block font-semibold" href="">
                                {formatRupiah(product.harga * quantity)}
                              </a>
                            </div>
                            <div className="text-xxs pl-2">x{quantity}</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="mt-4 mb-0 xl:mb-4 relative">
                      <div
                        className={`${
                          isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                        } p-6 md:px-0 font-bold text-lg leading-9`}
                      >
                        Promo Tersedia untuk Produk ini
                      </div>

                      <PromoProduct />

                      <div className="p-6">
                        {/* Chatbot AI */}
                        <Chatbot
                          productName={product.name}
                          productDescription={product.deskripsi}
                          productHarga={product.harga}
                        />
                      </div>
                    </section>

                    {/* <!-- Informasi produk dan jaminan mutu mobile version --> */}
                    <div className="mt-4 md:hidden">
                      <section
                        className={`${
                          isDarkMode
                            ? "bg-[#303030] text-[#f0f0f0]"
                            : "bg-[#ffffff] text-[#353535]"
                        } rounded-lg p-4 mb-3 xl:mb-4`}
                      >
                        <div className="p6">Informasi Produk</div>
                        <hr className="mt-4 border-t border-gray-300" />
                        <div className="flex items-center justify-between pt-4">
                          <div>BV</div>
                          <div>{product.bv} BV</div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <div>Berat Pengiriman</div>
                          <div>{product.beratPengiriman} gr</div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <div>Berat Bersih Satuan</div>
                          <div>{product.beratBersih} ml</div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <div>Pemesanan minimal</div>
                          <div>{product.pemesananMin} pcs</div>
                        </div>
                      </section>

                      <section
                        className={`${
                          isDarkMode
                            ? "bg-[#303030] text-[#f0f0f0]"
                            : "bg-[#ffffff] text-[#353535]"
                        } rounded-lg p-6 mb-3 xl:mb-4`}
                      >
                        <h2 className="h3 pb-2">Jaminan Mutu</h2>
                        <div className="pt-4 flex items-center">
                          <i className="text-xl bx bx-check-circle text-[#28a154]"></i>
                          <div>100% Produk Original</div>
                          <button
                            type="button"
                            className="ml-auto text-xl text-primary"
                          >
                            <i className="text-xl bx bx-info-circle text-[#28a154]"></i>
                          </button>
                        </div>
                      </section>
                      <div
                        className={`${
                          isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                        } fixed gap-4 bottom-0 left-0 w-full p-4 shadow-2xl flex justify-between items-center z-50`}
                      >
                        <Btn
                          className="flex-1"
                          variant="outline"
                          onClick={handleAddToCart}
                        >
                          <i className="bx bx-cart-add text-lg"></i> Keranjang
                        </Btn>
                        <Btn className="flex-1" onClick={handleBuyNow}>
                          Beli Sekarang
                          <i className="bx bx-right-arrow-alt text-lg"></i>
                        </Btn>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Maaf, Produk tidak ditemukan.</p>
      )}
    </>
  );
};

export default ProductDetailPage;
