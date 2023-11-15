import * as actions from "./actions";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface recipient {
  error: object;
  loading: boolean;
  addresses: string[];
  deleteLoading: boolean;
  orders: object[];
}

const initialState: recipient = {
  addresses: [],
  orders: [],
  error: {},
  loading: false,
  deleteLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //GET ALL ORDERs
    builder.addCase(
      actions.getAllOrders.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getAllOrders.fulfilled.type,
      (state, action: PayloadAction<object[]>) => {
        state.loading = false;
        state.orders = action.payload;
      },
    );
    builder.addCase(
      actions.getAllOrders.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

// export const { logout } = orderSlice.actions;

export default orderSlice.reducer;
