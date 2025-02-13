"use client";

import FilloutForm from "@/components/FilloutForm";
import Hurray from "@/components/Hurray";
import React, { useEffect, useState } from "react";

const Surprise = () => {
  const [hasData, setHasData] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    const formData =
      sessionStorage.getItem("formData") ?? "{}";
    if (
      formData &&
      Object.keys(JSON.parse(formData))?.length > 0 &&
      redirect &&
      redirect == "true"
    ) {
      setHasData(true);
    }
    setUpdated(true);
  }, []);
  return updated ? (
    <div className="flex h-full min-h-screen pt-[90px]">
      {hasData ? <Hurray /> : <FilloutForm />}
    </div>
  ) : (
    ""
  );
};

export default Surprise;
