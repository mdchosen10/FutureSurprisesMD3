"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children?: ReactNode;
}

export default function PrivateLayoutWrapper({
  children,
}: LayoutProps) {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (!user?.id) {
      router.push("/login");
      return;
    }
  }, [router, user]);

  return <main>{children}</main>;
}
