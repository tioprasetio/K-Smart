interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Btn: React.FC<BtnProps> = ({ children, onClick }) => {
  // Your button implementation here
  return (
    <button
      onClick={onClick}
      className="bg-[#28a154] text-white font-bold px-4 py-2 mt-3 rounded-md w-full hover:bg-[#167e3c] cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Btn;
