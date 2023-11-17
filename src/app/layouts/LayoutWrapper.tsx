"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";
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

  const [hydrated, setHydrated] = useState<boolean>();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (user?.id) {
      router.push("/my-account/recipients");
    }
  }, [router]);

  if (!hydrated) {
    return null;
  }

  return <main>{children}</main>;
}
