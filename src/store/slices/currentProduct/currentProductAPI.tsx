import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentProduct = createAsyncThunk(
  "currentProduct/fetchCurrentProduct",
  async (productId: number | string | undefined) => {
    const response = await axios(
      `https://fakestoreapi.com/products/${productId}`
    );
    const data = await response.data;

    const discount = data.price > 60 ? 50 : 30;

    return {
      ...data,
      newPrice: data.price - (data.price * discount) / 100,
      count: 1,
    };
  }
);
