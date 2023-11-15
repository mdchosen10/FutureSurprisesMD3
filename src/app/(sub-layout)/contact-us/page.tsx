"use client";

import React from "react";
import * as yup from "yup";
import Image from "next/image";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button";
import Teddy from "../../../../public/images/teddy-with-gift.png";
import TextInput from "@/components/utils/TextInput";

const ContactUsFormSchema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .required("First name is required!"),
    last_name: yup.string(),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required!"),
    phone: yup
      .string()
      .required("Phone is required!")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid phone number.",
        excludeEmptyString: false,
      }),
    message: yup.string(),
    likeTo: yup.string(),
    reachMe: yup.string(),
  })
  .required();

const ContactUs = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      likeTo: "",
      reachMe: "",
      message: "",
      phone: "",
    },
    resolver: yupResolver(ContactUsFormSchema),
  });

  const onSubmit: SubmitHandler<any> = () => {
    // api call
  };

  const { likeTo, reachMe } = watch();
  const likeToOptions = [
    { label: "Contact Customer Support", value: "contact" },
    { label: "Become  a Vendor", value: "vendor" },
  ];
  const reachMeOptions = [
    { label: "Phone", value: "phone" },
    { label: "Email", value: "email" },
  ];

  return (
    <div className="mx-auto mt-0 flex w-full flex-col gap-[40px] px-3 py-[60px] font-[600] md:px-5 lg:my-[96px] lg:flex-row lg:px-10 3xl:px-0">
      <div className="mx-auto w-full lg:w-[40%] lg:pt-[50px]">
        <Image className="mx-auto" src={Teddy} alt="" />
      </div>
      <div className="mx-auto flex w-full flex-col lg:w-[60%]">
        <h1 className="heading-gradient mb-[25px] text-[30px] font-bold lg:text-[36px]">
          Contact Us
        </h1>
        <div className="">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-3"
          >
            <div className="flex w-full gap-3">
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="First Name"
                    type="text"
                    errors={errors.first_name?.message}
                    className="w-full rounded-[50px] border border-[#6C6672] px-[25px] py-[12px] font-mainText font-[400] placeholder:text-[#2C2434]"
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Last Name"
                    type="text"
                    errors={errors.last_name?.message}
                    className="w-full rounded-[50px] border border-[#6C6672] px-[25px] py-[12px] font-mainText font-[400] placeholder:text-[#2C2434]"
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
                  type="text"
                  errors={errors.phone?.message}
                  className="w-full rounded-[50px] border border-[#6C6672] px-[25px] py-[12px] font-mainText font-[400] placeholder:text-[#2C2434]"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Email"
                  type="email"
                  errors={errors.email?.message}
                  className="w-full rounded-[50px] border border-[#6C6672] px-[25px] py-[12px] font-mainText font-[400] placeholder:text-[#2C2434]"
                />
              )}
            />
            <p className="my-[15px] font-mainText font-[400] text-[#2C2434]">
              I would like to…
            </p>
            {likeToOptions?.map(option => (
              <div key={option.value} className="mb-[15px]">
                <label
                  className={`flex items-center gap-3 font-mainText font-[400] ${
                    likeTo === option?.value
                      ? "text-[#A93CC9]"
                      : "text-[#2C2434]"
                  }`}
                >
                  <Controller
                    name="likeTo"
                    control={control}
                    render={() => (
                      <input
                        className="radio-group-input"
                        type="radio"
                        onClick={() => {
                          if (likeTo !== option?.value) {
                            setValue(
                              "likeTo",
                              option?.value,
                            );
                          } else {
                            setValue("likeTo", "");
                          }
                        }}
                        checked={likeTo === option?.value}
                        onChange={() => {
                          if (likeTo !== option?.value) {
                            setValue(
                              "likeTo",
                              option?.value,
                            );
                          } else {
                            setValue("likeTo", "");
                          }
                        }}
                      />
                    )}
                  />
                  {option.label}
                </label>
              </div>
            ))}

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Message"
                  className="my-5 h-[94px] w-full rounded-[20px] border border-[#6C6672] px-[25px] py-[12px] font-mainText font-[400] placeholder:text-[#2C2434]"
                />
              )}
            />

            <p className="my-[15px] font-mainText font-[400] text-[#2C2434]">
              Best way to reach me:{" "}
            </p>

            {reachMeOptions?.map(option => (
              <div key={option.value} className="mb-[15px]">
                <label
                  className={`flex items-center gap-3 font-mainText font-[400] ${
                    reachMe === option?.value
                      ? "text-[#A93CC9]"
                      : "text-[#2C2434]"
                  }`}
                >
                  <Controller
                    name="reachMe"
                    control={control}
                    render={() => (
                      <input
                        className="radio-group-input"
                        type="radio"
                        onClick={() => {
                          if (reachMe !== option?.value) {
                            setValue(
                              "reachMe",
                              option?.value,
                            );
                          } else {
                            setValue("reachMe", "");
                          }
                        }}
                        checked={reachMe === option?.value}
                        onChange={() => {
                          if (reachMe !== option?.value) {
                            setValue(
                              "reachMe",
                              option?.value,
                            );
                          } else {
                            setValue("reachMe", "");
                          }
                        }}
                      />
                    )}
                  />
                  {option.label}
                </label>
              </div>
            ))}

            <div className="mx-auto pt-4 md:mx-0">
              <Button
                type="submit"
                isLoading={false}
                name="Send"
                bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7]"
                textClass="text-white"
                extraClass="w-[140px] shadow-md "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
