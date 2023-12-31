"use client";
import Head from "next/head";
import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/authContext";
import VehicleProvider from "./context/vehicleContext";
import LatLongProvider from "./context/latLongContext";
import OrdersProvider from "./context/orderContext";



export default function RootLayout({ children }) {
  const path = usePathname();

  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 500);
  }, [path]);

  return (
    <html lang="en">
      <Head>
        <title>vehicle-rent app</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:image" content="./assets/images/revus-rental.png" />
      </Head>
      <body className={`opening-overlay  ${hide ? "hide-overlay" : ""}`}>
        <Toaster position="top-center" reverseOrder={false} />

        <AuthProvider>
          <OrdersProvider>
            <VehicleProvider>
              <LatLongProvider>{children}</LatLongProvider>
            </VehicleProvider>
          </OrdersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
