import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

// Definisikan tipe untuk context
interface User {
  uid: string;
  email: string | null;
  role?: string; // Pakai `?` agar opsional
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);

        // 🔥 Gunakan onSnapshot untuk pemantauan real-time
        const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({
              uid: authUser.uid,
              email: authUser.email || "",
              role: docSnap.data().role,
            });
          } else {
            setUser(null);
          }
        });

        return () => unsubscribeFirestore();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser harus digunakan di dalam UserProvider");
  }
  return context;
};
