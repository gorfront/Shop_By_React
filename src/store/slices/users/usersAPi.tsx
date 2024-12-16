import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://fakestoreapi.com/users");
  const initialData = await response.data;
  const data = initialData.map((user: any) => {
    return {
      id: user.id,
      email: user.email,
      name: {
        firstname: user.name.firstname,
        lastname: user.name.lastname,
      },
      city: user.address.city,
      zipcode: user.address.zipcode,
      userName: user.username,
      password: user.password,
      phone: user.phone,
      cart: [],
    };
  });

  return data;
});
