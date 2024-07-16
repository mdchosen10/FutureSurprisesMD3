/* eslint-disable no-unused-vars */
import Image from "next/image";

type GiftCardProps = {
  data: {
    description: string;
    id: 1;
    image: string;
    name: string;
  };
  defaultGiftId: number;
  selectedGiftId?: number;
  onGiftSelection: (id: number) => void;
};

const GiftCard = ({
  data,
  selectedGiftId,
  defaultGiftId,
  onGiftSelection,
}: GiftCardProps) => {
  return (
    <div
      onClick={() => onGiftSelection(data.id)}
      className={`relative cursor-pointer rounded-md border-2 transition-all duration-300 ease-in-out ${
        selectedGiftId === data.id
          ? "z-10 scale-105 border-primaryViolet bg-white shadow-md"
          : ""
      }`}
    >
      {selectedGiftId === data.id &&
        data.id === defaultGiftId && (
          <div className="w-full bg-primaryViolet p-2 text-center text-xs text-white">
            <p>Selected</p>
          </div>
        )}
      <div className="space-y-3 p-2">
        <Image
          src={data.image}
          alt="gift-image"
          className="h-[200px] w-full rounded-md bg-gray-100 object-cover"
          height={0}
          width={0}
        />
        <h4>{data?.name}</h4>
        <p className="text-xs text-gray-600">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default GiftCard;
