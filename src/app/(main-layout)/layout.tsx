import React, { ReactNode } from "react";

import { Metadata } from "next";
import Header from "@/components/layout/Header";

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
      {/* <div className="fixed left-0 top-0 z-50 w-full">
        <Navbar />
      </div> */}
      <Header />
      <main className="mx-auto h-full w-full">
        {children}
      </main>
    </div>
  );
}
