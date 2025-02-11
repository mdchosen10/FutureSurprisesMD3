"use client";
/* eslint-disable no-unused-vars */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface FormDataContextType {
  formData: any;
  setFormData: (data: any) => void;
}

const FormDataContext = createContext<
  FormDataContextType | undefined
>(undefined);

export const FormDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<any>(null);

  return (
    <FormDataContext.Provider
      value={{ formData, setFormData }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error(
      "useFormData must be used within a FormDataProvider",
    );
  }
  return context;
};
