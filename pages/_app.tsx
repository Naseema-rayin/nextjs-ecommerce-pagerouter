import type { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../components/CartContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <main className="container py-4">
        <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}