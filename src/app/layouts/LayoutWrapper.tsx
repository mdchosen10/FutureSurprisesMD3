"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children?: ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutProps) {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user?.id) {
      router.push("/my-account/recipients");
    }
  }, [router]);

  return <main>{children}</main>;
}
