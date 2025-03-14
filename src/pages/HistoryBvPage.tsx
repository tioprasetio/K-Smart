import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import NavbarComponent from "../components/Navbar";
import { useUser } from "../context/UserContext";

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
  const { user, isAuthChecked } = useUser();

  useEffect(() => {
    if (!isAuthChecked) return;
    if (!user) {
      Swal.fire(
        "Error",
        "Anda harus login untuk melihat riwayat BV!",
        "error"
      ).then(() => {
        navigate("/login");
      });
      return;
    }

    setLoading(true);
    const fetchUserBV = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setBV(userSnap.data().BV || "0");
      }
      setLoading(false);
    };
    fetchUserBV();
  }, [user, isAuthChecked, navigate]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const fetchBVHistory = async () => {
      try {
        const usersRef = collection(db, "users");
        const membersQuery = query(
          usersRef,
          where("leader_id", "==", user.uid)
        );
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

        const transactionsRef = collection(db, "transactions");
        const historyData: BVHistory[] = [];

        for (const member of members) {
          const transactionsQuery = query(
            transactionsRef,
            where("uid", "==", member.id),
            where("midtrans_status", "==", "settlement")
          );
          const transactionsSnapshot = await getDocs(transactionsQuery);

          transactionsSnapshot.forEach((doc) => {
            const transaction = doc.data();
            historyData.push({
              id: doc.id,
              memberName: member.name,
              memberEmail: member.email,
              bvAmount: transaction.totalBV || 0,
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
  }, [user]);

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
            onClick={() => navigate(-1)}
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
                  <p className="font-semibold truncate max-w-[300px] overflow-hidden text-ellipsis">
                    {item.memberName}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-1">
                  <i className="bx bx-envelope"></i>
                  <p className="font-semibold truncate max-w-[300px] overflow-hidden text-ellipsis">
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
                  <p>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(new Date(item.timestamp))}
                  </p>
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
