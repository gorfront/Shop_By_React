import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";
import { ProductItem } from "../../../types/types";

const prodctsSlice = createSlice({
  name: "products",
  initialState: [] as ProductItem[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (_state, { payload }) => {
      return payload;
    });
  },
});

export const productsReducer = prodctsSlice.reducer;

export const selectProducts = (state: any) => state.products;
