"use client";

import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { registerFormInputs } from "@/app/(auth-layout)/register/page";
import DatePicker from "react-datepicker";
import CheckboxInput from "../utils/Checkbox";
import Button from "../Button";
import { useAppDispatch } from "@/hooks";
import * as authActions from "@/redux/auth/actions";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import { APIDateFormat } from "@/helpers";
import TextInputFloating from "../utils/TextInputFloating";
import toast from "react-hot-toast";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

export const updateAccountDetailsSchema = yup
  .object()
  .shape({
    fName: yup.string().required("First name is required!"),
    lName: yup
      .string()
      .required("Last n  ame is required!"),
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
      .matches(
        /^(\(\d{3}\)|\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
        {
          message: "Please enter valid phone number.",
          excludeEmptyString: false,
        },
      ),
    dob: yup.string().required("DOB is required!"),
  })
  .required();

const UserDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAuth();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<registerFormInputs>({
    resolver: yupResolver<any>(updateAccountDetailsSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedNotifications, setSelectedNotifications] =
    useState<Array<string>>([]);

  const onSubmit: SubmitHandler<
    registerFormInputs
  > = async data => {
    setLoading(true);
    const reqData = {
      first_name: data.fName,
      last_name: data.lName,
      email: data.email,
      phone: data.phone,
      metadata: {
        stripe_id: user?.metadata?.stripe_id || "",
        birthdate: moment(data.dob).format(APIDateFormat),
        notifications:
          selectedNotifications.length > 1
            ? "both"
            : selectedNotifications.join(""),
      },
    };
    const res: any = await dispatch(
      authActions.updateMedusaCustomerAccount({
        data: reqData,
      }),
    );
    if (res?.payload?.request?.status === 200) {
      fetchUser();
      toast.success(
        "Account details updated successfully.",
      );
      router.push("/my-account/recipients");
    }
    setLoading(false);
  };

  const onSelectReachMeOption = (
    notificationType: string,
  ) => {
    if (
      selectedNotifications.at(0) === "both" &&
      notificationType === "email"
    ) {
      return setSelectedNotifications(["phone"]);
    } else if (
      selectedNotifications.at(0) === "both" &&
      notificationType === "phone"
    ) {
      return setSelectedNotifications(["email"]);
    }
    const newNames = selectedNotifications?.includes(
      notificationType,
    )
      ? selectedNotifications?.filter(
          name => name !== notificationType,
        )
      : [
          ...(selectedNotifications ?? []),
          notificationType,
        ];
    setSelectedNotifications(newNames);
  };

  const fetchUser = useCallback(async () => {
    await dispatch(authActions.getCustomer()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user?.id) {
      setValue("fName", user.first_name);
      setValue("lName", user.last_name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      user?.metadata?.birthdate &&
        setValue("dob", new Date(user.metadata.birthdate));
      setSelectedNotifications([
        user?.metadata?.notifications,
      ]);
    }
  }, [setValue, user?.id]);

  return (
    <>
      <div className="hidden w-full justify-between border-b border-[#A93CC940] pb-[10px] md:px-5 lg:flex">
        <h1 className="heading-gradient text-[24px] font-[700]">
          Account Details
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-2 font-mainText md:px-6 md:py-6"
      >
        <div className="grid w-full max-w-[500px] gap-2 text-xs md:gap-6 md:text-sm lg:grid-cols-2">
          <Controller
            name="fName"
            control={control}
            render={({ field }) => (
              <TextInputFloating
                {...field}
                placeholder="First name*"
                type="text"
                errors={errors.fName?.message}
                inputClassName="w-full"
              />
            )}
          />

          <Controller
            name="lName"
            control={control}
            render={({ field }) => (
              <TextInputFloating
                {...field}
                placeholder="Last name*"
                type="text"
                errors={errors.lName?.message}
                inputClassName="w-full"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInputFloating
                {...field}
                placeholder="Email Address*"
                type="email"
                errors={errors.email?.message}
                inputClassName="w-full"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInputFloating
                {...field}
                placeholder="Phone Number*"
                type="phone"
                errors={errors.phone?.message}
                inputClassName="w-full"
              />
            )}
          />

          <div className=" col-span-2 hidden max-w-[240px] items-center gap-2 md:flex">
            <p className="hidden md:block">Birth Date*</p>
            <div className="ml-auto max-w-[140px]">
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="max-w-[238px] rounded-lg border border-gray-300 !px-2 text-sm"
                    showPopperArrow={false}
                    placeholderText="Pick date"
                    maxDate={null}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    customInput={
                      <input className="example-custom-input rounded-lg border border-gray-300" />
                    }
                    selected={field.value}
                    onChange={(date: Date) =>
                      field.onChange(date)
                    }
                  />
                )}
              />
              <p className="pt-1 text-xs text-red-600">
                {errors.dob?.message}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 pt-4 md:hidden">
          <p className="text-xs">Birth Date*</p>
          <div className="w-[266px]">
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="h-55px w-full rounded-lg border border-gray-300 !px-2 text-sm"
                  showPopperArrow={false}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={
                    <input className="example-custom-input rounded-lg border border-gray-300" />
                  }
                  selected={field.value}
                  onChange={(date: Date) =>
                    field.onChange(date)
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-6 pt-2 text-xs md:text-base">
          <p>Best way to reach me:</p>
          <div className="flex gap-5">
            <CheckboxInput
              checked={
                selectedNotifications.includes("phone") ||
                selectedNotifications.includes("both")
              }
              onChange={() =>
                onSelectReachMeOption("phone")
              }
              label="Phone Number"
            />

            <CheckboxInput
              label="Email"
              checked={
                selectedNotifications.includes("email") ||
                selectedNotifications.includes("both")
              }
              onChange={() =>
                onSelectReachMeOption("email")
              }
            />
          </div>
        </div>

        <div className="col-span-2 flex gap-2 md:gap-6 lg:min-w-[330px]">
          <Button
            type="submit"
            name="Save"
            disabled={loading}
            isLoading={loading}
            bgClass="font-medium bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md px-[10px] py-[12px] md:px-[25px] md:py-[15px] text-xs md:text-base"
            textClass="text-white"
            extraClass="flex justify-center items-center md:gap-2"
          />
        </div>
      </form>
    </>
  );
};

export default UserDetails;
