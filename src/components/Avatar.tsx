"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DownArrow from "@/../public/icons/down-arrow.svg";
import { Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { AnyAction } from "redux";

const Avatar = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hydrated, setHydrated] = useState(false);

  const onClickLogout = async () => {
    const res = await dispatch(
      authActions.logout() as unknown as AnyAction,
    );
    if (res?.payload?.status === 200) {
      toast.success("Logout successfully.");
      window.location.pathname =
        "https://www.futuresurprises.com/";
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div className="flex max-w-fit flex-row-reverse items-center justify-end gap-1 rounded-md border border-white p-1 md:flex-row md:justify-start md:border-none md:p-0">
      <p
        onClick={() =>
          router.push("/my-account/recipients")
        }
        className="cursor-pointer text-sm font-bold text-white"
      >
        {user?.customer?.first_name || user?.first_name}
      </p>

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
        <Dropdown.Item onClick={onClickLogout}>
          <span>Logout</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Avatar;
