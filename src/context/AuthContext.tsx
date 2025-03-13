import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser, getUserRole } from "../api/auth/authService";

interface AuthContextType {
  user: { uid: string; email: string | null } | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ uid: string; email: string | null } | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setRole(role);
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);
    setUser(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setRole(null);
  };

  const register = async (email: string, password: string) => {
    const { user } = await registerUser(email, password);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};