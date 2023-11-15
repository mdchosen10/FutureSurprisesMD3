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
  addedRecipients: object[];
}

const initialState: recipient = {
  addresses: [],
  addedRecipients: [],
  error: {},
  loading: false,
  deleteLoading: false,
};

const recipientSlice = createSlice({
  name: "recipient",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //ADD NEW ADDRESS
    builder.addCase(
      actions.addNewAddress.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.addNewAddress.fulfilled.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.addresses.push(action.payload);
      },
    );
    builder.addCase(
      actions.addNewAddress.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //DELETE ADDRESS
    builder.addCase(
      actions.deleteAddress.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.deleteAddress.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.deleteAddress.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //GET ALL ADDED RECIPIENTS
    builder.addCase(
      actions.getAddedRecipients.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getAddedRecipients.fulfilled.type,
      (state, action: PayloadAction<object[]>) => {
        state.loading = false;
        state.addedRecipients = action.payload;
      },
    );
    builder.addCase(
      actions.getAddedRecipients.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //ADD RECIPIENT
    builder.addCase(
      actions.addRecipient.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.addRecipient.fulfilled.type,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(
      actions.addRecipient.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //DELETE RECIPIENT
    builder.addCase(
      actions.deleteRecipient.pending.type,
      state => {
        state.deleteLoading = true;
      },
    );
    builder.addCase(
      actions.deleteRecipient.fulfilled.type,
      state => {
        state.deleteLoading = false;
        //remove from addedRecipients
      },
    );
    builder.addCase(
      actions.deleteRecipient.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.deleteLoading = false;
        state.error = action.payload;
      },
    );
    //UPDATE RECIPIENT
    builder.addCase(
      actions.updateRecipient.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.updateRecipient.fulfilled.type,
      state => {
        state.loading = false;
        //remove from addedRecipients or refetch recipients
      },
    );
    builder.addCase(
      actions.updateRecipient.rejected.type,
      (state, action: PayloadAction<object>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

// export const { logout } = recipientSlice.actions;

export default recipientSlice.reducer;
