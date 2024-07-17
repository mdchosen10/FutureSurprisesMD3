"use client";

import GiftCard from "@/components/GiftCard";
import axiosInstance from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";

type Gift = {
  description: string;
  id: 1;
  image: string;
  name: string;
};

type GiftProps = {
  params: { giftId: string };
};
const GiftOptions = ({ params }: GiftProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [selectedGift, setSelectedGift] =
    useState<Gift | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGiftOptions = async () => {
    try {
      const response = await axiosInstance.get(
        `/store/gift?id=${params.giftId}`,
      );
      if (response.status === 200) {
        if (response.data?.message === "ok") {
          const data = response?.data?.data;
          setSelectedGift(
            data?.metadata?.selectedGift || null,
          );
          return setPageData(data);
        }
      }
      setError(response?.data?.message);
      toast.error(response?.data?.message);
    } catch (error) {
      setError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGiftSelection = (id: number) => {
    const findGift = pageData.giftOptions?.find(
      (i: any) => i.id === id,
    );
    if (findGift) {
      setSelectedGift(findGift);
    }
  };

  function formatDate(date: Date) {
    const momentDate = moment(date).add(10, "days");
    const formattedDate = momentDate.format("DD-MM-YYYY");
    return formattedDate;
  }

  useEffect(() => {
    fetchGiftOptions();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-[1000px] flex-col space-y-4 pt-[130px] font-mainText md:pb-6">
        <h3 className="font-mainHeading text-2xl text-primaryViolet">
          Loading...
        </h3>
      </div>
    );
  }

  if (!pageData && error) {
    return (
      <div className="mx-auto flex max-w-[1000px] flex-col space-y-4 px-5 pt-[130px] font-mainText md:pb-6 lg:px-0">
        <h3 className="font-mainHeading text-2xl text-primaryViolet">
          {error}
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-[1000px] flex-col space-y-4 px-5 pt-[130px] font-mainText md:pb-6 lg:px-0">
        <h3 className="font-mainHeading text-2xl text-primaryViolet">
          Select a Gift for Your Recipient
        </h3>
        <div>
          <h3>Recipient Details</h3>
          <h6>
            Name : {pageData?.recipient?.first_name}{" "}
            {pageData?.recipient?.last_name}
          </h6>
          <h6>
            Holiday :{" "}
            {pageData?.order?.metadata?.holiday_name} -{" "}
            {pageData?.order?.metadata?.holiday_date}
          </h6>
          <h6>
            Spending : $
            {pageData?.recipient?.default_spending}
          </h6>
        </div>
        <div className="text-sm text-red-600">
          *Please note that this link will expire on{" : "}
          {formatDate(pageData?.metadata?.issuedAt)}
        </div>

        <h1 className="text-center font-mainHeading text-lg text-primaryViolet md:text-2xl">
          Available Gifts
        </h1>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {pageData?.giftOptions &&
            pageData.giftOptions?.map((item: any) => (
              <GiftCard
                key={item.id}
                data={item}
                selectedGiftId={selectedGift?.id}
                defaultGiftId={
                  pageData?.metadata?.selectedGift?.id
                }
                onGiftSelection={handleGiftSelection}
              />
            ))}
        </div>
      </div>
      {selectedGift?.id !==
        pageData?.metadata?.selectedGift?.id && (
        <div className="sticky bottom-0 z-20 flex min-h-[100px] w-full flex-col items-center justify-center gap-2 border-t border-primaryViolet bg-gray-50 px-3 py-6 text-center font-mainText text-sm">
          <p>
            Important Note: Once confirmed, changes to this
            gift will not be possible.
          </p>
          <p>
            If everything looks correct, you can simply
            click on the &quot;Confirm&quot; to finalize
            your gift.
          </p>
          <button className="rounded-md bg-primaryViolet p-2 px-6 text-white">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default GiftOptions;
