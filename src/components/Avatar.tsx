"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DownArrow from "@/../public/icons/down-arrow.svg";
import { Dropdown } from "flowbite-react";
// import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { AnyAction } from "redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Avatar = ({ user }: any) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  const onClickLogout = async () => {
    const res = await dispatch(
      authActions.logout() as unknown as AnyAction,
    );
    if (res?.payload?.status === 200) {
      toast.success("Logout successfully.");
      // window.location.pathname = "/";
      window.location.href = window.location.origin;
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render,
    // so the client and server match
    return null;
  }

  return (
    <div className="flex max-w-fit flex-row-reverse items-center justify-end gap-1 rounded-md p-1 md:flex-row md:justify-start md:border-none md:p-0">
      <Link
        href={"/my-account/recipients"}
        className="cursor-pointer font-poppins font-bold capitalize text-white"
      >
        {user?.customer?.first_name || user?.first_name}
      </Link>

      <Dropdown
        inline
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex cursor-pointer gap-1">
            <Image src={DownArrow} alt="down-arrow" />
          </div>
        )}
      >
        <Dropdown.Item
          onClick={() => {
            router.push("/my-account");
          }}
        >
          <span>Account</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={onClickLogout}>
          <span>Logout</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Avatar;
