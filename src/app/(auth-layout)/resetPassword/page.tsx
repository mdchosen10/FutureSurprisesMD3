"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import GirlThinking from "@/../public/images/girl-thinking.png";
import Logo from "@/../public/images/logo.png";
import GoBack from "@/../public/icons/go-back.svg";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import TextInputFloating from "@/components/utils/TextInputFloating";
import Button from "@/components/Button";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ResetPasswordForm = {
  email: string;
  password: string;
  // confirmPassword: string;
  token?: string;
};

const resetPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^((\S+)@(\S+)\.(\S+))$/, {
        message: "Please enter a valid email address.",
        excludeEmptyString: false,
      }),
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

    // confirmPassword: yup
    //   .string()
    //   .required("Password is required!")
    //   .min(8, "Password must be at least 8 character long")
    //   .matches(
    //     RegExp("(.*[a-z].*)"),
    //     "Password should contain at least one lowercase character.",
    //   )
    //   .matches(
    //     RegExp("(.*[A-Z].*)"),
    //     "Password should contain at least one uppercase character.",
    //   )
    //   .matches(
    //     RegExp("(.*\\d.*)"),
    //     "Password should contain at least one number.",
    //   )
    //   .matches(
    //     RegExp('[!@#$%^&*(),.?":{}|<>]'),
    //     "Password should contain at least one special character.",
    //   ),
  })
  .required();

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const token: any = searchParams?.get("token");

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const user = useAuth();
  const { loading } = useAppSelector(
    state => state.authSlice,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver<any>(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<
    ResetPasswordForm
  > = async data => {
    const reqData = {
      password: data.password,
      email: data.email,
      token: token || "",
      // confirmPassword: data.confirmPassword,
    };
    const res: any = await dispatch(
      authActions.resetPassword({ data: reqData }),
    );
    if (res?.payload?.status === 200) {
      toast.success(res?.payload?.message || "");
      router.push("/login");
      return;
    }
    toast.error(res?.payload?.data?.message);
  };

  useEffect(() => {
    if (user?.id) {
      // router.push("/my-account");
    }
  }, [user]);

  return (
    <div className="flex justify-center md:justify-between">
      {/* Left */}
      <div className="hidden h-[100%] min-h-screen w-[50%] flex-col items-center justify-between bg-primaryViolet md:flex">
        <div className="md:w-[250px]">
          <Image
            src={Logo}
            alt="girl"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
        <div className="">
          <Image
            src={GirlThinking}
            alt="girl"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex w-[70%] flex-col md:ml-[30px] md:w-[50%] md:max-lg:mt-[20%] lg:ml-[67px] lg:mt-[130px]">
        <div className="mr-auto  mt-12">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() => router.back()}
          />
        </div>
        <div className="mx-auto flex max-w-[400px] flex-col items-start gap-6 pt-14 md:mx-0 md:pt-0">
          <h2 className="heading-gradient mx-auto text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Reset password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-[270px] flex-col gap-4"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="Email*"
                  type="email"
                  errors={errors.email?.message}
                  inputClassName="w-full lg:max-w-[240px]"
                  isPasswordInput={false}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="New Password*"
                  type="password"
                  errors={errors.password?.message}
                  inputClassName="w-full lg:max-w-[240px]"
                  isPasswordInput={true}
                  isPasswordShow={showPassword}
                  setIsPasswordShow={() =>
                    setShowPassword(!showPassword)
                  }
                />
              )}
            />

            {/* <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="Confirm new Password*"
                  type="password"
                  errors={errors.confirmPassword?.message}
                  inputClassName="w-full lg:max-w-[240px]"
                  isPasswordInput={true}
                  isPasswordShow={showPassword}
                  setIsPasswordShow={() =>
                    setShowPassword(!showPassword)
                  }
                />
              )}
            /> */}
            <Button
              type="submit"
              isLoading={loading}
              name="Submit"
              bgClass="bg-primary"
              textClass="text-white"
              extraClass="w-[140px] shadow-md mx-auto md:mx-0"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
