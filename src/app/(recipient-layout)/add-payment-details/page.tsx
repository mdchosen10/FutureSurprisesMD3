"use client";

import AddPaymentComponent from "@/components/AddPaymentComponent";

function PaymentDetails() {
  return (
    <div className="mt-[100px] flex flex-col items-center gap-11 px-6 pb-6 md:block md:px-[130px] md:pt-[100px]">
      <AddPaymentComponent
        showButton={false}
        onCancel={() => {}}
      />
    </div>
  );
}

export default PaymentDetails;
