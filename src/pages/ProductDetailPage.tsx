import { useLocation } from "react-router";
import NavbarComponent from "../components/Navbar";
import Chatbot from "../components/Chatbot";

const ProductDetailPage = () => {
  // const params = useParams<{ productSlug: string }>();
  const location = useLocation();

  const product = location.state;
  return (
    <>
      <NavbarComponent />
      {product ? (
        <>
          <div className="bg-[#f4f6f9] p-6 pt-24 sm:pt-28 w-full min-h-screen">
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
                    <section className="bg-[#fff] rounded-lg p-4 mb-3 xl:mb-4">
                      <div className="text-[#353535]p6">Informasi Produk</div>
                      <hr className="mt-4 border-t border-gray-300" />
                      <div className="text-[#353535] flex items-center justify-between pt-4">
                        <div>Berat Pengiriman</div>
                        <div>{product.beratPengiriman} gr</div>
                      </div>
                      <div className="text-[#353535] flex items-center justify-between pt-4">
                        <div>Berat Bersih Satuan</div>
                        <div>{product.beratBersih} ml</div>
                      </div>
                      <div className="text-[#353535] flex items-center justify-between pt-4">
                        <div>Pemesanan Minimal</div>
                        <div>{product.pemesananMin} pcs</div>
                      </div>
                    </section>

                    <section className="bg-white p-6 mb-3 xl:mb-4">
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
                  </div>
                </div>

                {/* <!-- Judul --> */}
                <section className="rounded-lg">
                  <div className="flex flex-col">
                    <section className="bg-[#ffffff] p-6 mb-3 xl:mb-4">
                      {/* <!-- Judul Produk, rating, dan jumlah penjualan --> */}
                      <h1 className="text-2xl font-semibold mb-2 text-[#353535]">
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
                        <h1 className="text-[#353535] text-3xl font-bold">
                          Rp{product.harga?.toLocaleString()}
                        </h1>
                        <span className="text-[#353535] text-xl font-medium">
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
                      {/* <div className="flex items-center justify-between pt-4">
                          <h3 className="text-lg font-semibold text-[#353535]">
                            Kuantitas
                          </h3>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              id="decrease"
                              className="focus:outline-none cursor-pointer text-gray-400"
                              disabled
                            >
                              <i className="bx bx-minus-circle text-2xl"></i>
                            </button>
                            <input
                              type="text"
                              className="text-base font-semibold border-b border-gray-400 text-center focus:outline-none w-14"
                              name="quantity"
                              id="quantity"
                              value="1"
                              readOnly
                            />
                            <button
                              type="button"
                              id="increase"
                              className="focus:outline-none cursor-pointer"
                            >
                              <i className="bx bx-plus-circle text-2xl text-gray-700"></i>
                            </button>
                          </div>
                        </div> */}

                      {/* <!-- Muncul jika produk termasuk bundle --> */}
                      <hr className="mt-4 border-t border-gray-300" />
                      <h3 className="mt-4 text-lg font-semibold text-[#353535]">
                        Isi Produk:
                      </h3>
                      <div className="p-3 rounded-lg bg-[#f4f6f9] flex rounded-t-lg mt-4 rounded-b-lg">
                        <a className="inline-block" href="">
                          <img
                            src={product.picture}
                            alt="K-Omega Squa"
                            className="h-16 w-16 mr-2 object-cover"
                          />
                        </a>
                        <div className="flex-1">
                          <div className="flex">
                            <div className="flex-1">
                              <a className="inline-block" href="">
                                {product.name}
                              </a>
                            </div>
                            {/* <div className="text-xxs text-neutral-1 pl-1">
                              x4
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="bg-[#f4f6f9] -mt-4 mb-0 xl:mb-4 relative">
                      <div className="p-6 md:px-0 font-bold text-lg text-black leading-9">
                        Promo Tersedia untuk Produk ini
                      </div>

                      {/* <!-- Swiper Container --> */}
                      <div className="swiper promoSwiper">
                        <div className="swiper-wrapper">
                          {/* <!-- Slide 1 --> */}
                          <div className="swiper-slide">
                            <div className="p-3 rounded-lg bg-[#ffffff] flex gap-4">
                              <a
                                className="flex justify-center items-center"
                                href=""
                              >
                                <img
                                  src="https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202402/07-jcldk2--46__DISKON_10_.jpg"
                                  alt="K-Omega Squa"
                                  className="h-10 w-full object-cover"
                                />
                              </a>
                              <div className="flex-1">
                                <div className="flex flex-col gap-2">
                                  <div className="flex-1 text-[#353535] font-bold text-md">
                                    <a className="inline-block" href="">
                                      Promo Diskon 10% Pembelanjaan Customer
                                    </a>
                                  </div>
                                  <div className="text-[#959595] text-xs text-neutral-1 pl-1">
                                    <i className="bx bx-calendar"></i> Hingga
                                    December 31, 2025
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Slide 2 --> */}
                          <div className="swiper-slide">
                            <div className="p-3 rounded-lg bg-[#ffffff] flex gap-4">
                              <a
                                className="flex justify-center items-center"
                                href=""
                              >
                                <img
                                  src="https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202402/07-jcldk2--46__DISKON_10_.jpg"
                                  alt="K-Omega Squa"
                                  className="h-10 w-full object-cover"
                                />
                              </a>
                              <div className="flex-1">
                                <div className="flex flex-col gap-2">
                                  <div className="flex-1 text-[#353535] font-bold text-md">
                                    <a className="inline-block" href="">
                                      Promo Diskon 10% Pembelanjaan Customer
                                    </a>
                                  </div>
                                  <div className="text-[#959595] text-xs text-neutral-1 pl-1">
                                    <i className="bx bx-calendar"></i> Hingga
                                    December 31, 2025
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                      <section className="bg-[#fff] rounded-lg p-4 mb-3 xl:mb-4">
                        <div className="text-[#353535]p6">Informasi Produk</div>
                        <hr className="mt-4 border-t border-gray-300" />
                        <div className="text-[#353535] flex items-center justify-between pt-4">
                          <div>Berat Pengiriman</div>
                          <div>{product.beratPengiriman} gr</div>
                        </div>
                        <div className="text-[#353535] flex items-center justify-between pt-4">
                          <div>Berat Bersih Satuan</div>
                          <div>{product.beratBersih} ml</div>
                        </div>
                        <div className="text-[#353535] flex items-center justify-between pt-4">
                          <div>Pemesanan minimal</div>
                          <div>{product.pemesananMin} pcs</div>
                        </div>
                      </section>

                      <section className="bg-white p-6 mb-3 xl:mb-4">
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
