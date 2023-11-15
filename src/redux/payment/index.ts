import * as actions from "./actions";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface Payments {
  paymentMethods: any | null;
  loading: boolean;
  error: object;
}

const initialState: Payments = {
  paymentMethods: [],
  error: {},
  loading: false,
};

const collectionSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //GET SAVED PAYMENT METHODS
    builder.addCase(
      actions.getSavedPaymentMethods.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getSavedPaymentMethods.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.paymentMethods =
          action?.payload?.data?.paymentMethods?.data || [];
      },
    );
    builder.addCase(
      actions.getSavedPaymentMethods.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //DETACH PAYMENT METHOD
    builder.addCase(
      actions.detachPaymentMethod.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.detachPaymentMethod.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.detachPaymentMethod.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export default collectionSlice.reducer;
