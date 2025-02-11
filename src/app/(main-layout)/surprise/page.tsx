"use client";

import FilloutForm from "@/components/FilloutForm";
import { useFormData } from "@/context/FormDataContext";
import React, { useEffect, useState } from "react";

const Surprise = () => {
  const [hasData, setHasData] = useState(false);
  const { formData } = useFormData();

  useEffect(() => {
    if (formData && Object.keys(formData)?.length > 0) {
      setHasData(true);
    }
  }, []);
  return (
    <div className="flex h-full min-h-screen w-screen pt-[85px]">
      <FilloutForm hasData={hasData} />
    </div>
  );
};

export default Surprise;
