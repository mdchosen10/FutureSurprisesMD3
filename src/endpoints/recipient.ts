import axiosInstance from "@/utils/api";
import { AxiosResponse } from "axios";

export const getAllAddresses = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/me",
    method: "GET",
    withCredentials: true,
    ...config,
  });
};

export const addNewAddress = (
  config = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/customers/me/addresses",
    method: "POST",
    withCredentials: true,
    ...config,
  });
};

export const getAddedRecipients = (
  config: any = {},
): Promise<AxiosResponse> => {
  const id = config.data || null;
  return axiosInstance({
    url: `/store/customers/${id}/recipients`,
    method: "GET",
    withCredentials: true,
    ...config,
  });
};

export const addRecipient = (
  config: any = {},
): Promise<AxiosResponse> => {
  const { data, options } = config;
  return axiosInstance({
    url: `/store/customers/${options.params.id}/recipients`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const updateRecipient = (
  config: any = {},
): Promise<AxiosResponse> => {
  const { data, options } = config;
  return axiosInstance({
    url: `/store/recipients/${options.params.id}`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const deleteRecipient = (
  config: any = {},
): Promise<AxiosResponse> => {
  const id = config.data || null;
  return axiosInstance({
    url: `/store/recipients/${id}`,
    method: "DELETE",
    withCredentials: true,
    ...config,
  });
};

export const deleteAddress = (
  config: any = {},
): Promise<AxiosResponse> => {
  const { address_id } = config.params || null;
  return axiosInstance({
    url: `/store/customers/me/addresses/${address_id}`,
    method: "DELETE",
    withCredentials: true,
    ...config,
  });
};
