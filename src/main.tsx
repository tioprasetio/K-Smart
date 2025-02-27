import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import "flowbite";
import DarkModeContextProvider from "./context/DarkMode.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </DarkModeContextProvider>
  </StrictMode>
);
