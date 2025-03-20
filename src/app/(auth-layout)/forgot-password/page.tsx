"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import GirlThinking from "@/../public/images/girl-thinking.png";
import Logo from "@/../public/images/logo.png";
import GoBack from "@/../public/icons/go-back.svg";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import TextInputFloating from "@/components/utils/TextInputFloating";
import Button from "@/components/Button";
import * as authActions from "@/redux/auth/actions";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ForgotPasswordForm = {
  email: string;
};

const forgotPasswordSchema = yup
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

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAuth();
  const { loading } = useAppSelector(
    state => state.authSlice,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver<any>(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const options = {
      params: {
        customer_email: data?.email,
      },
    };

    await dispatch(authActions.verifyEmail(options)).then(
      async ({ payload }: any) => {
        if (
          payload.status === 200 &&
          payload?.data?.exists
        ) {
          await dispatch(
            authActions.forgotPassword({ data }),
          ).then(({ payload }: any) => {
            if (payload?.status === 204) {
              toast(
                "Please check the email associated with your account for instructions to reset your password.",
                {
                  icon: "✉️",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "14px",
                  },
                  duration: 9000,
                },
              );
            }
          });
        } else {
          toast.error("Email does not exist!");
        }
      },
    );
  };

  useEffect(() => {
    if (user?.id) {
      router.push("/my-account/user");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center md:justify-between">
      {/* Left */}
      <div className="hidden h-[100%] min-h-screen w-[50%] flex-col items-center justify-between bg-primaryViolet md:flex">
        <div className="md:w-[250px]">
          <Image
            src={Logo}
            alt="gir"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
        <div className="">
          <Image
            src={GirlThinking}
            alt="gir"
            className="h-full w-full object-contain md:mt-10"
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex w-[70%] flex-col md:ml-[30px] md:w-[50%] md:max-lg:mt-[20%] lg:ml-[67px] lg:mt-[130px]">
        <div className="mr-auto  mt-12">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() => router.back()}
          />
        </div>
        <div className="mx-auto flex max-w-[400px] flex-col items-start gap-6 pt-14 md:mx-0 md:pt-0">
          <h2 className="heading-gradient mx-auto text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Forgot password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-[270px] flex-col gap-4"
          >
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
              name="Submit"
              bgClass="bg-primary"
              textClass="text-white"
              extraClass="w-[140px] shadow-md mx-auto md:mx-0"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
