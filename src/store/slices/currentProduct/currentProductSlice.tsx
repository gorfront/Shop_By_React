import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentProduct } from "./currentProductAPI";
import { CartItem } from "../../../types/types";

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState: {} as CartItem,
  reducers: {
    incCount: (state) => {
      state.count++;
    },
    decCount: (state) => {
      state.count = state.count > 1 ? state.count - 1 : state.count;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentProduct.fulfilled, (_state, { payload }) => {
      return payload;
    });
  },
});

export const { incCount, decCount } = currentProductSlice.actions;

export const currentProductReducer = currentProductSlice.reducer;

export const selectCurrentProduct = (state: any) => state.currentProduct;
