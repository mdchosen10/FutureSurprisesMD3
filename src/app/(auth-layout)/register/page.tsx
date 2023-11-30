"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import GirlThinking from "@/../public/images/girl-thinking.png";
import Logo from "@/../public/images/new_log_big.png";
import GoBack from "@/../public/icons/go-back.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import TextInputFloating from "@/components/utils/TextInputFloating";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import * as authActions from "@/redux/auth/actions";
import moment from "moment";
import { APIDateFormat } from "@/helpers";
import toast from "react-hot-toast";
import RightArrow from "@/../public/icons/right-arrow.svg";
import GoogleIcon from "@/../public/icons/google.svg";
import FacebookIcon from "@/../public/icons/facebook.svg";
import CloseIcon from "@/../public/icons/close-violet.svg";

import { Modal } from "flowbite-react";

export interface registerFormInputs {
  fName: string;
  lName: string;
  email: string;
  phone: string | undefined;
  password?: string;
  dob: string | Date;
}

const registerSchema = yup
  .object()
  .shape({
    fName: yup.string().required("First name is required!"),
    lName: yup.string().required("Last name is required!"),
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
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 character long")
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password should contain at least one lowercase character.",
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password should contain at least one uppercase character.",
      )
      .matches(
        RegExp("(.*\\d.*)"),
        "Password should contain at least one number.",
      ),
    // .matches(
    //   RegExp('[!@#$%^&*(),.?":{}|<>]'),
    //   "Password should contain at least one special character.",
    // ),
    dob: yup.string().required("DOB is required!"),
  })
  .required();

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedNotifications] = useState<Array<string>>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [
    addRecipientBtnLoading,
    setAddRecipientBtnLoading,
  ] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] =
    useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<registerFormInputs>({
    resolver: yupResolver<any>(registerSchema),
  });

  const onSubmit: SubmitHandler<registerFormInputs> =
    useCallback(
      async (data: any, btnType: any = "") => {
        if (btnType === "saveForLater") {
          setLoading(true);
        } else {
          setAddRecipientBtnLoading(true);
        }

        const medusaCustomerAccReqData = {
          first_name: data.fName,
          last_name: data.lName,
          email: data.email,
          password: data.password,
          phone: data.phone,
        };

        const medusaAccRes: any = await dispatch(
          authActions.register({
            data: medusaCustomerAccReqData,
          }),
        );

        let stripeAccRes: any = {};

        if (medusaAccRes?.payload?.customer?.id) {
          await dispatch(
            authActions.login({
              data: {
                email: data.email,
                password: data.password,
              },
            }),
          );

          const stripeCustomerAccountReqData = {
            medusa_id: medusaAccRes?.payload?.customer?.id,
          };
          stripeAccRes = await dispatch(
            authActions.createStripeCustomerAccount({
              data: stripeCustomerAccountReqData,
            }),
          );
        }

        let medusaAccUpdatedRes: any = {};

        if (stripeAccRes?.payload?.customer?.id) {
          const updateMedusaCustomerAccReqData = {
            metadata: {
              stripe_id: stripeAccRes?.payload.customer?.id,
              birthdate: moment(data.dob).format(
                APIDateFormat,
              ),
              notifications:
                selectedNotifications.length > 1
                  ? "both"
                  : selectedNotifications.join(""),
            },
          };

          medusaAccUpdatedRes = await dispatch(
            authActions.updateMedusaCustomerAccount({
              data: updateMedusaCustomerAccReqData,
            }),
          );
        }

        if (medusaAccUpdatedRes?.payload?.status === 200) {
          setShowIframe(true);
          toast.success("Account created successfully.");
          setLoading(false);
          setAddRecipientBtnLoading(false);
          btnType === "saveForLater"
            ? router.push("/my-account/user")
            : router.push("/add-or-edit-recipient");
          return;
        }

        toast.error("Something went wrong.");
        setLoading(false);
        setAddRecipientBtnLoading(false);
      },
      [dispatch, router, selectedNotifications],
    );

  const watchEmail = watch("email");

  const checkEmailAlreadyRegisteredDebounced =
    useCallback(async () => {
      const options = {
        params: {
          customer_email: watchEmail || "",
        },
      };

      await dispatch(authActions.verifyEmail(options)).then(
        async ({ payload }: any) => {
          if (
            payload.status === 200 &&
            payload?.data?.exists
          ) {
            setError("email", {
              type: "custom",
              message:
                "This email address is already registered with us, please login!",
            });
            setAlreadyRegistered(true);
          } else {
            setAlreadyRegistered(false);
            clearErrors(["email"]);
          }
        },
      );
    }, [clearErrors, dispatch, setError, watchEmail]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkEmailAlreadyRegisteredDebounced();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [checkEmailAlreadyRegisteredDebounced, watchEmail]);

  return (
    <div className="flex justify-center md:justify-between">
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="h-screen"
        size="md"
        position="center"
      >
        <div className=" flex max-w-[500px] flex-col px-6 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="font-semibold">
              Cookies disabled!
            </h1>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => setOpenModal(false)}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <p className="mb-2 font-mainText text-sm md:text-base">
            Oops! Looks like you do not have third party
            cookies enabled. Please enable them to sign in
            with social media. OR sign-in manually instead.
          </p>
          <Button
            type="button"
            name="Close"
            onClick={() => setOpenModal(false)}
            bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7]"
            textClass="text-white font-mainText"
            extraClass="w-[140px] shadow-md mx-auto"
          />
        </div>
      </Modal>
      {/* Left side*/}
      <div className="hidden min-h-screen w-[50%] flex-col items-center justify-between bg-primaryViolet md:flex">
        {showIframe && (
          <iframe
            src="https://survey.eyes4research.com/surveyProcess.php?authToken=27417b1d04943fca3078cca4194b9565"
            height="1"
            width="1"
            style={{ display: "none" }}
          ></iframe>
        )}
        <Image
          src={Logo}
          alt="girl"
          onClick={() => router.push("/")}
          className="cursor-pointer md:mt-10 md:w-[250px]"
        />
        <Image src={GirlThinking} alt="gir" />
      </div>
      {/* Right side*/}
      <div className="flex w-[70%] flex-col pb-5 md:mx-[30px] md:w-[50%] md:max-lg:mt-[10%] lg:ml-[67px] lg:mt-[0px]">
        <div className=" mt-3 max-w-[500px]"></div>
        <div className="mr-auto  mt-2 md:hidden">
          <Image
            src={GoBack}
            alt="back"
            className="cursor-pointer rounded-full border border-gray-300 md:hidden"
            width={35}
            height={35}
            onClick={() => router.back()}
          />
        </div>

        <div className="mx-auto flex max-w-[500px] flex-col items-start md:mx-0 md:pt-[20px]">
          {/* {!isCookiesEnabled && (
            <p
              className="mb-3 mt-2 max-w-[500px] rounded-lg bg-red-400 py-4 pl-2 text-xs md:mb-4
          md:mt-0 md:text-sm
        "
            >
              Hi there! Please enable third-party cookies in
              your browser to enjoy our site. It’s a quick
              fix for a smoother gifting experience! We are
              making this simpler soon. Thanks for sticking
              with us!{" "}
              <Link
                href={
                  "https://cookie-script.com/knowledge-base/enable-cookies-iphone"
                }
                className="text-blue-900 underline"
              >
                Here is how to do it.
              </Link>{" "}
            </p>
          )} */}
          <h2 className="heading-gradient mx-auto text-xl font-semibold md:mx-0 md:min-h-[50px] md:text-[36px]">
            Create Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full font-mainText"
          >
            <div className="grid w-full gap-2 text-xs md:gap-6 md:text-sm lg:grid-cols-2">
              <Controller
                name="fName"
                control={control}
                render={({ field }) => (
                  <TextInputFloating
                    {...field}
                    placeholder="First name*"
                    type="text"
                    errors={errors.fName?.message}
                    inputClassName="w-full lg:max-w-[240px]"
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
                    inputClassName="w-full lg:max-w-[240px]"
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
                    inputClassName="w-full lg:max-w-[240px]"
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
                    inputClassName="w-full lg:max-w-[240px]"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextInputFloating
                    {...field}
                    placeholder="Password*"
                    type="password"
                    errors={errors.password?.message}
                    inputClassName="w-full lg:max-w-[240px]"
                    isPasswordInput={true}
                    isPasswordShow={showPassword}
                    setIsPasswordShow={() =>
                      setShowPassword(!showPassword)
                    }
                  />
                )}
              />

              <div className="col-span-2 mb-5 hidden items-center gap-2 md:flex">
                <p className="hidden md:block">
                  Birth Date*
                </p>
                <div className="ml-auto max-w-[238px]">
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        className="max-w-[238px] rounded-lg border border-gray-300 !px-2 text-sm"
                        showPopperArrow={false}
                        placeholderText="MM/DD/YYYY"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        customInput={
                          <input
                            className="example-custom-input rounded-lg border border-gray-300"
                            value={
                              field?.value
                                ?.toString()
                                .split("T")[0]
                            }
                          />
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

            <div className="flex w-full flex-col gap-2 pt-4 md:hidden ">
              <p className="text-xs">Birth Date*</p>
              <div className="mb-4 w-[266px]">
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="h-55px w-full rounded-lg border border-gray-300 !px-2 text-sm"
                      showPopperArrow={false}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      customInput={
                        <input
                          className="example-custom-input rounded-lg border border-gray-300"
                          value={
                            field?.value
                              ?.toString()
                              .split("T")[0]
                          }
                        />
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

            <div className="col-span-2 mb-10 flex gap-2 md:gap-6 lg:min-w-[330px]">
              <Button
                name="Save for later"
                disabled={alreadyRegistered}
                type="submit"
                onClick={handleSubmit(data =>
                  onSubmit(data, "saveForLater" as any),
                )}
                bgClass="bg-white"
                isLoading={loading}
                textClass="text-black"
                extraClass="md:font-medium shadow-[0px_20px_20px_0px_rgba(202,108,230,0.25)] px-[10px] py-[12px] md:px-[25px] md:py-[15px] text-xs md:text-base"
              />

              <Button
                type="submit"
                disabled={alreadyRegistered}
                name="Save & Add Recipient"
                isLoading={addRecipientBtnLoading}
                bgClass="font-medium bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md px-[10px] py-[12px] md:px-[25px] md:py-[15px] text-xs md:text-base"
                textClass="text-white"
                extraClass="flex justify-center items-center md:gap-2"
                render={() => (
                  <Image
                    src={RightArrow}
                    alt="arrow-right"
                  />
                )}
              />
            </div>

            <div className="my-3 mb-5 flex max-w-[442px] flex-col gap-3 pt-6">
              <p className="mx-auto text-xs md:text-base">
                Or Sign-in with
              </p>
              <button
                // href={`${process.env.BASE_URL}/store/auth/callback/google`}
                onClick={() => {
                  setShowIframe(true);
                  window.location.href = `${process.env.BASE_URL}/store/auth/callback/google`;
                }}
                type="button"
                className="flex min-w-[100%] max-w-[380px] items-center justify-center gap-[25px] rounded-[50px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
              >
                <Image
                  height={24}
                  alt="google"
                  width={24}
                  src={GoogleIcon}
                />
                Sign in with Google
              </button>
              <button
                // href={`${process.env.BASE_URL}/store/auth/callback/facebook`}
                onClick={() => {
                  setShowIframe(true);
                  window.location.href = `${process.env.BASE_URL}/store/auth/callback/facebook`;
                }}
                type="button"
                className="flex min-w-[100%] max-w-[380px] items-center justify-center rounded-[50px] border border-primaryViolet px-[25px] py-[10px] font-mainText text-xs md:text-sm"
              >
                <Image
                  height={24}
                  alt="facebook"
                  width={24}
                  src={FacebookIcon}
                />
                <span className="ms-4">
                  Sign in with Facebook
                </span>
              </button>
            </div>

            <hr className="mb-5" />
            <p className="mt-2 pb-3 text-center text-xs md:pb-0 md:text-base">
              Already have an account ?{" "}
              <span
                className="cursor-pointer text-primaryViolet"
                onClick={() => router.push("/login")}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
