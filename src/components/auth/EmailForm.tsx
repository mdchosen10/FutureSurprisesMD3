import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputFloating from "@/components/utils/TextInputFloating";
import Button from "@/components/Button";

const emailSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^((\S+)@(\S+)\.(\S+))$/, {
        message: "Please enter a valid email address.",
        excludeEmptyString: false,
      }),
  })
  .required();

type EmailFormProps = {
  /* eslint-disable no-unused-vars */
  onSubmit: (email: string) => void;
  loading: boolean;
};

const EmailForm = ({
  onSubmit,
  loading,
}: EmailFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(data => onSubmit(data.email))}
      className="flex w-full max-w-[270px] flex-col gap-4"
    >
      <label className="text-left">
        Enter your registered email
      </label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInputFloating
            {...field}
            placeholder="Email*"
            type="email"
            errors={errors.email?.message}
            inputClassName="w-full lg:max-w-[240px]"
          />
        )}
      />
      <Button
        type="submit"
        isLoading={loading}
        disabled={loading}
        name="Get OTP"
        bgClass="bg-primary"
        textClass="text-white"
        extraClass="w-[140px] shadow-md mx-auto md:mx-0"
      />
    </form>
  );
};

export default EmailForm;
