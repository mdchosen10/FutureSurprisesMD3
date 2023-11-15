import axiosInstance from "@/utils/api";
import { AxiosResponse } from "axios";

export const createStripeSetupIntent = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/createStripeSetupIntent",
    method: "POST",
    ...config,
  });
};

export const getSavedPaymentMethods = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/stripePaymentMethods",
    method: "POST",
    ...config,
  });
};

export const detachPaymentMethod = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/detachPaymentMethod",
    method: "POST",
    ...config,
  });
};
