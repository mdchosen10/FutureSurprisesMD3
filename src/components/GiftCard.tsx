/* eslint-disable no-unused-vars */
import Image from "next/image";

type GiftCardProps = {
  data: {
    description: string;
    id: 1;
    image: string;
    name: string;
  };
  selectedGiftId?: number;
  onGiftSelection: (id: number) => void;
};

const GiftCard = ({
  data,
  selectedGiftId,
  onGiftSelection,
}: GiftCardProps) => {
  return (
    <div
      onClick={() => onGiftSelection(data.id)}
      className={`relative cursor-pointer space-y-3 ${
        selectedGiftId === data.id
          ? "rounded-md border-2 border-primaryViolet p-2 shadow-md"
          : ""
      }`}
    >
      {selectedGiftId === data.id && (
        <div className="absolute right-2 top-2 w-fit rounded bg-primaryViolet px-2 text-sm text-white">
          Selected
        </div>
      )}
      <Image
        src={data.image}
        alt="gift-image"
        className="h-[200px] w-full rounded-md bg-gray-100"
        height={0}
        width={0}
      />
      <h4>{data?.name}</h4>
      <p>
        dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry standard dummy
        text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a
        type specimen book. It has survived not only five
        centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged.
      </p>
    </div>
  );
};

export default GiftCard;
