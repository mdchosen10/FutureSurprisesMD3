"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TextInputFloating from "@/components/utils/TextInputFloating";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@/components/utils/Checkbox";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Accordion, Tooltip } from "flowbite-react";
import CheckboxInput from "@/components/utils/Checkbox";
import TextInput from "@/components/utils/TextInput";
import CloseIcon from "@/../public/icons/close-violet.svg";
import Image from "next/image";
import TextArea from "@/components/utils/TextArea";
import TrashBin from "@/../public/icons/trash-bin.svg";
import Pencil from "@/../public/icons/pencil-edit.svg";
import { Modal } from "flowbite-react";
import Autocomplete from "react-google-autocomplete";
import OpenAI from "openai";
import { Spinner } from "flowbite-react";
import * as recipientActions from "@/redux/recipient/actions";
import * as authActions from "@/redux/auth/actions";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DeleteModal from "@/components/my-account/DeleteModal";
import moment from "moment";
import AccordionInput from "@/components/Accordion";
import Help from "@/../public/icons/help.svg";
import * as paymentActions from "@/redux/payment/actions";
import { v4 as uuidv4 } from "uuid";

import {
  APIDateFormat,
  additionalInformation,
  relationshipOptions,
  yearlyHolidays,
} from "@/helpers";
interface AddRecipientForm {
  fName: string;
  lName: string;
  nickName: string;
  signature: string;
  dob: Date | null | any;
  spendingLimit: string;
  relationship: string;
  chatGPTmessage: string;
  strongLikes: string;
  strongDislikes: string;
}

const AddRecipientSchema = yup
  .object()
  .shape({
    fName: yup.string().required("First name is required"),
    lName: yup.string().required("First name is required"),
    nickName: yup.string(),
    signature: yup.string(),
    dob: yup.date().required("Date of birth is required"),
    spendingLimit: yup
      .string()
      .required("Spending limit is required"),
    relationship: yup
      .string()
      .required("Relationship is required"),
    strongLikes: yup.string(),
    strongDislikes: yup.string(),
    chatGPTmessage: yup.string(),
  })
  .required();

interface AddNewAddressForm {
  nickName: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  zip: string;
}

const AddNewAddressSchema = yup
  .object()
  .shape({
    nickName: yup
      .string()
      .required("Nick name is required!"),
    address: yup
      .string()
      .required("Please specify street address!"),
    city: yup.string().required("City is required!"),
    state: yup.string().required("State is required!"),
    country: yup.string(),
    zip: yup.string().required("Postal code is required"),
  })
  .required();

const AddOrEditRecipient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const isEditMode = searchParams?.get("id")?.length;
  const user: any = useAppSelector(
    state => state.authSlice.user,
  );

  const { paymentMethods } = useAppSelector(
    state => state.paymentSlice,
  );

  const { recipients }: any = useAppSelector(
    state => state?.recipientSlice?.addedRecipients || [],
  );

  const [giftFor, setGiftFor] = useState<string>("");
  const [selectedAddress, setSelectedAddress] =
    useState<string>("");
  const [newCustomHoliday, setNewCustomHoliday] =
    useState<string>("");
  const [newCustomHolidayDate, setNewCustomHolidayDate] =
    useState<Date | any>(null);
  const [anniversaryDate, setAnniversaryDate] =
    useState<Date | null>(null);
  const [chatGPTMessage, setChatGPTMessage] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [saveAndGoBackLoading, setSaveAndGoBackLoading] =
    useState<boolean>(false);
  const [chaGPTLoading, setChatGPTLoading] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] =
    useState<boolean>(false);
  const [deleteModal, setDeleteModal] =
    useState<boolean>(false);
  const [delayInfoModal, setDelayInfoModal] =
    useState<boolean>(false);
  const [noPaymentsModal, setNoPaymentsModal] =
    useState<boolean>(false);
  const [editableRecipient, setEditableRecipient] =
    useState<any>({});
  const [recipientToDelete, setRecipientToDelete] =
    useState<string>("");
  const [allHolidays, setAllHolidays] = useState<object[]>(
    [],
  );
  const [saveConfirmModal, setSaveConfirmModal] =
    useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<
    string[]
  >([]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [delayedHolidays, setDelayedHolidays] = useState(
    [],
  );
  const [holidayGroup, setHolidayGroup] = useState<any>([]);
  const [isOneTimeHoliday, setIsOneTimeHoliday] =
    useState<boolean>(false);
  const [confirmNavigateFlag, setConfirmNavigateFlag] =
    useState(false);
  const [
    selectedDeliveryOption,
    setSelectedDeliveryOption,
  ] = useState("present");
  const [otherFormErrors, setOtherFormErrors] = useState({
    address: "",
    gender: "",
  });
  const [addAddressLoading, setAddAddressLoading] =
    useState(false);

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddRecipientForm>({
    resolver: yupResolver<any>(AddRecipientSchema),
  });

  const watchDob = watch("dob");
  const watChSpendingLimit = watch("spendingLimit");
  const showSpendingOptionForKids = moment().isBefore(
    moment(watchDob).add(10, "years"),
  );

  useEffect(() => {
    if (
      watchDob &&
      watChSpendingLimit === "30" &&
      !showSpendingOptionForKids
    ) {
      setValue("spendingLimit", "");
      setError("spendingLimit", {
        type: "custom",
        message: "Spending limit is required!",
      });
    } else {
      clearErrors("spendingLimit");
    }
  }, [
    clearErrors,
    setError,
    setValue,
    showSpendingOptionForKids,
    watChSpendingLimit,
    watchDob,
  ]);

  const {
    handleSubmit: handleSubmitAddAddress,
    control: controlAddAddress,
    setValue: setAddressValues,
    reset: resetAddressValues,
    formState: { errors: errorsAddAddress },
  } = useForm<AddNewAddressForm>({
    resolver: yupResolver(AddNewAddressSchema),
  });

  const findHolidayGroupName = (type: string) => {
    switch (type) {
      case "general":
        return "General and Secular Holidays";
      case "christian":
        return "Christian Holidays";
      case "jewish":
        return "Jewish Holidays";
      case "islamic":
        return "Islamic Holidays";
      case "hindu":
        return "Hindu Holidays";
      case "buddhist":
        return "Buddhist Holidays";
      case "pagan/wiccan":
        return "Pagan/Wiccan Holidays";
      case "other":
        return "Other Religious/Cultural Holidays";

      default:
        return "None";
    }
  };

  const onSelectAnniversaryDate = (date: Date) => {
    if (date === null) {
      setAllHolidays(
        allHolidays.filter(
          (item: any) => item.name !== "Anniversary",
        ),
      );
      return setAnniversaryDate(null);
    }
    setAnniversaryDate(date);
    const anniversaryDayIndex = allHolidays.findIndex(
      (item: any) => item.name === "Anniversary",
    );
    const anniversary: any = allHolidays.find(
      (item: any) => item.name === "Anniversary",
    );

    const currentDate = moment();
    const dayOfAnniversaryInCurrentYear = moment(date).year(
      new Date().getFullYear(),
    );
    const isDayOfAnniversaryInCurrentYearIsPastToday =
      moment(dayOfAnniversaryInCurrentYear).isAfter(
        currentDate,
      );

    const bufferYear =
      isDayOfAnniversaryInCurrentYearIsPastToday ? 0 : 1;

    const year = moment().add(bufferYear, "years").year();
    const monthNumber = moment(date).month() + 1;
    const month =
      monthNumber < 10
        ? `0${monthNumber}`
        : `${monthNumber}`;
    const dayNumber = moment(date).date();
    const day =
      dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

    const modifiedAnniversary = {
      ...anniversary,
      date: `${year}-${month}-${day}`,
    };

    let modifiedHolidays = [...allHolidays];
    modifiedHolidays?.splice(
      anniversaryDayIndex,
      1,
      modifiedAnniversary,
    );
    setAllHolidays(modifiedHolidays);
  };

  const onSelectAdditionalInfo = (info: string) => {
    const isPresent = additionalInfo.some(
      item => item === info,
    );
    if (isPresent)
      return setAdditionalInfo(
        additionalInfo.filter(item => item !== info),
      );
    setAdditionalInfo([...additionalInfo, info]);
  };

  const onSelectAddress = (address: any) => {
    setSelectedAddress(address?.id);
    setOtherFormErrors({ ...otherFormErrors, address: "" });
  };

  const onHolidaySelection = (holiday: any) => {
    checkDeliveryDelay();
    const isPresent = allHolidays?.some(
      (hol: any) => hol.name === holiday.name,
    );

    if (holiday.type === "custom") {
      const index = allHolidays.findIndex(
        (item: any) => item.name === holiday.name,
      );
      const _allHolidays = [...allHolidays];
      _allHolidays.splice(index, 1, {
        ...holiday,
        selected: !holiday.selected,
        tempId: uuidv4(),
      });
      setAllHolidays(_allHolidays);
      return;
    }

    if (isPresent) {
      setAllHolidays(
        allHolidays?.filter(
          (hol: any) => hol.name !== holiday.name,
        ),
      );
      holiday.name === "Anniversary" &&
        setAnniversaryDate(null);
      return;
    }

    /**
     * birthdays are past,
     * so its next occurrence is on next year
     */

    if (holiday.name === "Birthdays") {
      if (!watchDob)
        return toast.error(
          "Please pick a date for the date of birth first!",
        );

      const currentDate = moment();
      const dayOfBirthInCurrentYear = moment(watchDob).year(
        new Date().getFullYear(),
      );
      const isDayOfBirthInCurrentYearIsPastToday = moment(
        dayOfBirthInCurrentYear,
      ).isAfter(currentDate);

      const bufferYear =
        isDayOfBirthInCurrentYearIsPastToday ? 0 : 1;

      const year = moment().add(bufferYear, "years").year();
      const monthNumber = moment(watchDob).month() + 1;
      const month =
        monthNumber < 10
          ? `0${monthNumber}`
          : `${monthNumber}`;
      const dayNumber = moment(watchDob).date();
      const day =
        dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

      setAllHolidays([
        ...allHolidays,
        {
          ...holiday,
          selected: true,
          tempId: uuidv4(),
          date: `${year}-${month}-${day}`,
        },
      ]);
      return;
    }
    setAllHolidays([
      ...allHolidays,
      { ...holiday, selected: true, tempId: uuidv4() },
    ]);
  };

  const onAddCustomHolidays = () => {
    setAllHolidays([
      ...allHolidays,
      {
        name: newCustomHoliday,
        date: moment(newCustomHolidayDate).format(
          APIDateFormat,
        ),
        type: "custom",
        selected: true,
        one_time: isOneTimeHoliday,
        tempId: uuidv4(),
      },
    ]);
    setNewCustomHoliday("");
    setNewCustomHolidayDate(null);
    checkDeliveryDelay();
    setIsOneTimeHoliday(false);
  };

  const onDeleteCustomerHoliday = (item: any) => {
    setAllHolidays(
      allHolidays.filter(
        (holiday: any) => holiday.tempId !== item.tempId,
      ),
    );
  };

  const onSubmitAddNewAddress = async (
    data: AddNewAddressForm,
  ) => {
    setAddAddressLoading(true);
    const res: any = await dispatch(
      recipientActions.addNewAddress({
        data: {
          address: {
            first_name: "",
            last_name: "",
            address_1: data.address,
            city: data.city,
            province: data.state,
            country_code: "US",
            postal_code: data.zip.toString(),
            metadata: {
              nickname: data.nickName,
            },
          },
        },
      }),
    );
    if (res?.payload?.customer?.id) {
      toast.success("New address added successfully.");
      setModalOpen(false);
      getCustomer();
      resetAddAddressForm();
      setAddAddressLoading(false);

      return;
    }
    setAddAddressLoading(false);

    toast.error("Something went wrong!");
  };

  const getAddedRecipients = useCallback(async () => {
    const reqData = user?.id || "";
    const res: any = await dispatch(
      recipientActions.getAddedRecipients({
        data: reqData,
      }),
    );

    if (isEditMode) {
      setEditableRecipient(
        res?.payload?.recipients?.find(
          (item: any) =>
            item.id === searchParams?.get("id"),
        ),
      );
    }
  }, [user?.id, dispatch, isEditMode, searchParams]);

  const resetRecipientForm = useCallback(() => {
    reset({
      fName: "",
      lName: "",
      chatGPTmessage: "",
      dob: null,
      relationship: "",
      nickName: "",
      signature: "",
      spendingLimit: "",
      strongDislikes: "",
      strongLikes: "",
    });
    setSelectedAddress("");
    window.scroll(0, 0);
    setLoading(false);
    setSaveConfirmModal(false);
    setSaveAndGoBackLoading(false);
    setNoPaymentsModal(false);
    setGiftFor("");
    setAnniversaryDate(null);
    setAllHolidays([]);
    setAdditionalInfo([]);
    setChatGPTMessage("");
    router.push("/add-or-edit-recipient");
  }, [reset, router]);

  const resetAddAddressForm = useCallback(() => {
    resetAddressValues({
      nickName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });
    setModalOpen(false);
  }, [resetAddressValues]);

  const checkDeliveryDelay = useCallback(() => {
    const deliveryAffectedHolidays: any = [];
    const today = moment();
    let diffInDays = 0;

    allHolidays?.forEach((holiday: any) => {
      diffInDays = moment(holiday.date).diff(today, "days");
      // && diffInDays >= 0
      if (diffInDays <= 13 && diffInDays >= 0) {
        deliveryAffectedHolidays.push(holiday);
      }
    });

    setDelayedHolidays(deliveryAffectedHolidays);
  }, [allHolidays]);

  const onAcknowledgeGiftDelivery = () => {
    setAcknowledged(true);
    setDelayInfoModal(false);
    setDelayedHolidays([]);
  };

  const onSelectGiftDeliveryOption = (value: string) => {
    if (selectedDeliveryOption === value) return;
    setSelectedDeliveryOption(value);

    const updatedDelayedHolidays: any =
      delayedHolidays?.map((holiday: any) => {
        const date = moment(holiday.date);

        const index = allHolidays.findIndex(
          (hol: any) => hol?.name === holiday?.name,
        );

        if (!holiday.one_time) {
          if (value === "future") {
            if (date.year() === moment().year()) {
              date.add(1, "year");
            }

            allHolidays?.splice(index, 1, {
              ...holiday,
              date: moment(date).format(APIDateFormat),
              // delay: true,
              tempId: uuidv4(),
            });
          } else {
            if (holiday.delay) {
              date.subtract(1, "year");
            }
            allHolidays?.splice(index, 1, {
              ...holiday,
              date: moment(date).format(APIDateFormat),
              // delay: false,
              tempId: uuidv4(),
            });
          }
        }

        return {
          ...holiday,
          date: moment(date).format(APIDateFormat),
          delay: true,
          tempId: uuidv4(),
        };
      });

    setDelayedHolidays(updatedDelayedHolidays);
  };

  const checkOtherFormErrors = useCallback(() => {
    if (!giftFor) {
      setOtherFormErrors(prev => ({
        ...prev,
        gender: "Please select one!",
      }));
      setSaveAndGoBackLoading(false);
    }
    if (!selectedAddress) {
      setOtherFormErrors(prev => ({
        ...prev,
        address: "Please select or add an address!",
      }));
      setSaveAndGoBackLoading(false);
    }

    window.scroll(0, 0);
  }, [giftFor, selectedAddress]);

  const onSubmitSave = useCallback(
    async (data: any) => {
      checkDeliveryDelay();

      if (!giftFor || !selectedAddress) {
        checkOtherFormErrors();
        return;
      }

      if (!allHolidays?.length) {
        return toast.error(
          "Please select at least one holiday!",
        );
      }

      if (
        paymentMethods?.length === 0 &&
        acknowledged === false &&
        delayedHolidays?.length > 0
      ) {
        setNoPaymentsModal(true);
        return;
      }

      if (
        delayedHolidays?.length > 0 &&
        paymentMethods?.length
        // !isEditMode
      ) {
        setDelayInfoModal(true);
        return;
      }

      const reqData = {
        gift_gender: giftFor,
        default_spending: data.spendingLimit,
        last_name: data.lName,
        first_name: data.fName,
        nickname: data.nickName || "",
        all_holidays:
          !paymentMethods?.length &&
          delayedHolidays?.length > 0
            ? []
            : allHolidays,
        signature_name: data.signature || "",
        relationship: data.relationship,
        interests_array: additionalInfo,
        personal_message: chatGPTMessage,
        strong_likes: data.strongLikes || "",
        strong_dislikes: data.strongDislikes || "",
        shipping_address_id: selectedAddress,
        birthdate: moment(data.dob).format(APIDateFormat),
        anniversary_date: moment(anniversaryDate).isValid()
          ? moment(anniversaryDate).format(APIDateFormat)
          : "",
      };

      const options = {
        params: {
          id: isEditMode ? searchParams.get("id") : user.id,
        },
      };

      setLoading(true);

      const res: any = isEditMode
        ? await dispatch(
            recipientActions.updateRecipient({
              data: reqData,
              options,
            }),
          )
        : await dispatch(
            recipientActions.addRecipient({
              data: reqData,
              options,
            }),
          );

      if (res.meta.requestStatus === "fulfilled") {
        getAddedRecipients();

        isEditMode
          ? toast.success("Recipient updated successfully")
          : toast.success("Recipient added successfully");

        if (confirmNavigateFlag) {
          router.push("/my-account/payment");
        }

        if (!paymentMethods?.length) {
          router.push("/my-account/payment");
          return;
        }

        if (
          paymentMethods?.length &&
          saveAndGoBackLoading
        ) {
          router.push("/my-account/recipients");
          resetRecipientForm();
          return;
        }

        resetRecipientForm();
        router.push("/my-account/recipients");
        return;
      }
      toast.error("Something went wrong!");
      setLoading(false);
    },
    [
      checkDeliveryDelay,
      giftFor,
      selectedAddress,
      paymentMethods?.length,
      acknowledged,
      delayedHolidays?.length,
      isEditMode,
      allHolidays,
      additionalInfo,
      chatGPTMessage,
      anniversaryDate,
      searchParams,
      user?.id,
      dispatch,
      checkOtherFormErrors,
      getAddedRecipients,
      confirmNavigateFlag,
      saveAndGoBackLoading,
      resetRecipientForm,
      router,
    ],
  );

  const onClickSaveAndAddAnother = useCallback(() => {
    checkOtherFormErrors();
    if (!giftFor || !selectedAddress) return;
    setSaveAndGoBackLoading(true);
    setAcknowledged(true);
  }, [giftFor, selectedAddress]);

  const onClickAddPaymentFirst = () => {
    setNoPaymentsModal(false);
    setAcknowledged(true);
    setConfirmNavigateFlag(true);
  };

  const onPlaceSelection = (place?: any) => {
    if (place) {
      const city = place.address_components.find(
        (item: any) => item.types.includes("locality"),
      )?.long_name;

      const zipCode = place.address_components.find(
        (item: any) => item.types.includes("postal_code"),
      )?.long_name;

      const streetNumber =
        place.address_components.find((item: any) =>
          item.types.includes("street_number"),
        )?.long_name || "";

      const street = place.address_components.find(
        (item: any) => item.types.includes("route"),
      )?.long_name;

      const politicalArea = place.address_components.find(
        (item: any) => item.types.includes("political"),
      )?.long_name;

      const state = place.address_components.find(
        (item: any) =>
          item.types.includes(
            "administrative_area_level_1",
          ),
      )?.long_name;

      const country = place.address_components.find(
        (item: any) => item.types.includes("country"),
      )?.long_name;

      if (country) setAddressValues("country", country);

      if (city) setAddressValues("city", city);
      if (zipCode) setAddressValues("zip", zipCode);

      if (street && streetNumber) {
        setAddressValues(
          "address",
          `${streetNumber} ${street}`,
        );
      } else {
        setAddressValues("address", politicalArea);
      }
      setAddressValues("state", state);
    }
  };

  const onSelectGiftFor = (gender: string) => {
    if (giftFor === gender) return setGiftFor("");
    setGiftFor(gender);
    setOtherFormErrors({ ...otherFormErrors, gender: "" });
  };

  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  const findUpcomingHoliday = useCallback(() => {
    const upcomingHolidays: any = allHolidays.filter(
      (holiday: any) => {
        const holidayDate = new Date(holiday.date);
        return moment(holidayDate).isSameOrAfter(
          moment().startOf("day"),
        );
      },
    );

    upcomingHolidays.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime(),
    );

    if (upcomingHolidays?.length > 0) {
      return upcomingHolidays[0].name;
    }

    return null;
  }, [allHolidays]);

  const receiver =
    watch("nickName") === "Me" || watch("nickName") === "me"
      ? watch("fName")
      : watch("nickName") || watch("fName");
  const sender = watch("signature") || user?.first_name;

  const onClickChatGPT = useCallback(async () => {
    if (!allHolidays?.length) {
      return toast.error(
        "Please select at least one holiday!",
      );
    }
    setChatGPTLoading(true);
    const chatCompletion =
      await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `"generate a thoughtful message from ${sender} to ${receiver} the 
            occasion is ${findUpcomingHoliday()} the message should be short enough to fit as an 
            Amazon gift message.`,
          },
        ],
        model: process.env.CHATGPT_MODEL || "",
      });

    if (chatCompletion) {
      setChatGPTMessage(
        chatCompletion.choices[0].message.content || "",
      );
      setChatGPTLoading(false);
    } else {
      toast.error("Unable to generate custom message!");
      setChatGPTLoading(false);
    }
  }, [
    allHolidays?.length,
    findUpcomingHoliday,
    openai.chat.completions,
    receiver,
    sender,
  ]);

  useEffect(() => {
    // if (isEditMode && chatGPTMessage) return;
    if (allHolidays?.length === 1 && sender && receiver) {
      onClickChatGPT();
    }
  }, [allHolidays, isEditMode, receiver, sender]);

  const onMessageWrite = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChatGPTMessage(e.target.value);
  };

  const onDeleteRecipient = (recipient: any) => {
    setRecipientToDelete(recipient);
    setDeleteModal(true);
  };

  const onConfirmDeleteRecipient = useCallback(async () => {
    const res: any = await dispatch(
      recipientActions.deleteRecipient({
        data: recipientToDelete,
      }),
    );
    if (res?.payload.success) {
      toast.success("Recipient deleted successfully");
      getAddedRecipients();
      setDeleteModal(false);
      resetRecipientForm();
      router.push("/add-or-edit-recipient");
      return;
    }
    toast.error("Something went wrong!");
  }, [recipientToDelete, dispatch, getAddedRecipients]);

  const onEditRecipient = (recipientId: any) => {
    router.push(`/add-or-edit-recipient?id=${recipientId}`);
  };

  const getCustomer = useCallback(async () => {
    await dispatch(authActions.getCustomer());
  }, [dispatch]);

  useEffect(() => {
    if (acknowledged) {
      handleSubmit(onSubmitSave)();
      setAcknowledged(false);
    }
  }, [acknowledged]);

  useEffect(() => {
    getAddedRecipients();
  }, [getAddedRecipients, user?.id]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  useEffect(() => {
    if (!isEditMode || !editableRecipient) return;
    setValue("fName", editableRecipient?.first_name);
    setValue("lName", editableRecipient?.last_name);
    setValue("nickName", editableRecipient?.nickname);
    setValue(
      "signature",
      editableRecipient?.signature_name,
    );
    setValue(
      "dob",
      new Date(
        moment(editableRecipient?.birthdate).toDate(),
      ),
    );
    setValue(
      "spendingLimit",
      editableRecipient?.default_spending,
    );
    setValue(
      "relationship",
      editableRecipient?.relationship,
    );
    setValue(
      "strongLikes",
      editableRecipient?.strong_likes,
    );
    setValue(
      "strongDislikes",
      editableRecipient?.strong_dislikes,
    );
    onSelectGiftFor(editableRecipient?.gift_gender);
    setAllHolidays(editableRecipient?.all_holidays);
    const anniversaryHoliday =
      editableRecipient?.all_holidays?.find(
        (holiday: any) => holiday.name === "Anniversary",
      );
    setAnniversaryDate(
      anniversaryHoliday
        ? new Date(anniversaryHoliday.date)
        : null,
    );
    setAdditionalInfo(editableRecipient?.interests_array);
    setChatGPTMessage(editableRecipient?.personal_message);
    onSelectAddress(
      user?.shipping_addresses?.find(
        (address: any) =>
          address.id ===
          editableRecipient?.shipping_address_id,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableRecipient?.first_name, isEditMode]);

  const onClickYesGoToAddPayment = () => {
    handleSubmit(onSubmitSave)();
  };

  const getAllPaymentMethods = useCallback(async () => {
    const reqData = {
      stripe_id: user?.metadata?.stripe_id || "",
    };

    if (user) {
      await dispatch(
        paymentActions.getSavedPaymentMethods({
          data: reqData,
        }),
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    const group: any = {
      general: [],
      christian: [],
      jewish: [],
      islamic: [],
      hindu: [],
      buddhist: [],
      "pagan/wiccan": [],
      other: [],
      common: [],
    };

    for (const key in group) {
      yearlyHolidays().forEach((holiday: any) => {
        if (holiday.type === key) {
          group[holiday.type] = [...group[key], holiday];
        }
      });
      if (key === "common") {
        group["common"] = [
          ...group["common"],
          {
            name: "Birthdays",
            date: "",
            type: "common",
          },
          {
            name: "Anniversary",
            date: "",
            type: "common",
          },
        ];
      }
    }

    setHolidayGroup(group);
  }, []);

  useEffect(() => {
    getAllPaymentMethods();
  }, [getAllPaymentMethods]);

  useEffect(() => {
    if (Object.keys(errors)?.length !== 0) {
      checkOtherFormErrors();
    }
  }, [checkOtherFormErrors, errors]);

  useEffect(() => {
    checkDeliveryDelay();
  }, [checkDeliveryDelay, allHolidays, newCustomHoliday]);

  const onDOBchange = (date: Date) => {
    setValue("dob", new Date(date));
    const bdayHoliday = allHolidays?.find(
      (item: any) => item.name === "Birthdays",
    );
    if (bdayHoliday) {
      const allHolidaysCopy = allHolidays?.slice();
      const index = allHolidaysCopy?.findIndex(
        (item: any) => item.name === "Birthdays",
      );

      const currentDate = moment();
      const dayOfBirthInCurrentYear = moment(date).year(
        new Date().getFullYear(),
      );
      const isDayOfBirthInCurrentYearIsPastToday = moment(
        dayOfBirthInCurrentYear,
      ).isAfter(currentDate);

      const bufferYear =
        isDayOfBirthInCurrentYearIsPastToday ? 0 : 1;

      const year = moment().add(bufferYear, "years").year();
      const monthNumber = moment(date).month() + 1;
      const month =
        monthNumber < 10
          ? `0${monthNumber}`
          : `${monthNumber}`;
      const dayNumber = moment(date).date();
      const day =
        dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

      allHolidaysCopy?.splice(index, 1, {
        ...bdayHoliday,
        date: `${year}-${month}-${day}`,
      });

      setAllHolidays(allHolidaysCopy);
    }
  };

  function renderSaveConfirmModal() {
    return (
      <Modal
        dismissible={false}
        show={saveConfirmModal}
        onClose={() => setSaveConfirmModal(false)}
        className="h-screen"
        size="md"
        position="center"
      >
        <div className=" flex max-w-[500px] flex-col px-2 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h3 className="font-bold">Confirm save!</h3>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => setSaveConfirmModal(false)}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>

          <div className="text-xs md:text-base">
            There are unsaved changes, do you wish to save
            them before navigating to the payment details
            page?
          </div>

          <div className="mt-4 flex gap-4">
            <Button
              name="Yes"
              type="button"
              onClick={onClickYesGoToAddPayment}
              isLoading={loading}
              disabled={loading}
              bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
              textClass="text-white text-sm"
              extraClass="px-6"
            />
            <Button
              name="No"
              type="button"
              // disabled={!selectedAddress?.length}
              onClick={() => {
                router.push("/add-payment-details");
                setSaveConfirmModal(false);
              }}
              bgClass="bg-white shadow-md"
              textClass="text-primaryViolet text-sm"
              extraClass="px-6"
            />
          </div>
        </div>
      </Modal>
    );
  }

  function renderAddAddressModal() {
    return (
      <Modal
        dismissible={false}
        show={modalOpen}
        onClose={resetAddAddressForm}
        className="h-screen"
        size="md"
        position="center"
      >
        <div className=" flex max-w-[500px] flex-col px-6 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h3 className="font-bold">Add Address</h3>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={resetAddAddressForm}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <form
            onSubmit={handleSubmitAddAddress(
              onSubmitAddNewAddress,
            )}
            className="flex flex-col gap-4"
          >
            <Controller
              name="nickName"
              control={controlAddAddress}
              render={({ field }) => (
                <TextInputFloating
                  {...field}
                  placeholder="Nickname*"
                  type="text"
                  errors={
                    errorsAddAddress.nickName?.message
                  }
                  inputClassName="w-full"
                />
              )}
            />

            <Controller
              name="address"
              control={controlAddAddress}
              render={({ field }) => (
                <div className="relative z-0  w-full">
                  <Autocomplete
                    value={field.value}
                    onChange={field.onChange}
                    apiKey={
                      process.env.GOOGLE_PLACES_API_KEY
                    }
                    onPlaceSelected={onPlaceSelection}
                    placeholder=""
                    className="googlePlacesTextInput peer"
                    options={{
                      types: ["geocode"],
                    }}
                  />
                  <label
                    htmlFor="floating_text_input"
                    className="googlePlacesTextLabel"
                  >
                    Address*
                  </label>
                  <p className="pt-2 text-xs text-red-600">
                    {errorsAddAddress.address?.message}
                  </p>
                </div>
              )}
            />

            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <Controller
                name="city"
                control={controlAddAddress}
                render={({ field }) => (
                  <TextInputFloating
                    {...field}
                    value={field.value}
                    placeholder="City*"
                    type="text"
                    errors={errorsAddAddress.city?.message}
                    inputClassName="w-full"
                  />
                )}
              />

              <Controller
                name="state"
                control={controlAddAddress}
                render={({ field }) => (
                  <TextInputFloating
                    {...field}
                    value={field.value}
                    placeholder="State*"
                    type="text"
                    errors={errorsAddAddress.state?.message}
                    inputClassName="w-full"
                  />
                )}
              />

              <Controller
                name="zip"
                control={controlAddAddress}
                render={({ field }) => (
                  <TextInputFloating
                    {...field}
                    placeholder="Postal Code*"
                    type="text"
                    value={field.value}
                    errors={errorsAddAddress.zip?.message}
                    inputClassName="w-full"
                  />
                )}
              />
            </div>
            <button
              className="mx-auto w-full rounded-xl border border-primaryViolet px-10 py-2 md:mx-0 md:mr-auto md:max-w-[240px]"
              type="submit"
              disabled={addAddressLoading}
            >
              Save Address
            </button>
          </form>
        </div>
      </Modal>
    );
  }

  function renderDeliveryDelayInfoModal() {
    return (
      <Modal
        dismissible={false}
        show={delayInfoModal}
        onClose={() => {
          setDeleteModal(false);
          setLoading(false);
          setSaveAndGoBackLoading(false);
        }}
        className="h-screen"
        size="xl"
        position="center"
      >
        <div className="flex flex-col px-2 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="font-bold">
              Possible Delay in gift arrival!
            </h1>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => {
                setLoading(false);
                setSaveAndGoBackLoading(false);
                setDelayInfoModal(false);
              }}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <p>
            Some of the holidays you selected are within 13
            days from today, We will still do our best to
            fulfil the request ASAP, but there is a chance
            that the gift(s) will be delayed. Please tell us
            how you would like to proceed.{" "}
            {
              "Also note, that changes cannot be made to orders within 13 days of delivery."
            }
          </p>
          <h1 className="mt-2 font-medium">
            Holidays Affected
          </h1>
          <div className=" mt-2 flex flex-col">
            {delayedHolidays?.map((holiday: any) => (
              <p key={uuidv4()}>
                {holiday.name} (
                {moment(holiday.date).format("MM-DD-YYYY")})
              </p>
            ))}
          </div>
          <div className="mt-2">
            <Checkbox
              label="Start the deliveries this year although they may be a few days late"
              checked={selectedDeliveryOption === "present"}
              onChange={() =>
                onSelectGiftDeliveryOption("present")
              }
            />
            <Checkbox
              label="start the deliveries next year and guarantee they arrive on time."
              checked={selectedDeliveryOption === "future"}
              onChange={() =>
                onSelectGiftDeliveryOption("future")
              }
            />
          </div>
          <div className="mt-4 flex gap-4">
            <Button
              name="Confirm"
              type="button"
              onClick={onAcknowledgeGiftDelivery}
              bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
              textClass="text-white"
              extraClass="px-6"
            />
            <Button
              name="Cancel"
              type="button"
              onClick={() => {
                setLoading(false);
                setSaveAndGoBackLoading(false);
                setDelayInfoModal(false);
              }}
              bgClass="bg-white shadow-md"
              textClass="text-primaryViolet"
              extraClass="px-6"
            />
          </div>
        </div>
      </Modal>
    );
  }

  function renderNoPaymentsAddedModal() {
    return (
      <Modal
        dismissible={true}
        show={noPaymentsModal}
        onClose={() => setNoPaymentsModal(false)}
        className="h-screen"
        size="xl"
        position="center"
      >
        <div className="flex flex-col px-2 pb-8 pt-6 font-mainText phone:px-6">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="font-bold">
              No payment methods added!
            </h1>
            <Image
              src={CloseIcon}
              alt="close"
              onClick={() => {
                setNoPaymentsModal(false);
                setSaveConfirmModal(false);
              }}
              className="ml-auto cursor-pointer rounded-full border border-gray-300"
              width={35}
              height={35}
            />
          </div>
          <p>
            This recipient has a holiday that is within 13
            days, however you don&apos;t have payment method
            added. To ensure proper processing please add a
            payment method first, then{" "}
            <strong>
              COME BACK TO THIS RECIPIENT and ADD THE
              HOLIDAYS.
            </strong>
          </p>
          <h1 className="mt-2 font-medium">
            Holidays Affected
          </h1>
          <div className=" mt-2 flex flex-col">
            {delayedHolidays?.map((holiday: any) => (
              <p key={holiday.date}>
                {holiday.name} (
                {moment(holiday.date).format("MM-DD-YYYY")})
              </p>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <Button
              name="Save and Add Payment"
              type="button"
              onClick={onClickAddPaymentFirst}
              bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
              textClass="text-white"
              extraClass="px-6"
            />
            <Button
              name="Cancel"
              type="button"
              onClick={() => {
                setNoPaymentsModal(false);
                setSaveConfirmModal(false);
              }}
              bgClass="bg-white shadow-md"
              textClass="text-primaryViolet"
              extraClass="px-6"
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1000px] flex-col pt-[130px] md:pb-6">
      {renderSaveConfirmModal()}
      {renderAddAddressModal()}
      {renderDeliveryDelayInfoModal()}
      {renderNoPaymentsAddedModal()}
      <DeleteModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        onConfirm={onConfirmDeleteRecipient}
      />

      <div className="mx-auto flex flex-col gap-2 md:flex-row md:max-lg:px-4 lg:gap-[89px]">
        {/* Left wrapper */}
        <div
          className="max-w-[390px] 
          px-4
          md:max-w-[500px] 
          md:px-0"
        >
          <div className="flex justify-center md:justify-start">
            <h1 className="heading-gradient pb-4 font-mainHeading text-3xl font-bold md:pb-8 md:text-4xl">
              {isEditMode
                ? "Edit Recipient"
                : "Add Recipient"}
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitSave)}
            className=" font-mainText "
          >
            <div className="mb-3">
              <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:gap-4">
                <Controller
                  name="fName"
                  control={control}
                  render={({ field }) => (
                    <TextInputFloating
                      {...field}
                      placeholder="First name*"
                      type="text"
                      errors={errors.fName?.message}
                      inputClassName="w-full md:w-[200px] lg:w-[220px]"
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
                      inputClassName="w-full md:w-[200px] lg:w-[220px]"
                    />
                  )}
                />
              </div>

              <div className="h-scree mb-4 flex flex-col justify-between gap-4 md:flex-row md:gap-4">
                <Controller
                  name="nickName"
                  control={control}
                  render={({ field }) => (
                    <TextInputFloating
                      {...field}
                      placeholder="Nick Name (Optional)"
                      showHelpIcon={true}
                      type="text"
                      errors={errors.nickName?.message}
                      inputClassName="w-full md:w-[200px] lg:w-[220px]"
                      popOverText="Recipient's preferred name or alias."
                    />
                  )}
                />

                <Controller
                  name="signature"
                  control={control}
                  render={({ field }) => (
                    <TextInputFloating
                      {...field}
                      placeholder="Signature (Optional)"
                      showHelpIcon={true}
                      type="text"
                      errors={errors.signature?.message}
                      inputClassName="w-full md:w-[200px] lg:w-[220px]"
                      popOverText="Your preferred name or alias to use as the signature for the personal message."
                    />
                  )}
                />
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <p className="text-sm">Date of Birth*</p>
              <div className="max-w-[170px] md:max-w-[200px] lg:max-w-[220px]">
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      maxDate={new Date()}
                      selected={field.value}
                      onChange={onDOBchange}
                      dateFormat="MM/dd/yyyy"
                      showPopperArrow={false}
                      placeholderText="MM/DD/YYYY"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="h-6 w-[170px] max-w-[240px] rounded-lg border border-gray-300 p-4 text-sm"
                      customInput={
                        <input className="example-custom-input rounded-lg border border-gray-300" />
                      }
                    />
                  )}
                />
              </div>
              <p className="text-xs text-red-700">
                {errors.dob?.message as any}
              </p>
            </div>

            <div className="py-4">
              <Accordion collapseAll={true}>
                <Accordion.Panel className="accordion-item">
                  <Accordion.Title className="border-0 p-2 font-mainText text-sm font-normal text-black outline-none focus:ring-0">
                    Select Address*
                  </Accordion.Title>
                  <Accordion.Content className="px-2 md:px-4 ">
                    <div className="flex flex-col gap-3">
                      {user?.shipping_addresses?.map(
                        (address: any) => (
                          <Address
                            key={address.id}
                            address={address}
                            onChange={onSelectAddress}
                            checked={
                              selectedAddress === address.id
                            }
                            getCustomer={getCustomer}
                          />
                        ),
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
              <p className="py-2 font-mainText text-xs text-red-600">
                {otherFormErrors.address}
              </p>
            </div>

            <div className="pb-6">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="max-w-[240px] rounded-xl border border-primaryViolet px-10 py-2"
              >
                Add New Address
              </button>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 pb-6 text-sm md:flex-row">
              <div className="flex w-full flex-col gap-3">
                <p>Spending Limit*</p>

                <Controller
                  name="spendingLimit"
                  control={control}
                  render={({ field }) => (
                    <>
                      <select
                        className="h-[42px] rounded-xl  text-sm"
                        {...field}
                      >
                        <option value="">Select</option>
                        {showSpendingOptionForKids && (
                          <option
                            value="30"
                            className="rounded-t-lg"
                          >
                            $30 (for kids under 10)
                          </option>
                        )}
                        <option value="40">$40</option>
                        <option value="60">$60</option>
                        <option value="100">$100</option>
                      </select>
                      <p className="text-xs text-red-600">
                        {errors.spendingLimit?.message}
                      </p>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 md:max-w-[250px]">
                <p>Relationship*</p>
                <select
                  className="h-[42px] rounded-xl text-sm"
                  {...register("relationship")}
                >
                  <option value="">Select</option>
                  {relationshipOptions.map(
                    (item, index) => (
                      <option
                        value={item.value}
                        key={index}
                      >
                        {item.name}
                      </option>
                    ),
                  )}
                </select>
                <p className="text-xs text-red-600">
                  {errors.relationship?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4  pb-6 pt-3">
              <h3 className="font-semibold">Gift for*</h3>
              <div className="flex gap-2">
                <Checkbox
                  label="Him"
                  checked={giftFor === "him"}
                  onChange={() => onSelectGiftFor("him")}
                />
                <Checkbox
                  label="Her"
                  checked={giftFor === "her"}
                  onChange={() => onSelectGiftFor("her")}
                />
                <Checkbox
                  label="Unisex"
                  checked={giftFor === "unisex"}
                  onChange={() => onSelectGiftFor("unisex")}
                />
              </div>
              <p className="font-mainText text-xs text-red-700">
                {otherFormErrors?.gender}
              </p>
            </div>

            <div className="flex flex-col gap-4 py-6">
              <h3 className="text-sm font-semibold">
                Common gift-giving holidays * (select all
                that apply)
              </h3>

              <div className="grid grid-cols-1 gap-2 phone:grid-cols-2">
                {holidayGroup?.common?.map((item: any) => (
                  <Checkbox
                    key={item.name}
                    label={item.name}
                    checked={allHolidays?.some(
                      (hol: any) => hol.name === item.name,
                    )}
                    onChange={() =>
                      onHolidaySelection(item)
                    }
                  />
                ))}
              </div>

              <div className="md:ml-auto md:max-w-[246px]">
                <div className="flex items-center gap-2">
                  <div className="max-w-[150px]">
                    <DatePicker
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      showPopperArrow={false}
                      placeholderText="Anniversary"
                      disabled={
                        !allHolidays?.some(
                          (holiday: any) =>
                            holiday.name === "Anniversary",
                        )
                      }
                      customInput={
                        <input className="example-custom-input rounded-lg border border-gray-300" />
                      }
                      selected={anniversaryDate}
                      onChange={onSelectAnniversaryDate}
                    />
                  </div>
                  <Tooltip
                    content="This is the date of the initial anniversary."
                    placement="top"
                    className="w-[200px] text-xs"
                  >
                    <Image src={Help} alt="help" />
                  </Tooltip>
                </div>
                {allHolidays?.some(
                  (item: any) =>
                    item.name === "Anniversary",
                ) &&
                  !anniversaryDate && (
                    <p className="text-xs text-red-600">
                      Please select the date!
                    </p>
                  )}
              </div>

              <div className=" pb-6">
                <Accordion collapseAll={true}>
                  <Accordion.Panel className="accordion-item">
                    <Accordion.Title className="border-0 p-2 font-mainText text-sm font-normal text-black outline-none focus:ring-0">
                      Extended Celebration List
                    </Accordion.Title>
                    <Accordion.Content className="px-0">
                      <div className="flex flex-col gap-2 px-4">
                        {Object.entries(holidayGroup).map(
                          (group: any, index) => {
                            if (group[0] === "common")
                              return;
                            return (
                              <AccordionInput
                                key={index}
                                title={findHolidayGroupName(
                                  group[0],
                                )}
                                render={() => (
                                  <div className="grid grid-cols-1 gap-1 phone:grid-cols-2">
                                    {group[1].map(
                                      (
                                        item: any,
                                        index: any,
                                      ) => (
                                        <Checkbox
                                          key={index}
                                          label={item.name}
                                          onChange={() =>
                                            onHolidaySelection(
                                              item,
                                            )
                                          }
                                          labelClassName="text-sm md:text-base"
                                          checked={allHolidays?.some(
                                            (
                                              holiday: any,
                                            ) =>
                                              holiday.name ===
                                              item.name,
                                          )}
                                        />
                                      ),
                                    )}
                                  </div>
                                )}
                              />
                            );
                          },
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>

              <div className="accordion-item rounded-lg border border-gray-200 py-4">
                <div className="flex flex-col">
                  <h3 className="mb-4 pl-4 font-semibold">
                    Custom holidays
                  </h3>
                  {!!allHolidays?.filter(
                    (hol: any) => hol.type === "custom",
                  )?.length && (
                    <div className="flex flex-col gap-3">
                      <CustomHolidays
                        holidays={allHolidays.filter(
                          (hol: any) =>
                            hol.type === "custom",
                        )}
                        onDeleteCustomerHoliday={
                          onDeleteCustomerHoliday
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-start gap-4 px-4 pt-4">
                  <p className="text-primaryViolet">
                    Add New
                  </p>
                  <div className="mx-auto flex w-full flex-col gap-2 sm:flex-row">
                    <TextInput
                      type="text"
                      placeholder="New holiday"
                      className="h-[40px] w-full rounded-lg border border-gray-300"
                      value={newCustomHoliday}
                      onChange={(e: any) =>
                        setNewCustomHoliday(e.target.value)
                      }
                    />
                    <div className="max-w-[178px]">
                      <DatePicker
                        className=" w-full  rounded-lg"
                        showPopperArrow={false}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="MM/DD/YYYY"
                        customInput={
                          <input className="example-custom-input rounded-lg border border-gray-300" />
                        }
                        selected={newCustomHolidayDate}
                        onChange={setNewCustomHolidayDate}
                      />
                    </div>
                  </div>
                  <div>
                    <Checkbox
                      label="Is this a one time holiday?"
                      checked={isOneTimeHoliday}
                      onChange={() =>
                        setIsOneTimeHoliday(
                          !isOneTimeHoliday,
                        )
                      }
                    />
                  </div>
                  <button
                    onClick={onAddCustomHolidays}
                    disabled={
                      !newCustomHoliday ||
                      !newCustomHolidayDate
                    }
                    type="button"
                    className="w-[89px] rounded-lg bg-primaryViolet px-[8px] py-[5px] text-white"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <Accordion collapseAll={false}>
                  <Accordion.Panel className="accordion-item">
                    <Accordion.Title className="border-0 p-2 font-mainText text-sm font-normal text-black outline-none focus:ring-0">
                      Additional information (recommended)
                    </Accordion.Title>
                    <Accordion.Content className="p-4">
                      <p className="text-sm font-normal">
                        Interests (select all that apply)
                      </p>
                      <div>
                        {additionalInformation.map(
                          (item, index) => (
                            <AdditionalInfoItem
                              key={index}
                              name={item.name}
                              checked={additionalInfo?.includes(
                                item.name,
                              )}
                              onChange={() =>
                                onSelectAdditionalInfo(
                                  item.name,
                                )
                              }
                            />
                          ),
                        )}
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <p>Strong Likes</p>
                        <Controller
                          name="strongLikes"
                          control={control}
                          render={({ field }) => (
                            <TextArea
                              {...field}
                              placeholder="Likes Seafood a lot..."
                              className="rounded-xl"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <p>Strong Dislikes/Allergies</p>
                        <Controller
                          name="strongDislikes"
                          control={control}
                          render={({ field }) => (
                            <TextArea
                              {...field}
                              placeholder="Hates the smell of Cigars..."
                              className="rounded-xl"
                            />
                          )}
                        />
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>

              <p className="py-4">
                ChatGPT Generated Personal Message
              </p>

              <button
                onClick={onClickChatGPT}
                type="button"
                disabled={chaGPTLoading || !watch("fName")}
                className="w-full 
                rounded-xl 
                border border-black 
                px-10 py-2 
                text-primaryViolet"
              >
                {chaGPTLoading ? (
                  <Spinner
                    color="purple"
                    aria-label="spinner"
                  />
                ) : (
                  "Generate your personalized message"
                )}
              </button>

              <Controller
                name="chatGPTmessage"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder=""
                    disabled={chaGPTLoading}
                    onChange={
                      onMessageWrite || field.onChange
                    }
                    value={chatGPTMessage || field.value}
                    className="rounded-xl border-primaryViolet"
                  />
                )}
              />
              <div className="flex gap-4">
                <Button
                  name="Save"
                  type="submit"
                  bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
                  textClass="text-white"
                  extraClass="px-6"
                  disabled={loading || chaGPTLoading}
                  isLoading={
                    saveAndGoBackLoading ? false : loading
                  }
                />
                {paymentMethods?.length ? (
                  <Button
                    name="Save and add another"
                    type="button"
                    onClick={onClickSaveAndAddAnother}
                    bgClass="bg-white shadow-md"
                    textClass="text-primaryViolet"
                    extraClass="px-6"
                    isLoading={saveAndGoBackLoading}
                    disabled={chaGPTLoading}
                  />
                ) : null}
              </div>
            </div>
          </form>
        </div>

        {/* Right wrapper */}
        <div className="mx-3 flex flex-col md:mx-0 md:mt-[35px]">
          <div className="mb-3 rounded-xl shadow-2xl md:mb-0 md:p-6">
            <h1 className="heading-gradient py-4 pl-2 text-2xl font-semibold text-primaryViolet">
              Recipients Added
            </h1>

            <table className=" w-full border-collapse rounded-lg border border-gray-300 font-mainText md:w-[357px]">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Relationship
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!recipients?.length && (
                  <tr className="">
                    <td>No recipients added!</td>
                  </tr>
                )}
                {recipients?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className="border border-gray-300 p-2">
                      {item?.first_name || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item?.last_name || ""}
                      {}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex justify-around">
                        <Image
                          src={Pencil}
                          alt="pencil"
                          className="cursor-pointer"
                          onClick={() =>
                            onEditRecipient(item.id)
                          }
                        />
                        <Image
                          src={TrashBin}
                          alt="delete"
                          className="cursor-pointer"
                          onClick={() =>
                            onDeleteRecipient(item.id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditRecipient;

interface AddressProps {
  address: any;
  selected?: boolean;
  checked: boolean;
  onChange: (e: any) => typeof e | void;
  getCustomer?: Function | any;
}

const Address = (props: AddressProps) => {
  const { address, checked, onChange, getCustomer } = props;
  const dispatch = useAppDispatch();
  let addressToDelete = useRef();
  const [addressDeleteModal, setAddressDeleteModal] =
    useState(false);
  const [hydrated, setHydrated] = useState(false);

  const formattedAddress = [
    address.address_1,
    address.city,
    address.province,
    address.postal_code,
  ]
    .filter(value => value !== null && value !== undefined)
    .join(", ");

  const onClickDeleteAddress = (address: any) => {
    setAddressDeleteModal(true);
    addressToDelete.current = address.id;
  };

  const onConfirmDeleteAddress = useCallback(async () => {
    const options = {
      params: {
        address_id: addressToDelete.current,
      },
    };
    await dispatch(
      recipientActions.deleteAddress(options),
    ).then((res: any) => {
      if (res.payload.status === 200) {
        toast.success("Address deleted successfully");
        setAddressDeleteModal(false);
        getCustomer();
      } else {
        toast.error(
          "Something went wrong! Please contact the support team.",
        );
      }
    });
  }, [dispatch, getCustomer]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render,
    // so the client and server match
    return null;
  }

  return (
    <div className="flex max-w-[500px] justify-between">
      <DeleteModal
        isOpen={addressDeleteModal}
        setIsOpen={setAddressDeleteModal}
        onConfirm={onConfirmDeleteAddress}
      />
      <div className="flex gap-2">
        <div className="w-5">
          <CheckboxInput
            checked={checked}
            onChange={() => onChange(address)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">
            {address?.metadata?.nickname}
          </h2>
          <p>{formattedAddress}</p>
        </div>
      </div>
      <div
        onClick={() => onClickDeleteAddress(address)}
        className="mt-1 h-fit cursor-pointer font-mainText text-sm text-primaryViolet"
      >
        <div className="mt-1 cursor-pointer font-mainText text-sm text-primaryViolet">
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

interface CustomHolidaysProps {
  holidays: any;
  onChange?: () => void;
  onDeleteCustomerHoliday: (
    item: any,
  ) => typeof item | void;
}

const CustomHolidays = (props: CustomHolidaysProps) => {
  const { holidays, onDeleteCustomerHoliday } = props;
  return (
    <div className="px-4">
      <table
        className=" m-auto w-full 
        border-collapse rounded-lg 
        font-mainText 
        "
      >
        <thead>
          <tr className="bg-primaryViolet text-white">
            <th className="border border-gray-300 px-2 text-left">
              Name
            </th>
            <th className="border border-gray-300 px-2 text-left">
              Date
            </th>
            <th className="border border-gray-300 px-2 text-left">
              Repeats (Y/N)
            </th>
          </tr>
        </thead>
        <tbody>
          {holidays?.map((holiday: any) => (
            <tr key={holiday.tempId}>
              <td className="max-w-[200px] break-all border border-gray-300 px-2">
                {holiday?.name}
              </td>
              <td className="min-w-[100px] border border-gray-300 px-2">
                {`${moment(holiday?.date).format(
                  "MM-DD-yyyy",
                )}`}
              </td>
              <td className="border border-gray-300 px-2">
                <div className="">
                  <span>
                    {holiday?.one_time ? "N" : "Y"}
                  </span>
                </div>
              </td>
              <td className="px-2">
                <div className="">
                  <button
                    onClick={() =>
                      onDeleteCustomerHoliday(holiday)
                    }
                    className="cursor-pointer text-primaryViolet"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface AdditionalInfoItemProps {
  name: string;
  checked: boolean;
  onChange: () => void;
}

const AdditionalInfoItem = (
  props: AdditionalInfoItemProps,
) => {
  const { name, checked, onChange } = props;

  return (
    <div className="py-2">
      <CheckboxInput
        label={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
