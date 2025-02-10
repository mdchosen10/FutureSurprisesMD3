"use client";

import { useAppDispatch } from "@/hooks";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";
import * as authActions from "@/redux/auth/actions";

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [hydrated, setHydrated] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessToken = params.get("access_token") || null;

  useEffect(() => {
    setHydrated(true);
  }, []);

  const getCurrentCustomer = async () => {
    await dispatch(authActions.getCurrentCustomer());
  };

  useEffect(() => {
    if (hydrated && accessToken) {
      localStorage.setItem("user_token", accessToken);
      getCurrentCustomer();
      router.push("/surprise");
    }
  }, [hydrated, accessToken]);

  return <div> {children}</div>;
}
