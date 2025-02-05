"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function useAuth() {
  const user = useSelector(
    (state: RootState) => state.authSlice.user,
  );
  return user;
}
