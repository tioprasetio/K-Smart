import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth, db } from "../config/Firebase"; // Pastikan Firebase dikonfigurasi dengan benar
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import NavbarComponent from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";

interface BVHistory {
  id: string;
  memberName: string;
  memberEmail: string;
  bvAmount: number;
  timestamp: string;
}

const HistoryBvPage: React.FC = () => {
  const [history, setHistory] = useState<BVHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [BV, setBV] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null); // Tambahkan state untuk menyimpan user

  // Ambil data pengguna yang sedang login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user); // Simpan user ke state
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setBV(userSnap.data().BV || "");
        }
        setLoading(false); // Data selesai diambil
      } else {
        Swal.fire(
          "Error",
          "Anda harus login untuk melihat riwayat BV!",
          "error"
        ).then(() => {
          navigate("/login");
        });
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser.uid;

    const fetchBVHistory = async () => {
      try {
        setLoading(true);

        // Cari semua member yang memiliki leader_id = userId
        const usersRef = collection(db, "users");
        const membersQuery = query(usersRef, where("leader_id", "==", userId));
        const membersSnapshot = await getDocs(membersQuery);

        const members = membersSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        }));

        if (members.length === 0) {
          setLoading(false);
          return;
        }

        const historyData: BVHistory[] = [];

        // Loop setiap member dan ambil transaksi mereka dari collection transactions
        for (const member of members) {
          const transactionsRef = collection(db, "transactions");
          const transactionsQuery = query(
            transactionsRef,
            where("uid", "==", member.id),
            where("midtrans_status", "==", "settlement")
          );
          const transactionsSnapshot = await getDocs(transactionsQuery);

          transactionsSnapshot.forEach((doc) => {
            const transaction = doc.data();
            const bvAmount = transaction.totalBV || 0;

            historyData.push({
              id: doc.id,
              memberName: member.name,
              memberEmail: member.email,
              bvAmount: bvAmount,
              timestamp: transaction.createdAt,
            });
          });
        }

        historyData.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching BV history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBVHistory();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className={`${isDarkMode ? "text-white" : "text-[#353535]"}`}>
          Memuat data...
        </p>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140C00] text-[#FFFFFF]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-6 pt-24 sm:pt-28 w-full min-h-screen pb-20`}
      >
        <div className="flex items-center gap-2 mb-4">
          <i
            className="bx bx-arrow-back text-xl md:text-2xl cursor-pointer"
            onClick={() => navigate(-1)} // Tambahkan fungsi kembali
          ></i>
          <h1 className="text-2xl font-bold">History BV</h1>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#f0f0f0]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex flex-col mb-4 text-center`}
        >
          <i className="bx bx-wallet text-8xl"></i>
          <p className="font-bold">Total BV Kamu: {BV}</p>
        </div>

        {history.length === 0 ? (
          <p>Tidak ada riwayat BV.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className={`${
                  isDarkMode
                    ? "bg-[#404040] text-[#f0f0f0]"
                    : "bg-[#FFFFFF] text-[#353535]"
                } p-4 rounded-lg flex flex-col gap-2`}
              >
                <div className="flex flex-row items-center gap-1">
                  <i className="bx bx-user"></i>
                  <p className="font-semibold truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.memberName}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-1">
                  <i className="bx bx-envelope"></i>
                  <p className="font-semibold truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.memberEmail}
                  </p>
                </div>

                <div
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-[#6a7282]"
                  } flex flex-row items-center gap-1`}
                >
                  <i className="bx bxs-chevrons-up"></i>
                  <p>BV: {item.bvAmount}</p>
                </div>

                <div
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-[#6a7282]"
                  } flex flex-row items-center gap-1`}
                >
                  <i className="bx bx-calendar"></i>
                  <p>{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryBvPage;
