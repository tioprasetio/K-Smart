import { createContext, useContext, useEffect, useState } from "react";
import { getBestSellers, getProduct } from "../api/product/getProduct";
import { Product } from "../data/products";

type ProductContextType = {
  products: Product[];
  bestSellers: Product[];
  isLoading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProduct();
        const topProducts = await getBestSellers();
        setProducts(allProducts);
        setBestSellers(topProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, bestSellers, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
