import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import "flowbite";

// Tambahkan Google Analytics
const GTAG_ID = "G-5B1S66Q62L";

// Buat script untuk memuat Google Analytics
const script = document.createElement("script");
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
document.head.appendChild(script);

// Inisialisasi Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}
gtag("js", new Date());
gtag("config", GTAG_ID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
