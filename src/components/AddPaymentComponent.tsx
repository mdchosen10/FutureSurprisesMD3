"use client";

import {
  AddressElement,
  Elements,
} from "@stripe/react-stripe-js";
import {
  StripeAddressElementOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { AddPaymentMethod } from "@/components/stripe/AddPaymentMethod";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import SuccessMessage from "./SuccessMessage";

const stripePromise: any = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY || "",
);

function AddPaymentComponent({
  onCancel,
}: {
  showButton: boolean;
  onCancel: () => void;
}) {
  const { user } = useAppSelector(state => state.authSlice);
  const path = usePathname()?.split("/").slice(-1)[0];
  const [clientSecret, setClientSecret] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);

  const elementsOptions: Object = {
    // mode: "payment",
    // amount: 1099,
    clientSecret,
    currency: "usd",
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#A93CC9",
        colorText: "#2C2434",
      },
    },
  };

  const addressOptions: StripeAddressElementOptions = {
    mode: "billing",
    allowedCountries: ["US"],
    blockPoBox: true,
    fields: {
      phone: "always",
    },
    validation: {
      phone: {
        required: "never",
      },
    },
  };

  useEffect(() => {
    const createSetupIntent = (stripe_id: string) => {
      fetch(
        `${process.env.BASE_URL}/store/customers/createStripeSetupIntent`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stripe_id: stripe_id,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          setClientSecret(data.setupIntent.client_secret);
          setLoading(false);
        });
    };
    if (user?.metadata?.stripe_id) {
      createSetupIntent(user?.metadata?.stripe_id);
    }
  }, [user?.metadata?.stripe_id]);

  const handleSubmit = async (reqData: any) => {
    const res: any = await dispatch(
      authActions.updateMedusaCustomerAccount({
        data: reqData,
      }),
    );

    if (res?.payload?.status === 200) {
      toast.success("Payment details saved successfully.");
      setSuccess(true);
    } else {
      toast.error("Failed to save payment details.");
      setSuccess(false);
    }
  };

  return success ? (
    <SuccessMessage
      message="Payment details saved successfully."
      link="/my-account/payment"
      classNames="bg-white text-primary"
    />
  ) : (
    <div className="p-5 lg:p-10">
      {loading && path !== "add-payment-details" ? (
        <div className="flex w-full p-5">
          <Spinner size="lg" color="pink" />
        </div>
      ) : (
        <div className="">
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={elementsOptions}
            >
              <div className="flex w-[300px] flex-col gap-3 md:w-[500px] ">
                <div className="flex w-full items-center gap-10 pb-4 md:pb-8">
                  <h1 className="heading-gradient text-center font-mainHeading text-3xl font-bold phone:text-left md:text-4xl">
                    Add Payment Method
                  </h1>
                </div>
                <AddressElement options={addressOptions} />
                <AddPaymentMethod
                  onSubmit={handleSubmit}
                  clientSecret={clientSecret}
                  render={() => (
                    <Button
                      name="Cancel"
                      onClick={onCancel}
                      bgClass="font-mainText bg-primary text-white px-[25px] h-fit !py-2 lg:py-[15px] hover:shadow-md"
                    />
                  )}
                />
              </div>
            </Elements>
          )}
        </div>
      )}
    </div>
  );
}

export default AddPaymentComponent;
