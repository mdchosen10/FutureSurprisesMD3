import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputFloating from "@/components/utils/TextInputFloating";
import Button from "@/components/Button";

const otpPasswordSchema = yup
  .object()
  .shape({
    otp: yup
      .string()
      .required("OTP is required!")
      .length(4, "OTP must be 4 digits"),
  })
  .required();

type OtpPasswordFormProps = {
  /* eslint-disable no-unused-vars */
  onSubmit: (data: { otp: string }) => void;
  loading: boolean;
};

const OtpPasswordForm = ({
  onSubmit,
  loading,
}: OtpPasswordFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(data =>
        onSubmit({
          otp: data.otp,
        }),
      )}
      className="flex w-full max-w-[270px] flex-col gap-4"
    >
      <label className="text-left">Enter the OTP</label>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <TextInputFloating
            {...field}
            placeholder="OTP*"
            type="text"
            errors={errors.otp?.message}
            inputClassName="w-full"
          />
        )}
      />

      <Button
        type="submit"
        isLoading={loading}
        disabled={loading}
        name="Sign in"
        bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7]"
        textClass="text-white"
        extraClass="w-[140px] shadow-md mx-auto md:mx-0"
      />
    </form>
  );
};

export default OtpPasswordForm;
