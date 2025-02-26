interface BtnProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "solid" | "outline"; // Tambahkan varian tombol
}

const Btn: React.FC<BtnProps> = ({
  children,
  className = "",
  onClick,
  variant = "solid",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center font-bold px-4 py-2 mt-3 rounded-md w-full cursor-pointer transition-all
        ${
          variant === "solid"
            ? "bg-[#28a154] text-white hover:bg-[#167e3c]" // Tombol hijau solid
            : "border border-[#28a154] text-[#28a154] bg-transparent hover:bg-[#28a154] hover:text-white" // Tombol outline
        }
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Btn;
