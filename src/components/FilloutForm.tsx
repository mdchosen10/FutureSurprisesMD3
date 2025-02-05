"use client";

import React, { useState } from "react";
import { FilloutStandardEmbed } from "@fillout/react";
import "@fillout/react/style.css";
import useSessionId from "../hooks/useSessionId";
import useWebSocket from "../hooks/useWebSocket";
import { getToken } from "../lib/utils";
import CardForm from "./stripe/CardForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/hooks/useAuth";
import Button from "./shared/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "./shared/Spinner";

const FilloutForm = () => {
  const uniqueId = useSessionId();
  const { data } = useWebSocket(uniqueId);
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const user = useAuth();
  const router = useRouter();

  const stripePromise = loadStripe(
    process.env.STRIPE_PUBLISHABLE_KEY || "",
  );

  const elementsOptions: object = {
    appearance: {
      theme: "stripe",
      variables: {
        colorText: "#fff",
      },
    },
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const storedData = JSON.parse(
        localStorage.getItem("formData") ?? "{}",
      );
      const token = localStorage.getItem("user_token");
      const response = await fetch(
        `${process.env.BASE_URL}/create-customer-and-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...storedData,
          }),
        },
      );

      const final = await response.json();
      if (final && final?.success) {
        setLoading(false);
        localStorage.removeItem("formData");
        localStorage?.setItem("user_token", final?.token);
        toast.success(
          "Recipient details stored successfully",
        );
        return router.push("/my-account/recipients");
      } else {
        setLoading(false);
        localStorage.removeItem("formData");
        toast.error("Failed to store recipient details");
        router.push("/surprise");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Failed to store recipient details");
    }
  };

  if (uniqueId)
    return (
      <div className="w-full flex-1">
        {data && data?.success ? (
          user?.id ? (
            <div className="flex h-full flex-col items-center justify-center">
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="mx-auto !px-10 py-5 text-lg font-bold text-white"
                disabled={loading}
              >
                Continue
                {loading ? <Spinner /> : ""}
              </Button>
            </div>
          ) : (
            <div className="">
              <Elements
                options={elementsOptions}
                stripe={stripePromise}
              >
                <CardForm />
              </Elements>
            </div>
          )
        ) : (
          <FilloutStandardEmbed
            filloutId="waqaT46BZLus"
            parameters={{
              sessionId: uniqueId,
              authToken: token,
            }}
          />
        )}
      </div>
    );
};

export default FilloutForm;
