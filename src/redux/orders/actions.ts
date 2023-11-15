import { createAsyncThunk } from "@reduxjs/toolkit";
import * as ordersApi from "@/endpoints/orders";
import { AxiosRequestConfig } from "axios";

export const getAllOrders =
  createAsyncThunk<AxiosRequestConfig>(
    "customer/getOrders",
    async () => {
      const res = await ordersApi.getAllOrders();
      return res.data as any;
    },
  );
