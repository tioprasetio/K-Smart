import { useDarkMode } from "../context/DarkMode";

const TransactionDashboard = () => {
    const { isDarkMode } = useDarkMode();
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
        } flex items-center justify-center h-48 mb-4 rounded-sm`}
      >
        <p className="text-2xl text-gray-400 dark:text-gray-500">Transaction</p>
      </div>
    );
}

export default TransactionDashboard