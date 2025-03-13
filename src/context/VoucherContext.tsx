import { createContext, useContext, useEffect, useState } from "react";
import { getVoucher } from "../api/voucher/getVoucher";
import { Voucher } from "../data/vouchers";

type VoucherContextType = {
  vouchers: Voucher[];
  isLoading: boolean;
};

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export const VoucherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVouchers = await getVoucher();
        setVouchers(allVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <VoucherContext.Provider value={{ vouchers, isLoading}}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVouchers must be used within a VoucherProvider");
  }
  return context;
};
