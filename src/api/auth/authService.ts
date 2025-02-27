import { auth } from "../../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

// 🔹 Interface untuk hasil autentikasi
interface AuthResponse {
  user: User;
}

// 🔹 Fungsi Registrasi
export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

// 🔹 Fungsi Login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Mengembalikan user yang berhasil login
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Email atau password salah."); // Pastikan error dilempar untuk ditangkap di LoginForm.tsx
  }
};

// 🔹 Fungsi Logout
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};
