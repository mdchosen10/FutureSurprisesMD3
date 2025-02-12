"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../shared/Spinner";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextInput from "../utils/TextInput";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneNumberInput from "../utils/PhoneNumberInput";

export interface CustomerSchema {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const customerSchema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .required("First name is required"),
    last_name: yup
      .string()
      .required("Last name is required"),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^((\S+)@(\S+)\.(\S+))$/, {
        message: "Please enter a valid email address.",
        excludeEmptyString: false,
      }),
    phone: yup
      .string()
      .required("Phone is required!")
      .test({
        name: "validate-phone-number",
        test: (value: string, { createError }) => {
          if (isPossiblePhoneNumber(value)) {
            return true;
          }
          return createError({
            message: "Enter a valid phone number",
          });
        },
      }),
  })
  .required();

const cardElementOptions = {
  style: {
    base: {
      padding: "100px",
      color: "#fff",
      fontSize: "16px",
      "::placeholder": {
        color: "#fff",
      },
      border: "1px solid #fff",
    },

    invalid: {
      color: "#ff0000",
    },
  },
  hidePostalCode: true, // Optional: Hides the postal code field
};
const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<
    CustomerSchema
  > = async data => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card Element not found");
      return;
    }
    setLoading(true);

    const { error, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (error) {
      setLoading(false);
      toast.error(
        error.message ?? "Failed to create payment method",
      );
      return;
    }

    try {
      const formData = JSON.parse(
        sessionStorage.getItem("formData") || "{}",
      );
      const response = await fetch(
        `${process.env.BASE_URL}/create-customer-and-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data?.email,
            first_name: data?.first_name,
            last_name: data?.last_name,
            phone: data?.phone,
            paymentMethodId: paymentMethod.id,
            ...formData,
          }),
        },
      );

      const final = await response.json();
      if (final && final?.success && final?.token) {
        setLoading(false);
        setSuccess(true);
        sessionStorage.removeItem("formData");
        sessionStorage.removeItem("redirect");
        localStorage?.setItem("user_token", final?.token);
        toast.success(
          "Recipient details stored successfully",
        );
        return router.push("/my-account/recipients");
      } else {
        setLoading(false);
        sessionStorage.removeItem("formData");
        sessionStorage.removeItem("redirect");
        toast.error("Failed to store recipient details");
        router.push("/surprise");
      }
    } catch (err) {
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("redirect");
      setLoading(false);
      toast.error("Failed to store recipient details");
      router.push("/surprise");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#2f1752] px-5 lg:px-20">
      {success ? (
        <div className="flex w-full flex-col items-center justify-center gap-3 pt-20">
          <h2 className="text-3xl font-bold text-white">
            Thank you{" "}
          </h2>
          <p className="text-lg text-white">
            Recipient details stored successfully
          </p>
          <Button
            variant="transparent"
            className="border !bg-white px-5 text-[#2f1752]"
            onClick={() => {
              router.push("/");
            }}
          >
            Go To Home Page
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-20 flex max-w-3xl flex-col gap-3 p-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-left font-poppins text-3xl font-bold text-white">
              Start Your Surprise Journey
            </h2>
            <h2 className="text-left font-poppins text-white">
              Please enter the following details to start
              surprising your loved ones.
            </h2>
          </div>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="First Name*"
                type="text"
                className="my-3 w-full rounded-full border bg-[#422c62] px-5 py-2 text-white focus:ring-0"
                errors={errors?.first_name?.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Last Name*"
                type="text"
                className="my-3 w-full rounded-full border bg-[#422c62] px-5 py-2 text-white focus:ring-0"
                errors={errors?.last_name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Email*"
                type="email"
                className="my-3 w-full rounded-full border bg-[#422c62] px-5 py-2 text-white focus:ring-0"
                errors={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneNumberInput
                value={field.value}
                placeholder="Phone Number*"
                defaultCountry="US"
                onChange={field.onChange}
                errors={errors.phone?.message}
                isRounded
              />
            )}
          />
          <label className="text-white">
            Enter Card Details
          </label>
          <div className="flex flex-col gap-6 rounded-md border border-white bg-[#422c62] px-5 py-3">
            <CardElement options={cardElementOptions} />
          </div>
          <small className="mt-3 text-xs text-[#ffeeee]">
            By providing your card information, you allow
            Future Surprises to charge your card for future
            payments in accordance with their terms.
          </small>
          <button
            className="ml-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-black hover:shadow-md disabled:cursor-not-allowed"
            type="submit"
            disabled={!stripe || loading}
          >
            Submit
            {loading ? <Spinner /> : ""}
          </button>

          <p className="text-end font-poppins text-white">
            Already have an account ?{" "}
            <Button
              onClick={() => {
                sessionStorage.setItem("redirect", "true");
                router.push("/login?next=surprise");
              }}
              className="!bg-transparent !px-1 hover:underline"
            >
              login here
            </Button>
          </p>
        </form>
      )}
    </div>
  );
};

export default CardForm;
