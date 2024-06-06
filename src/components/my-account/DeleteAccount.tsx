/* eslint-disable no-unused-vars */

import { Modal } from "flowbite-react";
import Image from "next/image";
import CloseIcon from "@/../public/icons/close-violet.svg";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { AnyAction } from "@reduxjs/toolkit";
import { useAuth } from "@/hooks/useAuth";

type DeleteAccountProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const DeleteAccount = ({
  isOpen,
  setIsOpen,
}: DeleteAccountProps) => {
  const [confirmText, setConfirmText] = useState("");

  const dispatch = useDispatch();
  const user = useAuth();

  const onDeleteClick = useCallback(async () => {
    const res: any = await dispatch(
      authActions.deleteUser({
        data: { email: user?.email },
      }) as unknown as AnyAction,
    );

    const responseMsg = JSON.parse(
      res?.payload?.request?.response,
    );

    if (res?.payload?.request?.status === 200) {
      setIsOpen(false);
      toast.success(responseMsg?.message);
      return window.location.replace("/");
    }

    toast.error(
      responseMsg?.message || "Something went wrong!",
    );
  }, [dispatch, setIsOpen, user?.email]);

  return (
    <Modal
      dismissible={false}
      show={isOpen}
      onClose={() => {
        setConfirmText("");
        setIsOpen(false);
      }}
      className="h-screen"
      size="md"
      position="center"
    >
      <div className="flex max-w-[500px] flex-col px-6 pb-8 pt-6 font-mainText phone:px-6">
        <div className="mb-4 flex items-center justify-center">
          <h3 className="font-bold">Delete Account</h3>
          <Image
            src={CloseIcon}
            alt="close"
            onClick={() => {
              setConfirmText("");
              setIsOpen(false);
            }}
            className="ml-auto cursor-pointer rounded-full border border-gray-300"
            width={35}
            height={35}
          />
        </div>
        <div className="space-y-3">
          <p className="text-sm">
            Are you sure you want to delete your account?
            This action is permanent. Once you delete your
            account, you will no longer have access to your
            data or be able to use our services.
          </p>

          <div className="space-y-1">
            <label
              htmlFor="delete"
              className="text-xs font-medium text-gray-600"
            >
              To confirm type &quot;DELETE&quot;
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                id="delete"
                name="delete"
                placeholder="DELETE"
                onChange={e =>
                  setConfirmText(e.target.value)
                }
                className="w-full rounded border p-2 focus:border-primaryViolet md:col-span-2"
              />
              <button
                disabled
                className={`h-[42px] rounded font-semibold text-white md:h-full
                ${
                  confirmText === "DELETE"
                    ? "bg-red-600"
                    : "bg-red-400"
                }
                `}
                onClick={onDeleteClick}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
