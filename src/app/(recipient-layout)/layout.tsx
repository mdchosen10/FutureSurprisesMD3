import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import PrivateLayoutWrapper from "../layouts/PrivateLayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Surprises",
};
interface LayoutProps {
  children?: ReactNode;
}

export default function CustomLayout({
  children,
}: LayoutProps) {
  return (
    <PrivateLayoutWrapper>
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>
      {children}
    </PrivateLayoutWrapper>
  );
}
