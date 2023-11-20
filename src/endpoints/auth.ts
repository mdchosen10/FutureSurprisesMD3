import axiosInstance from "@/utils/api";
import { AxiosResponse } from "axios";

export const login = (
  config = {},
): Promise<AxiosResponse> => {
  // const {} = config
  return axiosInstance({
    url: "/store/auth/token",
    method: "POST",
    ...config,
  });
};

export const logout = (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/auth ",
    withCredentials: true,
    method: "DELETE",
  });
};

export const register = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers ",
    method: "POST",
    ...config,
  });
};

export const createStripeCustomerAccount = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/createStripeCustomer",
    method: "POST",
    ...config,
  });
};

export const updateMedusaCustomerAccount = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/me",
    withCredentials: true,
    method: "POST",
    ...config,
  });
};

export const getCustomer = (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/me",
    withCredentials: true,
    method: "GET",
  });
};

export const getCurrentCustomer =
  (): Promise<AxiosResponse> => {
    return axiosInstance({
      url: "/store/auth ",
      withCredentials: true,
      method: "GET",
    });
  };

export const forgotPassword = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/password-token",
    withCredentials: true,
    method: "POST",
    ...config,
  });
};

export const resetPassword = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/password-reset",
    withCredentials: true,
    method: "POST",
    ...config,
  });
};

export const verifyEmail = (
  config: any = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/store/auth/${config.params.customer_email}`,
    withCredentials: true,
    method: "GET",
    ...config,
  });
};
