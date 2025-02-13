"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import GirlThinking from "@/../public/images/girl-thinking.png";
import Logo from "@/../public/images/new_log_big.png";
import GoogleIcon from "@/../public/icons/google.svg";
import FacebookIcon from "@/../public/icons/facebook.svg";
import EmailIcon from "@/../public/icons/email.svg";

import GoBack from "@/../public/icons/go-back.svg";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import Button from "@/components/Button";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Modal } from "flowbite-react";
import CloseIcon from "@/../public/icons/close-violet.svg";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const user = useAuth();
  const next = searchParams.get("next") || null;

  // const { loading } = useAppSelector(
  //   state => state.authSlice,
  // );

  const [openModal, setOpenModal] = useState(false);

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
      <div className="flex w-[70%] flex-1 flex-col items-center justify-center md:w-[50%]">
        <div className="mx-auto mb-3 max-w-[500px]"></div>
        <div className="mr-auto  mt-6 md:mt-0">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() =>
              (window.location.href =
                window.location.origin)
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
        <div className="mx-auto flex w-full max-w-[500px] flex-col items-start gap-6 border p-10 shadow-md md:mx-0 lg:px-20">
          <h2 className="heading-gradient mx-auto w-full text-center text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Sign in with
          </h2>

          <button
            onClick={() => {
              if (next && next == "surprise") {
                window.location.href = `${process.env.BASE_URL}/store/auth/google?redirectTo=${window.location.origin}/surprise`;
              } else {
                window.location.href = `${process.env.BASE_URL}/store/auth/google`;
              }
            }}
            type="button"
            className="flex min-w-[100%] max-w-[380px] items-center justify-center rounded-[10px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
          >
            <Image
              height={18}
              alt="google"
              width={18}
              src={GoogleIcon}
            />
            <span className="ms-2">Google</span>
          </button>
          <button
            onClick={() => {
              if (next && next == "surprise") {
                window.location.href = `${process.env.BASE_URL}/store/auth/facebook?redirectTo=${window.location.origin}/surprise`;
              } else {
                window.location.href = `${process.env.BASE_URL}/store/auth/facebook`;
              }
            }}
            type="button"
            className="flex min-w-[100%] max-w-[380px] items-center justify-center rounded-[10px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
          >
            <Image
              height={18}
              alt="facebook"
              width={18}
              src={FacebookIcon}
            />
            <span className="ms-2">Facebook</span>
          </button>
          <p className="m-auto font-mainText text-xs md:text-base">
            Or
          </p>
          <button
            onClick={() => {
              if (next && next == "surprise") {
                router.push("/get-email-otp?next=surprise");
              } else {
                router.push("/get-email-otp");
              }
            }}
            type="button"
            className="flex min-w-[100%] max-w-[380px] items-center justify-center rounded-[10px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
          >
            <Image
              height={18}
              alt="email"
              width={18}
              src={EmailIcon}
            />
            <span className="ms-2">Get email OTP</span>
          </button>

          <div className="flex w-full flex-col items-center gap-4 font-mainText">
            <Link
              className="cursor-pointer text-center text-xs text-primaryViolet md:text-sm"
              href={"/surprise"}
            >
              New user ? Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
