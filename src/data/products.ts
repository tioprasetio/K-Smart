export type Product = {
  name: string;
  picture: string;
  harga: number;
  rate: string;
  terjual: number;
  beratPengiriman: number;
  beratBersih: number;
  pemesananMin: number;
  deskripsi: string;
  category: string;
  bv: number;
  id: number;
};

// export const BEST_SELLERS: Product[] = [
//   {
//     // Kalo name cuma dihapus isinya seperti ("") tidak akan unknown karena terbaca string kosong
//     name: "k-ion nano premium x", // Bagian ini dihapus baru akan muncul Unknown, tapi akan merah error
//     picture:
//       "https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202408/09-2bnxoc--K-Ion_Nano_Premium_X.jpg",
//     harga: 1440000,
//     rate: "4.9",
//     terjual: 1148,
//     beratPengiriman: 150,
//     beratBersih: 30,
//     pemesananMin: 1,
//     category: "Health Accessories",
//     deskripsi:
//       "K-Ion Nano Premium X adalah kacamata kesehatan nan stylish dengan desain paling modern dari seri K-Ion Nano. Dibingkai dengan frame hitam elegan berbahan TR90 ultra-light yang fleksibel, kokoh, dan nyaman dipakai, kacamata ini tidak hanya mengundang perhatian tetapi juga menjadi perlindungan kesehatan mata yang bisa Anda gunakan dalam berbagai momen tanpa mengorbankan gaya. K-Ion Nano Premium X tidak hanya menambah kesan sophisticated pada penampilan harian Anda, tetapi juga dilengkapi dengan lensa canggih yang memiliki kemampuan anti-sinar biru dan anti-ultraviolet. Kedua fitur ini bekerja efektif untuk memblokir dan melindungi mata dari efek negatif radiasi sinar biru dan UV, menjaga kesehatan mata Anda sepanjang hari.",
//     id: 1,
//   },
//   {
//     name: "ncell - botanical beverage mix grape with brocoli extract",
//     picture: "https://k-net.co.id/assets/images/products/thumb/NCell.jpg",
//     harga: 1440000,
//     rate: "4.9",
//     terjual: 1348,
//     beratPengiriman: 151,
//     beratBersih: 31,
//     pemesananMin: 2,
//     category: "Health Drink",
//     deskripsi:
//       " NCell adalah nutrisi inovatif yang diformulasikan khusus untuk menjaga kesehatan tubuh dengan kombinasi sempurna dari Stem Cell Apel varian Switzerland Uttwiler Spätlauber, Stem Cell Anggur, Ekstrak Brokoli, dan Vitamin E, di mana ekstrak brokoli membantu meningkatkan metabolisme NAD+ untuk menghambat penuaan sel, ekstrak stem cell apel berperan dalam memperpanjang usia sel serta melindunginya dari kerusakan, sementara ekstrak anggur yang kaya antioksidan membantu melawan radikal bebas dan memperlambat penuaan sel, menjadikan NCell pilihan terbaik untuk membantu mencegah penuaan dini, menjaga kesehatan sel-sel tubuh, meningkatkan metabolisme, melindungi kulit dari kerusakan akibat sinar matahari, meningkatkan sistem imun, serta memelihara daya tahan tubuh dengan formulasi yang telah teruji dan terdaftar di BPOM RI ML 070982000100801, tersedia dalam kemasan 1 box isi 10 sachet (1 g/sachet) untuk mendukung kesehatan sel tubuh Anda setiap hari.",
//     id: 2,
//   },
//   {
//     name: "K-Liquid Chlorophyll (500Ml)",
//     picture:
//       "https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202209/06-5u6i15--K-LIQUID_CHLOROPHYLL.jpg",
//     harga: 210000,
//     rate: "4.9",
//     terjual: 11483,
//     beratPengiriman: 152,
//     beratBersih: 32,
//     pemesananMin: 1,
//     category: "Health Drink",
//     deskripsi:
//       "K-Liquid Chlorophyll adalah minuman kesehatan berbahan utama daun Alfalfa (Medicago sativa), yang dikenal sebagai Bapak dari Semua Makanan karena kandungan nutrisinya yang tinggi. Dengan teknologi ekstraksi modern, sari klorofil diekstrak dari daun Alfalfa untuk menghasilkan minuman bernutrisi yang membantu menyeimbangkan kadar asam dan alkali dalam tubuh, meningkatkan daya serap nutrisi dan energi, serta menjaga kesehatan secara menyeluruh. Mengandung sari daun Alfalfa dan air UIE (Universe Induced Energy), K-Liquid Chlorophyll dapat dikonsumsi dengan cara melarutkan 1 sloki dalam segelas air putih untuk orang dewasa, sementara anak-anak di bawah 12 tahun cukup dengan 1/2 sloki, dan ibu hamil disarankan mengonsumsi 1×1 sloki per hari sebelum makan atau saat perut kosong. Setiap botol berisi 500ml ekstrak klorofil dan telah terdaftar dengan No. Registrasi POM SI. 024 603 051. Dapatkan sekarang melalui www.k-net.co.id untuk mendukung kesehatan tubuh Anda setiap hari.",
//     id: 3,
//   },
//   {
//     name: "K-Omega Squa",
//     picture:
//       "https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202209/08-rp23v1--K-OMEGA_SQUA_PLUS.jpg",
//     harga: 285000,
//     rate: "4.9",
//     terjual: 7253,
//     beratPengiriman: 153,
//     beratBersih: 33,
//     pemesananMin: 1,
//     category: "Health Drink",
//     deskripsi:
//       "Produk ini mengandung Omega 3, Squalene, Vitamin D3, dan Vitamin E, yang diformulasikan untuk mendukung kesehatan tubuh secara optimal. Omega 3, dengan kombinasi DHA dan EPA berkadar tinggi 900 mg, diekstrak dari ikan salmon perairan dalam Norwegia, yang berperan penting dalam menjaga fungsi tubuh serta melindungi dari risiko penyakit jantung dan stroke. Squalene, yang berasal dari ikan hiu Aizame, membantu meningkatkan suplai oksigen dalam tubuh. Vitamin D3 berperan dalam membantu penyerapan kalsium dan fosfor, yang penting untuk memelihara kekuatan tulang, serta bermanfaat bagi penderita gangguan ginjal untuk menjaga kadar kalsium tetap normal. Vitamin E berfungsi sebagai antioksidan untuk melindungi sel dari kerusakan akibat radikal bebas, meningkatkan sistem imun, serta menurunkan risiko penyakit jantung. Setiap kapsul lunak 1000 mg mengandung Omega 3 (EPA 40% & DHA 30%) 900 mg, Squalene 100 mg, Vitamin D3 400 IU, dan Vitamin E alami 3 IU. Dikonsumsi 2 kali sehari, 1-2 kapsul sebelum makan, dan tersedia dalam kemasan 1 botol berisi 30 kapsul lunak @ 1000 mg dengan No. Registrasi POM SD. 101 339 231 untuk menjaga kesehatan tubuh Anda setiap hari.",
//     id: 4,
//   },
// ];

// export const NEW_PRODUCTS: Product[] = [
//   {
//     // Kalo name cuma dihapus isinya seperti ("") tidak akan unknown karena terbaca string kosong
//     name: "Beujell", // Bagian ini dihapus baru akan muncul Unknown, tapi akan merah error
//     picture:
//       "https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202403/04-dwiv3p--Beujell.jpg",
//     harga: 582000,
//     rate: "5",
//     terjual: 1031,
//     beratPengiriman: 154,
//     beratBersih: 34,
//     pemesananMin: 1,
//     category: "Health Drink",
//     deskripsi:
//       "Collagen Jelly adalah camilan jelly dengan kandungan Fish Collagen, Pureway C, L-Glutathione, Inulin, dan Mix Berry Extract, yang diformulasikan untuk mendukung kesehatan dan kecantikan kulit. Mengandung 500mg Fish Collagen, sumber terbaik kolagen tipe I yang membentuk 80% struktur kulit, bekerja sama dengan elastin untuk menjaga kulit tetap kenyal dan kencang. Diperkaya dengan 250mg L-Glutathione, antioksidan kuat yang melindungi kulit dari kerusakan akibat radikal bebas, serta 100mg Pureway C, vitamin C generasi terbaru yang membantu mencerahkan kulit, memiliki daya serap tinggi, dan aman bagi lambung. Inulin, yang diekstrak dari akar chicory, berfungsi sebagai prebiotik untuk mendukung pertumbuhan bakteri baik, meningkatkan kekebalan tubuh, dan membantu penyerapan nutrisi secara optimal. Mix Berry Extract memberikan nutrisi tambahan untuk menjaga kulit tetap halus, bercahaya, serta memperbaiki kerusakan akibat paparan sinar UV. Dikonsumsi sesuai kebutuhan usia: 1 sachet/hari untuk usia 20 tahun, 1-2 sachet/hari untuk usia 30 tahun, dan 2 sachet/hari untuk usia 40 tahun ke atas. Tersedia dalam kemasan siap konsumsi, 1 box berisi 15 sachet @ 20g/sachet, serta telah terdaftar dengan No. BPOM RI MD 272827002200050 untuk memastikan keamanan dan kualitasnya.",
//     id: 5,
//   },
//   {
//     name: "Filter Nexlife Alkaline Water",
//     picture:
//       "https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202409/03-kkcunj--NEFLIFE_FILTER.jpg",
//     harga: 930000,
//     rate: "4.9",
//     terjual: 1000,
//     beratPengiriman: 155,
//     beratBersih: 35,
//     pemesananMin: 1,
//     category: "Health Drink",
//     deskripsi:
//       "Nexlife adalah alat filtrasi air yang dapat memurnikan air minum menjadi air alkali yang kaya mineral seperti Vanadium, Kalsium, Zinc, dan Tembaga, sehingga Anda dapat menikmati air alkali berkualitas tanpa perlu membeli air alkali komersial. Dirancang oleh Dr. Walter Kim, Ph.D., seorang ahli medis yang meneliti manfaat air untuk kesehatan manusia, Nexlife memberikan pengalaman hidup yang lebih sehat dan murni. Air Alkali memiliki pH tinggi (basa) serta mengandung mineral alkali yang bermanfaat bagi tubuh, seperti yang dibuktikan dalam studi tahun 2012 berjudul “Potential Benefits of pH 8.8 Alkaline Drinking Water as an Adjunct in the Treatment of Reflux Disease”, di mana air alkali dengan pH 8.8 dapat membantu menonaktifkan pepsin, enzim utama penyebab refluks asam. Beberapa manfaat utama air alkali meliputi membersihkan usus besar, meningkatkan sistem kekebalan tubuh, membantu menurunkan berat badan, menjaga kadar pH tubuh, menyediakan kalsium untuk mencegah osteoporosis, membuang limbah asam, serta menyediakan mineral penting bagi tubuh. Saat menggunakan Nexlife, beberapa mineral penting yang dihasilkan antara lain Vanadium, yang sedang diteliti karena potensinya dalam mengelola diabetes dan kanker, Kalsium, yang tidak hanya baik untuk tulang tetapi juga membantu mengontrol berat badan, menyeimbangkan enzim tubuh, serta menurunkan hipertensi, Zinc, yang berperan dalam memperkuat daya tahan tubuh, meningkatkan hormon testosteron, meredakan peradangan, dan mempercepat penyembuhan luka, serta Tembaga, yang merangsang pembentukan kolagen, mengurangi osteoporosis, serta menjaga kesehatan jantung dan saraf. Dengan spesifikasi berupa daya USB C-type, kecepatan aliran 0.5 LPM, masa pakai hingga 700 liter, serta material berkualitas ABS, PP, dan AS, Nexlife memiliki kapasitas penyimpanan 2.8 liter, tidak memerlukan instalasi, mudah digunakan, higienis, memiliki kemampuan penyaringan yang luar biasa, dapat digunakan outdoor, serta tersedia dengan harga yang terjangkau.",
//     id: 6,
//   },
// ];

// export const getProductsByCategory = (category: string): Product[] => {
//   return [...BEST_SELLERS, ...NEW_PRODUCTS].filter(
//     (product) => product.category === category
//   );
// };

// export const ALL_PRODUCTS: Product[] = [...BEST_SELLERS, ...NEW_PRODUCTS];