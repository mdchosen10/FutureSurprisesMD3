import React, { useState } from "react";
import Button from "./shared/Button";
import Spinner from "./shared/Spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SuccessMessage from "./SuccessMessage";

const Hurray = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const user = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");
      const formData = JSON.parse(
        sessionStorage.getItem("formData") || "{}",
      );
      const response = await fetch(
        `${process.env.BASE_URL}/fillout/customers/${user?.id}/add-recipient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData }),
        },
      );

      const final = await response.json();
      if (final) {
        setLoading(false);
        sessionStorage.removeItem("formData");
        sessionStorage.removeItem("redirect");
        toast.success(
          "Recipient details stored successfully",
        );
        setSuccess(true);
      } else {
        sessionStorage.removeItem("formData");
        sessionStorage.removeItem("redirect");
        setLoading(false);
        toast.error("Failed to store recipient details");
        router.push("/surprise");
      }
    } catch (err) {
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("redirect");
      setLoading(false);
      toast.error("Failed to store recipient details");
      setSuccess(false);
      router.push("/surprise");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#2f1752]">
      {!success ? (
        <div className="flex h-full flex-col items-center gap-6 p-6 pt-20 font-noto text-white">
          <h3 className="text-2xl font-bold text-white lg:text-4xl">
            Save Recipient
          </h3>
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-center">
              Click submit to save your recipient details.
            </p>
            <Button
              onClick={handleSubmit}
              className="mx-auto flex gap-3 bg-white !px-10 py-2 text-lg font-bold !text-black"
              disabled={loading}
            >
              Submit
              {loading && <Spinner />}
            </Button>
          </div>
        </div>
      ) : (
        <SuccessMessage />
      )}
    </div>
  );
};

export default Hurray;
