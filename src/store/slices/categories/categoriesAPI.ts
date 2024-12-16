import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../../../types/types";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    let id = new Date().getTime();
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.data;

    return data.map((category: Category) => {
      return {
        active: false,
        name: category,
        id: ++id,
      };
    });
  }
);
