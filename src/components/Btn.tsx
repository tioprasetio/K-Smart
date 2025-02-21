interface BtnProps {
  children: React.ReactNode;
}

const Btn: React.FC<BtnProps> = ({ children }) => {
  // Your button implementation here
  return <button className="bg-[#28a154] text-white font-bold px-4 py-2 mt-3 rounded-md w-full hover:bg-[#167e3c] cursor-pointer">{children}</button>;
};

export default Btn;
