import React, { FC, forwardRef } from "react";

interface TextInputProps {
  name?: string;
  label?: string;
  placeholder: string;
  value?: string | number;
  errors?: string;
  onChange?: (e: any) => typeof e | void;
  disabled?: boolean;
  className?: string;
  type: "text" | "number" | "email" | "password";
  ref?: React.Ref<HTMLInputElement>;
}

const TextInput: FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>((props, ref) => {
  const {
    // name,
    // label,
    errors,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    className,
  } = props;

  return (
    <div className="flex w-full flex-col gap-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        disabled={disabled}
        className={className}
      />
      <p className="font-mainText text-xs text-red-600">
        {errors}
      </p>
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
