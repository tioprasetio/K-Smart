import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { Voucher } from "../data/vouchers";
import { getVoucher } from "../api/voucher/getVoucher";
import { useDarkMode } from "../context/DarkMode";

const SearchVoucher = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Voucher[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  //Fetch products sekali saja jika belum ada data
  useEffect(() => {
    if (vouchers.length === 0) {
      let isMounted = true;
      const fetchData = async () => {
        try {
          const allVouchers = await getVoucher();
          if (isMounted) {
            setVouchers(allVouchers);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      return () => {
        isMounted = false; // Mencegah update state setelah unmount
      };
    }
  }, [vouchers.length]);

  //Debounce pencarian (delay 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        const filteredVouchers = vouchers.filter((voucher) =>
          voucher.code?.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredVouchers);
      } else {
        setSuggestions([]);
      }
    }, 300); // Delay 300ms

    return () => clearTimeout(timer); // Cleanup timer agar tidak ada delay tumpang tindih
  }, [query, vouchers]);

  //Membuat slug dari nama produk
  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  //Gunakan useCallback untuk menghindari re-render yang tidak perlu
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  //Navigasi ke hasil pencarian
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/voucher?keyword=${encodeURIComponent(query.trim())}`);
    }
  };

  //Navigasi ke halaman produk dengan ID + Slug (agar tidak bentrok jika ada nama yang sama)
  const handleSuggestionClick = (voucher: Voucher) => {
      navigate(`/voucher/${generateSlug(voucher.code)}`, {
        state: voucher,
      });
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative pb-6 z-30">
      <form onSubmit={handleSearchSubmit} className="w-full mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className={`${
              isDarkMode
                ? "bg-[#303030] text-white border-gray-700"
                : "bg-white text-[#353535] border-gray-300"
            } block w-full p-4 ps-10 text-sm border rounded-lg focus:ring-[#28a154] focus:border-[#28a154]`}
            placeholder="Cari voucher"
            value={query}
            onChange={handleSearch}
            required
          />
          <button
            type="submit"
            className="text-white cursor-pointer absolute end-2.5 bottom-2.5 bg-[#28a154] hover:bg-[#167e3c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2"
          >
            Cari
          </button>
        </div>
      </form>

      {/*Tampilkan hasil pencarian */}
      {suggestions.length > 0 && (
        <ul
          className={`${
            isDarkMode
              ? "bg-[#303030] text-[#f0f0f0] shadow-xl`"
              : "bg-white text-[#353535]"
          } absolute mt-1 w-full rounded-md shadow-lg`}
        >
          {suggestions.map((voucher) => (
            <li
              key={voucher.id}
              className={`${
                isDarkMode
                  ? "hover:bg-[#252525] rounded-md"
                  : "hover:bg-gray-100 rounded-md"
              } p-2 cursor-pointer`}
              onClick={() => handleSuggestionClick(voucher)}
            >
              {voucher.code}
            </li>
          ))}
        </ul>
      )}

      {/*Tampilkan jika tidak ada hasil */}
      {suggestions.length === 0 && query.length > 0 && (
        <ul
          className={`${
            isDarkMode
              ? "bg-[#303030] text-[#f0f0f0]"
              : "bg-white text-[#353535]"
          } absolute mt-1 w-full rounded-md shadow-lg`}
        >
          <p
            className={`${
              isDarkMode ? "hover:bg-[#252525]" : "hover:bg-gray-100"
            } p-2 cursor-pointer`}
          >
            Voucher tidak ditemukan.
          </p>
        </ul>
      )}
    </div>
  );
};

export default SearchVoucher;
