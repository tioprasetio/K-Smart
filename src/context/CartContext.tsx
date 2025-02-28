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
  setUserEmail: (email: string | null) => void;
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
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } else {
        setCart([]); // Reset cart jika tidak ada data yang tersimpan
      }
    } else {
      setCart([]); // Kosongkan cart jika user logout
    }
  }, []);

  // Reset cart dan ambil cart baru dari localStorage setiap kali userEmail berubah
  useEffect(() => {
    if (userEmail) {
      const savedCart = localStorage.getItem(`cart_${userEmail}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } else {
        setCart([]); // Reset cart jika tidak ada data yang tersimpan
      }
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

  // Fungsi untuk menambahkan produk ke cart
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

  // Fungsi untuk menghapus produk dari cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, setCart, setUserEmail }}
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
