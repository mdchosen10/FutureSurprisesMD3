import axiosInstance from "@/utils/api";
import { AxiosResponse } from "axios";

export const getAllOrders = (): Promise<AxiosResponse> => {
  return axiosInstance({
    url: `/store/customers/me/orders`,
    method: "GET",
    withCredentials: true,
  });
};
