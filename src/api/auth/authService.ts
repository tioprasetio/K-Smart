import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// 🔹 Interface untuk hasil autentikasi
interface AuthResponse {
  user: {
    uid: string;
    email: string | null; // Email bisa null jika tidak tersedia
  };
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
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = user?.email;

  if (userEmail) {
    // Hapus key cart_${userEmail} dari localStorage
    localStorage.removeItem(`cart_${userEmail}`);
  }

  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");

  window.location.assign("/login");
};

// Fungsi untuk mendapatkan role user dari Firestore
export const getUserRole = async (): Promise<string | null> => {
  const user = auth.currentUser;

  if (!user) return null; // Jika user belum login

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().role || null;
  } else {
    return null;
  }
};