"use client";

import Button from "@/components/shared/Button";
import { useAppDispatch } from "@/hooks";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import * as recipientActions from "@/redux/recipient/actions";
import { Spinner } from "flowbite-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipient");
  const dispatch = useAppDispatch();

  const [recipient, setRecipient] = useState<{
    name?: string;
    relationship?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth - 100,
      height: window.innerHeight - 100,
    });
    setShowConfetti(true);

    const fadeTimeout = setTimeout(
      () => setFadeOut(true),
      5000,
    );
    const hideTimeout = setTimeout(
      () => setShowConfetti(false),
      6000,
    );

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    if (!recipientId) return;

    const fetchRecipient = async () => {
      try {
        const res = await dispatch(
          recipientActions.getRecipient({
            data: recipientId,
          }),
        );
        if (!res || !res.payload || !res.payload.recipient)
          throw new Error("Failed to fetch recipient");
        setRecipient(res.payload?.recipient);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipient();
  }, [recipientId]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner
          aria-label="page-loader"
          size="xl"
          color="white"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="font-poppins text-lg text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <>
      {showConfetti && (
        <div
          className={`pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            gravity={0.2}
          />
        </div>
      )}

      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#2f1752] px-4">
        <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6">
          <h2 className="mb-4 font-lora text-3xl font-bold text-white lg:text-5xl">
            Thank you
          </h2>
          <p className="text-lg text-white">
            Recipient details stored successfully
          </p>

          {recipient && (
            <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3 divide-y">
              <div className="flex w-full items-center justify-between gap-4 py-2 text-white">
                <p className="">Name:</p>
                <p className="">{recipient?.name ?? ""}</p>
              </div>
              <div className="flex w-full items-center justify-between gap-4 py-2 text-white">
                <p className="">Relationship:</p>
                <p className="">
                  {recipient?.relationship ?? ""}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 flex w-full items-center justify-center gap-3">
            <Button
              variant="transparent"
              className="border !bg-white px-5 text-[#2f1752]"
              onClick={() => router.push("/")}
            >
              Go To Home Page
            </Button>
            <Button
              variant="transparent"
              className="border !bg-white px-5 text-[#2f1752]"
              onClick={() =>
                router.push("/my-account/recipients")
              }
            >
              View Recipients
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
