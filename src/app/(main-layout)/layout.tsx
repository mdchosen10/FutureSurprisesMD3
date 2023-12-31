import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Future Surprises",
};

export default function MainLayout({
  children,
}: LayoutProps) {
  return (
    <div className="m-auto flex min-h-screen flex-col">
      <div className="fixed left-0 top-0 z-50 w-full">
        <Navbar />
      </div>
      <main className="mx-auto w-full max-w-[1400px] flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
