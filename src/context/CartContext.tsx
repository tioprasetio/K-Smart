import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Product {
  id: number;
  name: string;
  picture: string;
  harga: number;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setUserEmail: (email: string | null) => void; // Tambahkan fungsi untuk mengupdate userEmail
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fungsi untuk mengambil user dari localStorage
  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.email || null;
  };

  // Ambil cart dari localStorage saat komponen pertama kali di-mount
  useEffect(() => {
    const email = getUserEmail();
    setUserEmail(email);

    if (email) {
      const savedCart = localStorage.getItem(`cart_${email}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]); // Kosongkan cart jika user logout
    }
  }, []);

  // Ambil cart dari localStorage setiap kali userEmail berubah (misal setelah login)
  useEffect(() => {
    if (userEmail) {
      const savedCart = localStorage.getItem(`cart_${userEmail}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]); // Kosongkan cart jika user logout
    }
  }, [userEmail]);

  // Simpan cart ke localStorage setiap kali cart atau userEmail berubah
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    }
  }, [cart, userEmail]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let newCart;

      if (existingProduct) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        newCart = [...prevCart, product];
      }

      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, setCart, setUserEmail }} // Sertakan setUserEmail di value
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan dalam CartProvider");
  }
  return context;
};
