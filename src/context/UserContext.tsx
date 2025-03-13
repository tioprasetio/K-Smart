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

        // Listener Firestore
        const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              uid: authUser.uid,
              email: authUser.email || "",
              name: userData.name || "",
              alamat: userData.alamat || "",
              no_hp: userData.no_hp || "",
              role: userData.role || "",
            });
          } else {
            setUser(null);
          }
        });

        // Pastikan Firestore listener berhenti saat user logout
        return () => unsubscribeFirestore();
      } else {
        setUser(null);
      }
    });

    // Hapus listener auth ketika komponen unmount
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
