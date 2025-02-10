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
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import OtpPasswordForm from "@/components/auth/OtpPasswordForm";
import EmailForm from "@/components/auth/EmailForm";
import { useAppDispatch } from "@/hooks";
import * as authActions from "@/redux/auth/actions";

const SetPassword = () => {
  const router = useRouter();
  const user = useAuth();
  const [email, setEmail] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || null;

  const handleEmailSubmit = async (email: string) => {
    try {
      // API call to send OTP
      setLoading(true);
      const response = await fetch(
        `${process.env.BASE_URL}/get-email-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const result = await response.json();
      setLoading(false);
      if (result.success) {
        setEmail(email);
        setShowOtpForm(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleSetPassword = async (data: {
    otp: string;
  }) => {
    try {
      // API call to verify OTP and set password
      setSubmitting(true);
      const response = await fetch(
        `${process.env.BASE_URL}/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp: data.otp,
          }),
        },
      );
      const result = await response.json();
      setSubmitting(false);
      if (result.success) {
        localStorage.setItem("user_token", result?.token);
        await dispatch(authActions.getCurrentCustomer());
        toast.success("OTP verified successfully");
        if (next && next == "surprise") {
          router.push("/surprise");
        } else {
          router.push("/my-account");
        }
      } else {
        toast.error("Invalid OTP or something went wrong");
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user?.id) {
      router.push("/my-account/user");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center md:justify-between">
      {/* Left */}
      <div className="hidden h-[100%] min-h-screen w-[50%] flex-col items-center justify-between bg-primaryViolet md:flex">
        <div className="md:w-[250px]">
          <Image
            src={Logo}
            alt="logo"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
        <div className="">
          <Image
            src={GirlThinking}
            alt="thinking"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex max-h-screen w-[70%] flex-col md:ml-[30px] md:w-[50%]">
        <div className="mr-auto mt-12">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() => router.back()}
          />
        </div>
        <div className="mx-auto my-auto flex max-w-[400px] flex-col justify-center gap-6 border p-10 pt-14 lg:px-20">
          <h2 className="heading-gradient mx-auto w-full text-center text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Sign in
          </h2>

          {!showOtpForm ? (
            <EmailForm
              onSubmit={handleEmailSubmit}
              loading={loading}
            />
          ) : (
            <OtpPasswordForm
              onSubmit={handleSetPassword}
              loading={submitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
