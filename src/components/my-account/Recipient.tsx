"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import moment from "moment";
import {
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Spinner, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";

import DeleteModal from "./DeleteModal";
import BasicTable from "@/components/BasicTable";
import { useAppDispatch, useAppSelector } from "@/hooks";
import * as recipientActions from "@/redux/recipient/actions";
import Image from "next/image";
import Alert from "@/../public/images/alert.png";
import * as authActions from "@/redux/auth/actions";

const getNextHoliday = (recipient: any) => {
  let holidays = recipient?.all_holidays.slice();
  const sorted =
    holidays?.sort(
      (a: any, b: any) =>
        (moment(a.date) as any) - (moment(b.date) as any),
    ) || [];

  const currentDate = moment();

  const upcomingHoliday = sorted.find(
    (holiday: any) => moment(holiday.date) >= currentDate,
  );

  return upcomingHoliday;
};

const EditDelete = ({
  setDeleteModal,
  setRecipientId,
  id,
  recipient,
}: {
  setDeleteModal: Function;
  setRecipientId: Function;
  id: string;
  recipient: any;
}) => {
  let next_holiday = getNextHoliday(recipient);

  const router = useRouter();

  return (
    <div className="flex gap-3 text-[14px]">
      <div className="mr-2">
        <button
          onClick={() => {
            router.push(`/add-or-edit-recipient?id=${id}`);
          }}
          className="mr-2 font-mainText text-[#A93CC9] hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setDeleteModal(true);
            setRecipientId(id);
          }}
          className="font-mainText text-[#DB2C21] hover:underline "
        >
          Delete
        </button>
      </div>
      {!next_holiday?.name ? (
        <Tooltip
          content={
            "Please update the recipient by selecting holidays."
          }
          placement="top"
          arrow={false}
        >
          <Image
            src={Alert}
            alt="help"
            width={15}
            height={15}
            className="mb-[2px] min-w-[15px]"
          />
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

const Recipient = () => {
  const [deleteModal, setDeleteModal] = useState(false);

  const [recipients, setRecipients] = useState<any[]>([]);

  const [recipientId, setRecipientId] =
    useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(
    state => state?.authSlice?.user,
  );

  // const recipientsLoading = useAppSelector(
  //   state => state?.recipientSlice?.loading,
  // );

  const [recipientsLoading, setRecipientsLoading] =
    useState(false);

  const deleteLoader = useAppSelector(
    state => state?.recipientSlice?.deleteLoading,
  );
  const recipientTableHeaders: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "relationship",
      header: "Relationship",
    },
    {
      accessorKey: "next_holiday",
      header: "Next Holiday",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "date",
      header: "Date",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: info =>
        flexRender(EditDelete, {
          setDeleteModal,
          setRecipientId,
          id: info?.row?.original?.id,
          recipient: info?.row?.original,
        }),
    },
  ];

  const getRecipients = useCallback(async () => {
    if (user && user?.id) {
      setRecipientsLoading(true);
      const res = await dispatch(
        recipientActions.getAddedRecipients({
          data: user?.id,
        }),
      );
      if (res?.payload?.recipients) {
        setRecipients(res?.payload?.recipients);
      } else {
        toast.error(
          "Failed to load recipients, please refresh!",
        );
      }
      setRecipientsLoading(false);
    }
  }, [dispatch, user]);
  const fetchUser = useCallback(async () => {
    const res = await dispatch(
      authActions.getCustomer(),
    ).unwrap();
    if (res.status === 200) {
      getRecipients();
    } else {
      toast.error("Database error!");
    }
  }, [dispatch]);

  const deleteRecipient = useCallback(async () => {
    const res: any = await dispatch(
      recipientActions.deleteRecipient({
        data: recipientId,
      }),
    );
    if (res?.payload.success) {
      toast.success("Recipient deleted successfully");
      setDeleteModal(false);
      getRecipients();
      return;
    }
    toast.error("Something went wrong!");
  }, [recipientId, dispatch]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className=" mb-2 flex w-full justify-between border-b border-[#A93CC940] pb-[10px] md:px-5">
        <h1 className="heading-gradient text-[24px] font-[700]">
          Recipient
        </h1>
        <button
          onClick={() => router.push("/surprise")}
          className="rounded-[10px] bg-primary px-10 py-3 font-mainText text-lg font-bold text-white"
        >
          Add Recipient
        </button>
      </div>

      <div className="hidden lg:block">
        {recipientsLoading ? (
          <div className="flex h-[100px] w-full items-center justify-center">
            <Spinner size="lg" color="pink" />
          </div>
        ) : recipients?.length > 0 ? (
          <div className="md:px-5">
            <BasicTable
              headers={recipientTableHeaders}
              data={recipients?.map(recipient => {
                let next_holiday =
                  getNextHoliday(recipient);
                return {
                  ...recipient,
                  name: `${recipient?.first_name || ""} ${
                    recipient?.last_name || ""
                  }`,
                  date: next_holiday
                    ? moment(next_holiday?.date).format(
                        "MM-DD-YYYY",
                      )
                    : "",
                  amount: `$${recipient?.default_spending}`,
                  next_holiday: next_holiday?.name,
                };
              })}
              headerClass=""
              type="striped"
            />
          </div>
        ) : (
          <p className="my-5 w-full text-center font-mainText">
            Look&apos;s like no one is here! Let&apos;s fix
            that! Click on add recipients to get started!
          </p>
        )}
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden">
        {!recipients.length && (
          <p className="my-5 w-full text-center font-mainText">
            Look&apos;s like no one is here! Let&apos;s fix
            that! Click on add recipients to get started!
          </p>
        )}
        {recipientsLoading ? (
          <div className="flex h-[100px] w-full items-center justify-center">
            <Spinner size="lg" color="pink" />
          </div>
        ) : (
          recipients?.map((item: any) => {
            let next_holiday = getNextHoliday(item);
            return (
              <div
                key={item?.id}
                className="mb-[15px] flex w-full flex-col rounded-[10px] border border-[#a7a3aa] font-mainText text-[14px]"
              >
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Name
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {`${item?.first_name || ""} ${
                      item?.last_name || ""
                    }`}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Relationship
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {item?.relationship}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Next Holiday
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {next_holiday?.name ?? (
                      <Tooltip
                        content={
                          "Please update the recipient by selecting holidays."
                        }
                        placement="top"
                        arrow={false}
                      >
                        <Image
                          src={Alert}
                          alt="help"
                          width={15}
                          height={15}
                          className="mb-[2px] min-w-[15px]"
                        />
                      </Tooltip>
                    )}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Date
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {next_holiday?.name
                      ? moment(next_holiday?.date).format(
                          "MM-DD-YYYY",
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Amount
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    ${item?.default_spending}
                  </span>
                </div>
                <div className="mt-2 flex w-full border-t border-[#a7a3aa]">
                  <button
                    onClick={() =>
                      router.push(
                        `/add-or-edit-recipient?id=${item?.id}`,
                      )
                    }
                    className="w-1/2 border-r border-[#a7a3aa]  py-2 font-mainText text-[#A93CC9] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                      setRecipientId(item?.id);
                    }}
                    className="w-1/2 py-2 font-mainText text-[#DB2C21] hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {deleteModal ? (
        <DeleteModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          onConfirm={deleteRecipient}
          loading={deleteLoader}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Recipient;
