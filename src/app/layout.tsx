import React from "react";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/redux/Provider";
import "../styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
// import type { Metadata } from "next";
import {
  Playfair_Display,
  Poppins,
  Sedgwick_Ave,
} from "next/font/google";
import { Metadata } from "next";

const mainHeading = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mainHeading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mainText = Poppins({
  display: "swap",
  style: "normal",
  variable: "--font-mainText",
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const Sedgwick = Sedgwick_Ave({
  display: "swap",
  style: "normal",
  variable: "--font-Sedgwick",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Future surprises",
  description: "Simplify your gift giving",
  icons: {
    icon: "https://images.squarespace-cdn.com/content/v1/65417fc1188fee42b071f876/ff26a069-ee8a-4c72-96a9-c59c79c71b3b/favicon.ico?format=100w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mainHeading.variable} ${mainText.variable} ${Sedgwick.variable}`}
    >
      <body>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              color: "#fff",
              backgroundColor: "#000",
            },
          }}
        />
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
