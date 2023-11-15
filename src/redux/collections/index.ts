import * as actions from "./actions";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface Collection {
  categories: any | null;
  loading: boolean;
  error: object;
  products: object[];
}

const initialState: Collection = {
  categories: [],
  products: [],
  error: {},
  loading: false,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //GET COLLECTION
    builder.addCase(
      actions.getCategories.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getCategories.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories =
          action.payload?.product_categories;
      },
    );
    builder.addCase(
      actions.getCategories.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //GET PRODUCTS
    builder.addCase(
      actions.getProducts.pending.type,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      actions.getProducts.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action.payload?.products;
      },
    );
    builder.addCase(
      actions.getProducts.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export default collectionSlice.reducer;
