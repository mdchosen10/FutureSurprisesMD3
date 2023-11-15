import { createAsyncThunk } from "@reduxjs/toolkit";
import * as paymentAPI from "@/endpoints/payment";
import { AxiosResponse } from "axios";

export const getSavedPaymentMethods = createAsyncThunk<
  AxiosResponse,
  any
>("payment/getSavedPaymentMethods", async (config: any) => {
  const res =
    await paymentAPI.getSavedPaymentMethods(config);
  return res as AxiosResponse;
});

export const detachPaymentMethod = createAsyncThunk<
  AxiosResponse,
  any
>("payment/detachPaymentMethod", async (config: any) => {
  const res = await paymentAPI.detachPaymentMethod(config);
  return res as AxiosResponse;
});
