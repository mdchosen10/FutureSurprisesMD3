import React from "react";
import { Modal } from "flowbite-react";

import Button from "../Button";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  loading,
  disabled,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Modal
      dismissible={true}
      show={isOpen}
      onClose={() => setIsOpen(false)}
      size="lg"
    >
      <div className="flex flex-col items-center gap-4 p-4 px-[20px] py-10 font-mainText lg:px-[50px]">
        <h1 className="heading-gradient text-center text-[30px] font-bold lg:text-[36px]">
          Are you sure you want to delete ?
        </h1>
        <div className="mt-10 flex gap-4">
          <Button
            isLoading={loading}
            name="Delete"
            disabled={loading || disabled}
            onClick={onConfirm}
            bgClass="button-shadow text-[#A93CC9] px-[25px] py-[10px] lg:py-[15px] hover:shadow-md"
          />
          <Button
            name="Cancel"
            bgClass="button-shadow bg-gradient-to-r from-[#2c2434] to-[#CA6CE6] hover:shadow-md text-white px-[25px] py-[10px] lg:py-[15px]"
            onClick={() => {
              setIsOpen(false);
            }}
            disabled={loading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
