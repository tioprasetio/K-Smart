import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { db } from "../config/Firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

interface Product {
  id: number;
  name: string;
  picture: string;
  harga: number;
  quantity: number;
  bv: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setUserEmail: (email: string | null) => void;
  clearCheckedOutItems: (selectedProducts: Product[]) => void;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Tambahkan state loading

  const clearCart = () => {
    setCart([]); // Kosongkan state cart
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`); // Hapus key dari localStorage
    }
  };

  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.email || null;
  };

  useEffect(() => {
    const email = getUserEmail();
    setUserEmail(email);
    if (email) {
      loadCart(email); // Muat cart saat email tersedia
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      loadCart(userEmail);
    }
  }, [userEmail]); // Jalankan loadCart saat userEmail berubah

  useEffect(() => {
    if (userEmail) {
      saveCartToLocalStorage(userEmail, cart);
      saveCartToFirestore(userEmail, cart);
    }
  }, [cart, userEmail]);

  const saveCartToLocalStorage = (email: string, cartData: Product[]) => {
    if (cartData.length > 0) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(cartData));
    } else {
      localStorage.removeItem(`cart_${email}`);
    }
  };

  const saveCartToFirestore = async (email: string, cartData: Product[]) => {
    if (!email) return;
    const cartRef = collection(db, "cart", email, "items");

    try {
      // Jangan hapus item di Firestore jika tidak ada di localStorage
      for (const product of cartData) {
        await setDoc(doc(cartRef, String(product.id)), product);
      }
    } catch (error) {
      console.error("Gagal menyimpan cart ke Firestore:", error);
    }
  };

  const fetchCartFromFirestore = async (email: string) => {
    if (!email) return [];

    const cartRef = collection(db, "cart", email, "items");
    const querySnapshot = await getDocs(cartRef);
    const cartData: Product[] = [];

    querySnapshot.forEach((doc) => {
      cartData.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });

    return cartData;
  };

  const loadCart = async (email: string | null) => {
    if (!email) return;

    setLoading(true); // Set loading ke true

    const savedCart = localStorage.getItem(`cart_${email}`);
    if (
      savedCart &&
      savedCart !== "[]" &&
      savedCart !== "null" &&
      savedCart !== "undefined"
    ) {
      // Jika ada dan valid, gunakan data dari localStorage
      setCart(JSON.parse(savedCart));
    } else {
      // Jika tidak ada atau tidak valid, ambil data dari Firestore
      try {
        const fetchedCart = await fetchCartFromFirestore(email);
        setCart(fetchedCart); // Set data ke state cart
        saveCartToLocalStorage(email, fetchedCart); // Simpan ke localStorage
      } catch (error) {
        console.error("Gagal memuat cart dari Firestore:", error);
      }
    }

    setLoading(false);
  };

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

  const removeFromCart = async (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    if (userEmail) {
      try {
        await deleteDoc(doc(db, "cart", userEmail, "items", String(id)));
      } catch (error) {
        console.error("Gagal menghapus produk dari Firestore:", error);
      }
    }
  };

  const clearCheckedOutItems = async (selectedProducts: Product[]) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !selectedProducts.some((selected) => selected.id === item.id)
      )
    );

    if (userEmail) {
      try {
        for (const product of selectedProducts) {
          await deleteDoc(
            doc(db, "cart", userEmail, "items", String(product.id))
          );
        }
      } catch (error) {
        console.error(
          "Gagal menghapus item yang dibeli dari Firestore:",
          error
        );
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setCart,
        setUserEmail,
        clearCheckedOutItems,
        clearCart,
        loading,
      }}
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
