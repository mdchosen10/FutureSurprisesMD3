"use client";
import Image from "next/image";
import TeddyWithGift from "@/../public/images/teddy-with-gift.png";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import TextInput from "./utils/TextInput";
import Button from "./Button";
import TextArea from "./utils/TextArea";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useEffect } from "react";

interface FormInputs {
  name: string;
  email: string;
  phone: number;
  hearAbout?: string;
}

const SignUpSchema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required!"),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^((\S+)@(\S+)\.(\S+))$/, {
        message: "Please enter a valid email address.",
        excludeEmptyString: false,
      }),
    phone: yup
      .number()
      .required("Phone number is required"),
    hearAbout: yup.string(),
  })
  .required();

const SignUpNowForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: number;
    hearAbout?: string;
  }>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  // useEffect(() => {
  //   console.log(errors);

  // },[errors])

  return (
    <div className="flex items-center justify-between pb-14">
      <div>
        <Image src={TeddyWithGift} alt="teddy" />
      </div>
      <div className="flex max-w-[575px] flex-col justify-start gap-5 font-mainText">
        <h2 className="heading-gradient text-[36px] font-semibold">
          Signup Now
        </h2>
        <p>
          Unlock the future of thoughtful gifting. Join
          Future Surprises now and ensure your loved ones
          always receive something special, even if life
          gets too busy. Be the first to know when we launch
          and never miss an occasion again!
        </p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Name"
                    type="text"
                    className="max-w-[275px] rounded-full"
                    errors={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="E-Mail"
                    type="email"
                    className="max-w-[275px] rounded-full"
                    errors={errors.email?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Phone Number"
                  type="number"
                  className="rounded-full"
                  errors={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="hearAbout"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="How did you hear about us?"
                  className="rounded-xl"
                />
              )}
            />

            <p>
              This site is protected by re CAPTCHA and the
              Google{" "}
              <Link href="/" className="text-primaryViolet">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/" className="text-primaryViolet">
                Terms of Service s
              </Link>
              apply.
            </p>

            <Button
              type="submit"
              name="Send"
              bgClass="bg-primary shadow-md"
              textClass="text-white"
              extraClass="max-w-[130px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpNowForm;
