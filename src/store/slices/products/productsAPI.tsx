import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductItem } from "../../../types/types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data = await response.data.map((el: ProductItem) => {
      if (el.price > 60) {
        el.discount = 50;
        el.newPrice = el.price / 2;
      } else {
        el.discount = 30;
        el.newPrice = el.price - (el.price * el.discount) / 100;
      }
      return el;
    });

    return data;
  }
);
