import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface User {
  uid: string;
  email: string | null;
  name?: string;
  alamat?: string;
  no_hp?: string;
  role?: string;
  BV?: number;
  jenis_kelamin?: string;
  tanggal_lahir?: string;
}

interface UserContextType {
  user: User | null;
  isAuthChecked: boolean; // Menandakan apakah auth sudah dicek
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Default: false

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);

        // Listener Firestore
        const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              uid: authUser.uid,
              email: authUser.email || null,
              name: userData.name ?? undefined,
              alamat: userData.alamat ?? undefined,
              no_hp: userData.no_hp ?? undefined,
              role: userData.role ?? undefined,
              BV: userData.BV ?? 0, // Pastikan default adalah angka
              jenis_kelamin: userData.jenis_kelamin ?? undefined,
              tanggal_lahir: userData.tanggal_lahir ?? undefined,
            });
          } else {
            setUser(null);
          }
          setIsAuthChecked(true);
        });

        // Cleanup listener Firestore saat user logout
        return () => unsubscribeFirestore();
      } else {
        setUser(null);
        setIsAuthChecked(true);
      }
    });

    // Cleanup listener Auth saat komponen unmount
    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthChecked, setUser }}>
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
