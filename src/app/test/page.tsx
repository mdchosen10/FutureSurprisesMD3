"use client";

import CardForm from "@/components/stripe/CardForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const Page = () => {
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
  return (
    <div>
      <Elements
        options={elementsOptions}
        stripe={stripePromise}
      >
        <CardForm />
      </Elements>{" "}
    </div>
  );
};

export default Page;
