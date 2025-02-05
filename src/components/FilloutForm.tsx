"use client";

import React from "react";
import { FilloutStandardEmbed } from "@fillout/react";
import "@fillout/react/style.css";
import useSessionId from "../hooks/useSessionId";
import useWebSocket from "../hooks/useWebSocket";
import { getToken } from "../lib/utils";
import CardForm from "./stripe/CardForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const FilloutForm = () => {
  const uniqueId = useSessionId();
  const { data } = useWebSocket(uniqueId);
  const token = getToken();
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

  if (uniqueId)
    return (
      <div className="w-full">
        {data && data?.success ? (
          <div className="">
            <Elements
              options={elementsOptions}
              stripe={stripePromise}
            >
              <CardForm />
            </Elements>
          </div>
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
