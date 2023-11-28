"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks";
import * as authActions from "@/redux/auth/actions";
import { useRouter } from "next/navigation";

export const AddPaymentMethod = ({
  clientSecret,
  render,
}: any) => {
  const stripe: any = useStripe();
  const dispatch = useAppDispatch();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<any>(null);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    await elements.submit();

    const response = await stripe.confirmSetup({
      elements,
      clientSecret,
      redirect: "if_required",
    });

    if (response.error) {
      setErrorMessage(response.error.message);
      toast.error(response.error.message);
      setLoading(false);
    } else {
      const reqData = {
        metadata: {
          payment_method_id:
            response?.setupIntent?.payment_method || "",
        },
      };

      const res: any = await dispatch(
        authActions.updateMedusaCustomerAccount({
          data: reqData,
        }),
      );

      if (res?.payload?.status === 200) {
        toast.success(
          "Payment details saved successfully.",
        );
        router.push("/my-account/recipients");
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <PaymentElement />
      <div className="flex gap-4">
        <Button
          name="Confirm"
          type="submit"
          disabled={loading || !stripe || !elements}
          bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
          textClass="text-white font-mainText"
          extraClass="px-6"
          isLoading={loading}
        />
        {render && render()}
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
