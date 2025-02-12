"use client";

import React, { ReactNode, useEffect } from "react";
import PrivateLayoutWrapper from "../layouts/PrivateLayoutWrapper";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LayoutProps {
  children?: ReactNode;
}

export default function CustomLayout({
  children,
}: LayoutProps) {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user?.id) {
      toast.error(
        "Please login to view and edit recipients",
      );
      router.push("/login");
    }
  }, []);

  return (
    <PrivateLayoutWrapper>
      <div className="fixed top-0 z-50 w-full">
        {/* <Navbar /> */}
        <Header />
      </div>
      {children}
    </PrivateLayoutWrapper>
  );
}
