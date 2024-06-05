import "react-phone-number-input/style.css";
import "@/styles/phone-number-input.css";
import PhoneInput, {
  Country,
} from "react-phone-number-input";
import { forwardRef } from "react";

type PhoneNumberInputProps = {
  placeholder: string;
  value: string | undefined;
  onChange: () => void;
  defaultCountry?: Country;
  errors?: string;
};

const PhoneNumberInput = (
  {
    value,
    onChange,
    placeholder = "Enter phone number",
    defaultCountry = undefined,
    errors,
  }: PhoneNumberInputProps,
  ref: any,
) => {
  return (
    <div className="flex flex-col gap-1">
      <PhoneInput
        value={value}
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        onChange={onChange}
        ref={ref}
      />
      {errors && (
        <p className="font-mainText text-xs text-red-600">
          {errors}
        </p>
      )}
    </div>
  );
};

export default forwardRef(PhoneNumberInput);
