"use client";

import AddPaymentComponent from "@/components/AddPaymentComponent";
import { useRouter } from "next/navigation";
import React from "react";

const AddPaymentPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="relative">
        <AddPaymentComponent
          showButton={true}
          onCancel={() => {
            router.back();
          }}
        />
      </div>
    </div>
  );
};

export default AddPaymentPage;
