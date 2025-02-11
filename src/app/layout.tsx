import React from "react";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/redux/Provider";
import "../styles/globals.css";

// import type { Metadata } from "next";
import {
  Lora,
  Playfair_Display,
  Poppins,
  Sedgwick_Ave,
} from "next/font/google";
import { Metadata } from "next";
import { FormDataProvider } from "@/context/FormDataContext";

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

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Future surprises",
  description: "Simplify your gift giving",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mainHeading.variable} ${mainText.variable} ${Sedgwick.variable} ${lora.variable}`}
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
        <StoreProvider>
          <FormDataProvider>
            <div className="mx-auto overflow-hidden">
              {children}
            </div>
          </FormDataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
