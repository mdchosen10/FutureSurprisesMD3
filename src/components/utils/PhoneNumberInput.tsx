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

const NumberInput = forwardRef((props, ref: any) => {
  return (
    <div className="ml-1 flex flex-col gap-1">
      <div className="relative z-0">
        <input
          name="floating_text_input"
          {...props}
          className={`peer 
          block w-full appearance-none border-0
          bg-transparent 
           py-2.5 
          text-sm text-gray-900 
          focus:border-blue-600 focus:outline-none 
          focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500
          `}
          ref={ref}
          autoComplete="off"
          placeholder=""
        />
        <label
          htmlFor="floating_text_input"
          className={`
        absolute top-3 -z-10 origin-[0]  
        -translate-y-6 scale-75 transform font-mainText text-sm 
        text-xs text-gray-900 duration-300 peer-placeholder-shown:translate-y-0 
        peer-placeholder-shown:scale-100 
        peer-focus:left-0 
        peer-focus:-translate-y-6 
        peer-focus:scale-75 
        peer-focus:font-medium 
        peer-focus:text-blue-600
        dark:text-gray-400
        peer-focus:dark:text-blue-500 md:text-sm
        `}
        >
          Phone Number*
        </label>
      </div>
    </div>
  );
});

NumberInput.displayName = "NumberInput";

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
        international
        inputComponent={NumberInput}
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
