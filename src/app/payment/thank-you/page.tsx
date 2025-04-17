"use client";

import SuccessMessage from "@/components/SuccessMessage";
import React from "react";

const page = () => {
  return (
    <div>
      <SuccessMessage
        message="Payment details saved successfully."
        link="/my-account/payment"
        classNames="bg-white text-primary"
      />
    </div>
  );
};

export default page;
