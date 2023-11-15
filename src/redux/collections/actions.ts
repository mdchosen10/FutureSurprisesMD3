import { createAsyncThunk } from "@reduxjs/toolkit";
import * as collectionsAPI from "@/endpoints/collections";
import { AxiosResponse } from "axios";

export const getCategories =
  createAsyncThunk<AxiosResponse>(
    "collection/getCategories",
    async () => {
      const res = await collectionsAPI.getCategories();
      return res.data as AxiosResponse;
    },
  );

export const getProducts = createAsyncThunk<
  AxiosResponse,
  any
>("collection/getProducts", async (config: any) => {
  const res = await collectionsAPI.getProducts(config);
  return res.data as AxiosResponse;
});

export const getProduct = createAsyncThunk<
  AxiosResponse,
  any
>("collection/getProduct", async (config: any) => {
  const res = await collectionsAPI.getProduct(config);
  return res.data as AxiosResponse;
});
