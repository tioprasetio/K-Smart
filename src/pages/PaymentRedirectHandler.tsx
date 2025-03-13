import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentRedirectHandler = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");
  const statusCode = queryParams.get("status_code");
  const transactionStatus = queryParams.get("transaction_status");

  useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        if (orderId && transactionStatus === "capture") {
          // Periksa status transaksi di backend
          const statusResponse = await axios.get(
            `https://d971-202-57-1-108.ngrok-free.app/api/payment/check-status?order_id=${orderId}`
          );

          if (statusResponse.data.status === "berhasil") {
            // Tampilkan alert sukses
            Swal.fire({
              title: "Pembayaran Berhasil!",
              text: "Terima kasih telah melakukan pembayaran.",
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire("Error", "Pembayaran gagal!", "error");
          }
        }
      } catch (error) {
        console.error("Error saat memeriksa status transaksi:", error);
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat memproses pembayaran!",
          "error"
        );
      }
    };

    checkTransactionStatus();
  }, [orderId, transactionStatus]);

  return null; // Komponen ini tidak merender apa pun
};

export default PaymentRedirectHandler;
