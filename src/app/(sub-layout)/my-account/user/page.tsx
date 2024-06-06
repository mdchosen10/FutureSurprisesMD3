"use client";
import UserDetails from "@/components/my-account/UserDetails";
import { Modal, Spinner } from "flowbite-react";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import * as yup from "yup";
import { useAppDispatch } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

import Image from "next/image";

import CloseIcon from "@/../public/icons/close-violet.svg";
import TextInputFloating from "@/components/utils/TextInputFloating";
import DeleteAccount from "@/components/my-account/DeleteAccount";

const changePasswordSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 character long")
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password should contain at least one lowercase character.",
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password should contain at least one uppercase character.",
      )
      .matches(
        RegExp("(.*\\d.*)"),
        "Password should contain at least one number.",
      )
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password should contain at least one special character.",
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required!")
      .oneOf(
        [yup.ref("password")],
        "Passwords must match.",
      ),
  })
  .required();

const User = () => {
  const [isDeleteAccOpen, setIsDeleteAccOpen] =
    useState(false);
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    resolver: yupResolver<any>(changePasswordSchema),
  });

  const onSubmitChangePassword = useCallback(
    async (data: any) => {
      setLoading(true);
      const reqData = {
        password: data.confirmPassword,
      };

      const res: any = await dispatch(
        authActions.updateMedusaCustomerAccount({
          data: reqData,
        }),
      );
      if (res?.payload?.request?.status === 200) {
        toast.success("Password changed successfully.");
        setChangePasswordModal(false);
        reset({});
      }
      setLoading(false);
    },
    [dispatch, reset],
  );

  return (
    <div>
      <UserDetails />
      <Modal
        dismissible={false}
        show={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        className="h-screen"
        size="md"
        position="center"
      >
        <div className="flex max-w-[500px] flex-col px-6 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h3 className="font-bold">Change Password</h3>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => {
                reset({});
                setChangePasswordModal(false);
              }}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmitChangePassword)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="New Password*"
                  type="password"
                  errors={errors.password?.message}
                  inputClassName="w-full"
                  isPasswordInput={true}
                  isPasswordShow={showPassword}
                  setIsPasswordShow={() =>
                    setShowPassword(!showPassword)
                  }
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="Confirm New Password*"
                  type="password"
                  errors={errors.confirmPassword?.message}
                  inputClassName="w-full"
                  isPasswordInput={true}
                  isPasswordShow={showConfirmPassword}
                  setIsPasswordShow={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword,
                    )
                  }
                />
              )}
            />

            <button
              className="mx-auto w-full rounded-xl border border-primaryViolet px-10 py-2 md:mx-0 md:mr-auto md:max-w-[240px]"
              type="submit"
              disabled={loading}
            >
              <span>Submit</span>
              {loading && (
                <Spinner color="purple" size="sm" />
              )}
            </button>
          </form>
        </div>
      </Modal>
      <DeleteAccount
        isOpen={isDeleteAccOpen}
        setIsOpen={setIsDeleteAccOpen}
      />
      <div className="flex flex-col space-y-3">
        <span
          className="max-w-fit cursor-pointer font-mainText text-sm text-primaryViolet md:ml-[25px] md:text-base"
          onClick={() =>
            setChangePasswordModal(!changePasswordModal)
          }
        >
          Change password?
        </span>
        <span
          className="max-w-fit cursor-pointer font-mainText text-sm text-red-600 md:ml-[25px] md:text-base"
          onClick={() => setIsDeleteAccOpen(true)}
        >
          Delete Account
        </span>
      </div>
    </div>
  );
};

export default User;
