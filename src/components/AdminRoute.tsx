import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDarkMode } from "../context/DarkMode";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Subscribe ke auth state
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().role === "admin");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup saat komponen di-unmount
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#f4f6f9]"
        } flex justify-center items-center min-h-screen`}
      >
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          Memuat data...
        </p>
        {/* Tambahkan spinner atau skeleton loader di sini */}
      </div>
    );

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

export default AdminRoute;
