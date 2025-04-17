"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = ({
  message = "Recipient added successfully.",
  link = "/my-account/recipients",
  classNames = "bg-[#2f1752] text-white",
  children,
}: {
  message?: string;
  link?: string;
  classNames?: string;
  children?: ReactNode;
}) => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      router.push(link);
    }
  }, [countdown, router]);

  return (
    <div
      className={`flex h-[calc(100vh-100px)] w-full items-center justify-center ${classNames}`}
    >
      <div className="flex flex-col items-center gap-6 p-6 font-noto">
        <FaCheckCircle size={72} />
        <h1 className="text-center font-mainHeading text-2xl font-bold lg:text-4xl">
          {message}
        </h1>
        {children}
        <p className="text-lg lg:text-xl">
          You will be redirected in {countdown} second
          {countdown !== 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
