import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesAPI";
import { Category } from "../../../types/types";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [] as Category[],
  reducers: {
    activeChange: (state, { payload }) => {
      return state.map((el) =>
        el.id === payload
          ? { ...el, active: !el.active }
          : { ...el, active: false }
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (_state, { payload }) => {
      return payload;
    });
  },
});

export const { activeChange } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: any) => state.categories;
