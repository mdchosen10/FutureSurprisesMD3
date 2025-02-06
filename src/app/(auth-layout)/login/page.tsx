"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import GirlThinking from "@/../public/images/girl-thinking.png";
import Logo from "@/../public/images/new_log_big.png";
import GoogleIcon from "@/../public/icons/google.svg";
import FacebookIcon from "@/../public/icons/facebook.svg";
import GoBack from "@/../public/icons/go-back.svg";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputFloating from "@/components/utils/TextInputFloating";
import Button from "@/components/Button";
import * as authActions from "@/redux/auth/actions";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Modal } from "flowbite-react";
import CloseIcon from "@/../public/icons/close-violet.svg";

type LoginForm = {
  email: string;
  password: string;
};

const LoginFormSchema = yup
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
      .required("Password is required!"),
  })
  .required();

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAuth();
  // const { loading } = useAppSelector(
  //   state => state.authSlice,
  // );

  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmitLogin: SubmitHandler<
    LoginForm
  > = async data => {
    setLoginLoading(true);
    const res: any = await dispatch(
      authActions.login({ data }),
    );

    if (res?.payload.status === 200) {
      setLoginLoading(false);
      return router.push("/my-account/recipients");
    }

    setLoginLoading(false);
    toast.error("Please the check email or password!");
  };

  useEffect(() => {
    if (user?.id) {
      router.push("/my-account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex justify-center md:justify-between">
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="h-screen"
        size="md"
        position="center"
      >
        <div className=" flex max-w-[500px] flex-col px-6 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="font-semibold">
              Cookies disabled!
            </h1>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => setOpenModal(false)}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <p className="mb-2 font-mainText text-sm md:text-base">
            Oops! Looks like you do not have third party
            cookies enabled. Please enable them to sign in
            with social media. OR sign-in manually instead.
          </p>
          <Button
            type="button"
            name="Close"
            onClick={() => setOpenModal(false)}
            bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7]"
            textClass="text-white font-mainText"
            extraClass="w-[140px] shadow-md mx-auto"
          />
        </div>
      </Modal>
      {/* Left */}
      <div className="hidden h-[100%] min-h-screen w-[50%] flex-col items-center justify-between bg-primaryViolet md:flex">
        <div className="md:w-[250px]">
          <Image
            src={Logo}
            alt="gir"
            onClick={() => router.push("/")}
            className="h-full w-full cursor-pointer object-contain md:mt-10"
          />
        </div>
        <div className="">
          <Image
            src={GirlThinking}
            alt="gir"
            className="h-full w-full object-contain md:mt-10"
            // className="lg:w-[400px]"
          />
        </div>
      </div>
      {/* Right */}
      <div className="mt-[30px] flex w-[70%] flex-col md:ml-[30px] md:w-[50%] md:max-lg:mt-[20%] lg:ml-[67px] lg:mt-[50px]">
        <div className="mb-3 max-w-[500px]"></div>
        <div className="mr-auto  mt-6 md:mt-0">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() =>
              (window.location.href =
                "https://futuresurprises.com")
            }
          />
        </div>
        {/* {!isCookiesEnabled && (
          <p
            className="mt-2 max-w-[500px] rounded-lg bg-red-400 py-4 pl-2 text-xs md:mb-4
          md:mt-0 md:text-sm
        "
          >
            Hi there! Please enable third-party cookies in
            your browser to enjoy our site. It’s a quick fix
            for a smoother gifting experience! We are making
            this simpler soon. Thanks for sticking with us!{" "}
            <Link
              href={
                "https://cookie-script.com/knowledge-base/enable-cookies-iphone"
              }
              className="text-blue-900 underline"
            >
              Here is how to do it.
            </Link>{" "}
          </p>
        )} */}
        <div className="mx-auto flex max-w-[334px] flex-col items-start gap-6 pt-14 md:mx-0 md:pt-0">
          <h2 className="heading-gradient mx-auto text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Sign in
          </h2>

          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="flex w-full flex-col gap-4"
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
                  inputClassName="w-full "
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="Password*"
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
            <div className="mx-auto pt-4 md:mx-0">
              <Button
                type="submit"
                isLoading={loginLoading}
                name="Sign in"
                bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7]"
                textClass="text-white font-mainText"
                extraClass="w-[140px] shadow-md "
              />
            </div>
          </form>

          <p className="m-auto font-mainText text-xs md:text-base">
            Or
          </p>

          <button
            onClick={() =>
              (window.location.href = `${process.env.BASE_URL}/store/auth/google`)
            }
            type="button"
            className="flex min-w-[100%] max-w-[380px] items-center justify-center gap-[25px] rounded-[50px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
          >
            <Image
              height={24}
              alt="google"
              width={24}
              src={GoogleIcon}
            />
            Sign in with Google
          </button>
          <button
            onClick={() =>
              (window.location.href = `${process.env.BASE_URL}/store/auth/facebook`)
            }
            type="button"
            className="flex min-w-[100%] max-w-[380px] items-center justify-center rounded-[50px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
          >
            <Image
              height={24}
              alt="facebook"
              width={24}
              src={FacebookIcon}
            />
            <span className="ms-4">
              Sign in with Facebook
            </span>
          </button>

          <div className="flex w-full flex-col items-center gap-4 font-mainText">
            <Link
              className="cursor-pointer text-xs text-primaryViolet md:text-sm"
              href={"/register"}
            >
              Create a New Account for Free
            </Link>
            <Link
              className="cursor-pointer text-xs text-primaryViolet md:text-sm"
              href={"/forgot-password"}
            >
              Forgot password?
            </Link>
            <Link
              className="cursor-pointer text-xs text-primaryViolet md:text-sm"
              href={"/set-password"}
            >
              Don&apos;t have a password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
