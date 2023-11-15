import axiosInstance from "@/utils/api";
import { AxiosResponse } from "axios";

export const getCategories = (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: "/store/product-categories",
    withCredentials: true,
    method: "GET",
  });
};

export const getProducts = (
  config: any,
): Promise<AxiosResponse> => {
  const { options } = config;
  return axiosInstance({
    url: `/store/products`,
    withCredentials: true,
    method: "GET",
    ...options,
  });
};

export const getProduct = (
  config: any,
): Promise<AxiosResponse> => {
  const { options } = config;
  return axiosInstance({
    url: `/store/products/${options.params.id}`,
    withCredentials: true,
    method: "GET",
  });
};
