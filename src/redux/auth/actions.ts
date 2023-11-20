import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "@/endpoints/auth";
import { AxiosResponse } from "axios";

interface LoginPayload {
  data: {
    email: string;
    password: string;
  };
}

interface RegisterPayload {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  };
}

interface createStripeCustomerAccountPayload {
  data: {
    medusa_id: string;
  };
}

export const login = createAsyncThunk<
  AxiosResponse,
  LoginPayload
>("auth/login", async (config: LoginPayload) => {
  const res = await authApi.login(config);
  return res as AxiosResponse;
});

export const logout = createAsyncThunk<AxiosResponse>(
  "auth/logout",
  async () => {
    const res = await authApi.logout();
    return res as AxiosResponse; // Make sure to access data from AxiosResponse
  },
);

export const register = createAsyncThunk<
  AxiosResponse,
  RegisterPayload
>("auth/register", async (config: RegisterPayload) => {
  const res = await authApi.register(config);
  return res.data as AxiosResponse;
});

export const getCurrentCustomer =
  createAsyncThunk<AxiosResponse>(
    "auth/getCurrentCustomer",
    async () => {
      const res = await authApi.getCurrentCustomer();
      return res.data as AxiosResponse;
    },
  );

export const createStripeCustomerAccount = createAsyncThunk<
  AxiosResponse,
  createStripeCustomerAccountPayload
>(
  "auth/createStripeCustomerAccount",
  async (config: createStripeCustomerAccountPayload) => {
    const res =
      await authApi.createStripeCustomerAccount(config);
    return res.data as AxiosResponse;
  },
);

export const updateMedusaCustomerAccount = createAsyncThunk<
  AxiosResponse,
  any
>(
  "auth/updateMedusaCustomerAccount",
  async (config: any) => {
    const res =
      await authApi.updateMedusaCustomerAccount(config);
    return res;
  },
);

export const getCustomer = createAsyncThunk<AxiosResponse>(
  "auth/getCustomer",
  async () => {
    const res = await authApi.getCustomer();
    if (
      res.data &&
      res.data?.customer?.metadata?.stripe_id &&
      res.data?.customer?.metadata?.stripe_id !== ""
    ) {
      return res as AxiosResponse;
    } else {
      const stripeResponse =
        await authApi.createStripeCustomerAccount({
          medusa_id: res?.data?.customer?.id,
        });
      await authApi.updateMedusaCustomerAccount({
        data: {
          metadata: {
            stripe_id: stripeResponse?.data?.customer?.id,
          },
        },
      });

      const updatedCustomer = await authApi.getCustomer();
      return updatedCustomer as AxiosResponse;
    }
  },
);

export const forgotPassword = createAsyncThunk<
  AxiosResponse,
  any
>("auth/forgotPassword", async (config: any) => {
  const res = await authApi.forgotPassword(config);
  return res as AxiosResponse;
});

export const resetPassword = createAsyncThunk<
  AxiosResponse,
  any
>("auth/resetPassword", async (config: any) => {
  const res = await authApi.resetPassword(config);
  return res as AxiosResponse;
});

export const verifyEmail = createAsyncThunk<
  AxiosResponse,
  any
>("auth/verifyEmail", async (config: any) => {
  const res = await authApi.verifyEmail(config);
  // debugger
  return res as AxiosResponse;
});
