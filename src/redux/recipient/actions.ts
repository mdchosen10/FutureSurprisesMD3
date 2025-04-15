import { createAsyncThunk } from "@reduxjs/toolkit";
import * as recipientApi from "@/endpoints/recipient";
import { AxiosResponse, AxiosRequestConfig } from "axios";

interface addNewAddressPayload {
  data: {
    address: {
      first_name: string;
      last_name: string;
      address_1: string;
      city: string;
      province: string;
      country_code: string;
      postal_code: string;
      metadata: {
        nickname: string;
      };
    };
  };
}

export const addNewAddress = createAsyncThunk<
  AxiosResponse,
  addNewAddressPayload
>(
  "auth/addNewAddressPayload",
  async (config: addNewAddressPayload) => {
    const res = await recipientApi.addNewAddress(config);
    return res.data as AxiosResponse;
  },
);

export const getRecipientDetails = createAsyncThunk<
  AxiosResponse,
  AxiosRequestConfig
>("auth/getAddedRecipients", async (config: any) => {
  const res = await recipientApi.getAddedRecipients(config);
  return res.data as AxiosResponse;
});

export const getRecipient = createAsyncThunk<
  AxiosResponse,
  AxiosRequestConfig
>("auth/getRecipient", async (config: any) => {
  const res = await recipientApi.getRecipient(config);
  return res.data as AxiosResponse;
});

export const getAddedRecipients = createAsyncThunk<
  any,
  AxiosRequestConfig
>("auth/getAddedRecipients", async (config: any) => {
  const res = await recipientApi.getAddedRecipients(config);
  return res.data as any;
});

export const addRecipient = createAsyncThunk<
  AxiosResponse,
  any
>("auth/addRecipient", async (config: any) => {
  const res = await recipientApi.addRecipient(config);
  return res.data as AxiosResponse;
});

export const updateRecipient = createAsyncThunk<
  AxiosResponse,
  any
>("auth/updateRecipient", async (config: any) => {
  const res = await recipientApi.updateRecipient(config);
  return res.data as AxiosResponse;
});

export const deleteRecipient = createAsyncThunk<
  AxiosResponse,
  AxiosRequestConfig
>("auth/deleteRecipient", async (config: any) => {
  const res = await recipientApi.deleteRecipient(config);
  return res.data as AxiosResponse;
});

export const deleteAddress = createAsyncThunk<
  AxiosResponse,
  any
>(
  "auth/deleteAddress",
  async (config: addNewAddressPayload) => {
    const res: any =
      await recipientApi.deleteAddress(config);
    return res as AxiosResponse;
  },
);
