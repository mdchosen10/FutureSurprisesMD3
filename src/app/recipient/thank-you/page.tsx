"use client";

import SuccessMessage from "@/components/SuccessMessage";
import { Spinner } from "flowbite-react";
import { useAppDispatch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import * as recipientActions from "@/redux/recipient/actions";
import moment from "moment";

const getNextHoliday = (recipient: any) => {
  let holidays = recipient?.all_holidays?.slice();
  const sorted =
    holidays?.sort(
      (a: any, b: any) =>
        (moment(a?.date) as any) - (moment(b?.date) as any),
    ) || [];

  const currentDate = moment();

  const upcomingHoliday = sorted.find(
    (holiday: any) => moment(holiday?.date) >= currentDate,
  );

  return upcomingHoliday;
};

const RecipientThankYouPage = () => {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipient");
  const dispatch = useAppDispatch();

  const [recipient, setRecipient] = useState<{
    first_name?: string;
    nickname?: string;
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
      <div className="flex h-screen w-full items-center justify-center bg-[#2f1752]">
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
      <div className="flex h-screen w-full items-center justify-center bg-[#2f1752]">
        <p className="font-poppins text-lg text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }
  return (
    <SuccessMessage>
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
      {recipient && (
        <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3 divide-y font-poppins">
          <div className="flex w-full items-center justify-between gap-4 py-2 text-white">
            <p className="">Name:</p>
            <p className="">
              {recipient?.first_name ??
                recipient?.nickname ??
                ""}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 py-2 text-white">
            <p className="">Relationship:</p>
            <p className="">
              {recipient?.relationship ?? ""}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 py-2 text-white">
            <p className="">Next Holiday:</p>
            <p className="">
              {getNextHoliday(recipient)?.name ?? ""}
            </p>
          </div>
        </div>
      )}
    </SuccessMessage>
  );
};

export default RecipientThankYouPage;
