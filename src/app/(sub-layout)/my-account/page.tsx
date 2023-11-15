"use client";

import { useRouter } from "next/navigation";

const MyAccount = () => {
  const router = useRouter();
  router.push("/my-account/recipients");
  return;
};

export default MyAccount;
