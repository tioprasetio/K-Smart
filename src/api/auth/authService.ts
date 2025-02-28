import { auth } from "../../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

// 🔹 Interface untuk hasil autentikasi
interface AuthResponse {
  user: Pick<User, "uid" | "email">; // Hanya menyimpan data yang aman
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

  // Simpan hanya uid dan email
  const safeUser = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  };

  localStorage.setItem("user", JSON.stringify(safeUser));
  return { user: safeUser };
};

// 🔹 Fungsi Login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Simpan hanya uid dan email
    const safeUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };

    localStorage.setItem("user", JSON.stringify(safeUser));

    // Simpan token sementara di sessionStorage (jangan di localStorage)
    sessionStorage.setItem(
      "accessToken",
      await userCredential.user.getIdToken()
    );

    return safeUser;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Email atau password salah.");
  }
};

// 🔹 Fungsi Logout
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);

  // Hapus data dari localStorage dan sessionStorage saat logout
  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");
};
