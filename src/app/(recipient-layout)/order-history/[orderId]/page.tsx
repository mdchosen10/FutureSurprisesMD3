"use client";

// import Image from "next/image";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/api";
// import GiftBag from "../../../../../public/images/gift-bag.png";

const OrderHistoryPage = () => {
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params && params?.orderId) {
      setLoading(true);
      axiosInstance
        .get(`/store/orders/${params?.orderId}`)
        .then(res => {
          setLoading(false);
          setOrderDetails(res?.data?.order);
        })
        .catch(err => {
          setLoading(false);
          toast.error(
            err?.message || "Failed to fetch order details",
          );
        });
    }
  }, [params?.orderId]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : orderDetails?.items?.length > 0 ? (
        <div className="mx-auto my-10 max-w-[1000px] px-3 lg:my-[96px]">
          {/* Title */}
          <div className="flex justify-center md:justify-start md:pt-10">
            <h1 className="heading-gradient font-mainHeading text-4xl font-bold">
              Order History
            </h1>
          </div>

          {/* Successful card */}
          <div className="mt-8 max-w-xl rounded-[10px] border border-primaryViolet bg-[#A93CC90D] p-4">
            <h4 className="text-base font-semibold text-primaryBlack">
              Order Status :{" "}
              <span className="font-normal capitalize text-gray-500">
                {orderDetails?.status}
              </span>
            </h4>
            <p className="text-sm font-normal text-primaryBlack">
              Estimated delivery date :{" "}
              <span className="text-gray-500">
                {
                  orderDetails?.items.at(0)?.metadata
                    ?.holiday_date
                }
              </span>
            </p>
          </div>

          {/* Message card */}
          <div className="mt-4 flex max-w-xl flex-col items-start justify-start gap-4 rounded-[10px] border border-[#6c667233] bg-white p-4 sm:flex-row">
            {/* <div className="min-h-[175px] min-w-[186px]  rounded-[10px] border border-[#6c667280] bg-[#FEFAFE]">
              <Image
                className="mx-auto"
                src={GiftBag}
                alt=""
              />
            </div> */}
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-primaryBlack">
                Message
              </h6>
              <p className="mt-2 text-sm font-normal text-primaryBlack">
                {orderDetails?.items[0]?.metadata?.recipient
                  ?.personal_message || "--"}
              </p>
            </div>
          </div>

          {/* Delivery address */}
          <h6 className="my-5 text-sm font-semibold text-primaryBlack">
            Delivery Address
          </h6>
          <div className="max-w-xl rounded-[10px] border border-[#6c667233] bg-white  p-4">
            <h6 className="text-sm font-semibold text-primaryBlack">
              Address
            </h6>
            <p className="mt-2 text-sm font-normal text-primaryBlack">
              {orderDetails?.items[0]?.metadata
                ?.recipient_shipping_address?.address_1 ||
                "--"}
            </p>
            <p className="mt-2 text-sm font-normal text-primaryBlack">
              {orderDetails?.items[0]?.metadata
                ?.recipient_shipping_address?.city || "--"}
            </p>
            <p className="mt-2 text-sm font-normal text-primaryBlack">
              {orderDetails?.items[0]?.metadata
                ?.recipient_shipping_address?.province ||
                "--"}
            </p>
            <p className="mt-2 text-sm font-normal text-primaryBlack">
              {orderDetails?.items[0]?.metadata
                ?.recipient_shipping_address?.postal_code ||
                "--"}
            </p>
          </div>

          {/* Billing details */}
          <h6 className="my-5 text-sm font-semibold text-primaryBlack">
            Billing Details
          </h6>
          <div className="max-w-xl rounded-[10px] border border-[#6c667233] bg-white ">
            <div className="flex w-full items-center justify-between border-b border-dashed border-[#EBEBEB] px-8 py-5">
              <p className="text-sm font-normal text-primaryBlack">
                Item Total
              </p>
              <p className="text-sm font-normal text-primaryBlack">
                ${orderDetails?.items[0]?.unit_price / 100}
              </p>
            </div>
            <div className="flex w-full items-center justify-between px-8 py-5">
              <p className="text-base font-semibold text-primaryBlack">
                Total Pay
              </p>
              <p className="text-base font-semibold text-primaryBlack">
                ${orderDetails?.items[0]?.total / 100}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderHistoryPage;
