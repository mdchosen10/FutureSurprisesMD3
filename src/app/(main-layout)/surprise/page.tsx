"use client";

import FilloutForm from "@/components/FilloutForm";
import React, { useEffect, useState } from "react";

const Surprise = () => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("formData");
    if (localData) {
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
