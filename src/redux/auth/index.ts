import * as actions from "./actions";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

export interface User {
  user: any | null;
  error: object;
  loading: boolean;
  userMedusaData: any;
}

const initialState: User = {
  user: {},
  error: {},
  loading: false,
  userMedusaData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: state => {
    //   state.user = null;
    // },
  },
  extraReducers: builder => {
    /******************LOGIN******************/
    builder.addCase(actions.login.pending.type, state => {
      state.loading = true;
    });
    builder.addCase(
      actions.login.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action?.payload?.customer;
      },
    );
    builder.addCase(
      actions.login.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action?.payload;
      },
    );
    /******************LOGOUT******************/
    builder.addCase(actions.logout.pending.type, state => {
      state.loading = true;
    });
    builder.addCase(
      actions.logout.fulfilled.type,
      state => {
        state.loading = false;
        state.user = {};
        signOut();
      },
    );
    builder.addCase(
      actions.logout.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    /******************GET CUSTOMER******************/
    builder.addCase(
      actions.getCurrentCustomer.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getCurrentCustomer.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action?.payload?.customer;
      },
    );

    //REGISTER
    builder.addCase(
      actions.register.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.register.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload?.customer;
      },
    );
    builder.addCase(
      actions.register.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //CREATE STRIPE CUSTOMER ACCOUNT
    builder.addCase(
      actions.createStripeCustomerAccount.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.createStripeCustomerAccount.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = {
          ...state.user,
          metadata: {
            ...state.user.metadata,
            stripe_id: action.payload?.customer?.id,
          },
        };
      },
    );
    builder.addCase(
      actions.createStripeCustomerAccount.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //UPDATE MEDUSA CUSTOMER ACCOUNT
    builder.addCase(
      actions.updateMedusaCustomerAccount.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.updateMedusaCustomerAccount.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.data?.customer;
      },
    );
    builder.addCase(
      actions.updateMedusaCustomerAccount.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //GET A CUSTOMER
    builder.addCase(
      actions.getCustomer.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getCustomer.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.data?.customer;
      },
    );
    builder.addCase(
      actions.getCustomer.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //FORGOT PASSWORD
    builder.addCase(
      actions.forgotPassword.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.forgotPassword.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.forgotPassword.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //RESET PASSWORD
    builder.addCase(
      actions.resetPassword.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.resetPassword.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.resetPassword.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //VERIFY EMAIL
    builder.addCase(
      actions.verifyEmail.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.verifyEmail.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.verifyEmail.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
