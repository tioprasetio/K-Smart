// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ALL_PRODUCTS, Product } from "../data/products";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<Product[]>([]);
//   const navigate = useNavigate();

//   const generateSlug = (name: string) =>
//     name.toLowerCase().replace(/\s+/g, "-");

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.length > 0) {
//       const filteredProducts = ALL_PRODUCTS.filter((product) =>
//         product.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filteredProducts);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (query.trim().length > 0) {
//       navigate(`/products?keyword=${encodeURIComponent(query.trim())}`);
//     }
//   };



//   const handleSuggestionClick = (product: Product) => {
//     navigate(`/product/${generateSlug(product.name)}`, { state: product });
//     setQuery("");
//     setSuggestions([]);
//   };

//   return (
//     <div className="relative">
//       <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
//         <label
//           htmlFor="default-search"
//           className="mb-2 text-sm font-medium text-gray-900 sr-only"
//         >
//           Search
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg
//               className="w-4 h-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//           </div>
//           <input
//             type="search"
//             id="default-search"
//             className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#28a154] focus:border-[#28a154]"
//             placeholder="Cari produk"
//             value={query}
//             onChange={handleSearch}
//             required
//           />
//           <button
//             type="submit"
//             className="text-white cursor-pointer absolute end-2.5 bottom-2.5 bg-[#28a154] hover:bg-[#167e3c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2"
//           >
//             Cari
//           </button>
//         </div>
//       </form>

//       {/* <form onSubmit={handleSearchSubmit} className="flex">
//         <input
//           type="text"
//           placeholder="Cari produk..."
//           value={query}
//           onChange={handleSearch}
//           className="border p-2 w-32 rounded-l-md"
//         />
//         <button
//           type="submit"
//           className="bg-[#28a154] text-white px-4 rounded-r-md"
//         >
//           Cari
//         </button>
//       </form> */}

//       {suggestions.length > 0 && (
//         <ul className="absolute bg-white border border-gray-200 text-[#353535] mt-1 w-64 rounded-md shadow-lg">
//           {suggestions.map((product: Product) => (
//             <li
//               key={product.id}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleSuggestionClick(product)}
//             >
//               {product.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
