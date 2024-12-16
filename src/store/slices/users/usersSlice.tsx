import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPi";
import { User } from "../../../types/types";

interface UsersState {
  currentUser: User | null;
  usersData: User[];
}

const initialState: UsersState = {
  currentUser: null,
  usersData: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      const existUser = state.usersData.find(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );
      if (existUser) {
        state.currentUser = existUser;
      }
    },

    addUser: (state, { payload }) => {
      return {
        ...state,
        usersData: [...state.usersData, payload],
      };
    },

    logoutUser: (state) => {
      state.currentUser = null;
    },

    addToCart: (state, { payload }) => {
      if (!state.currentUser || !payload) return;

      const userIndex = state.usersData.findIndex(
        (user) => user.id === state.currentUser?.id
      );

      if (userIndex === -1) return;

      const cart = state.currentUser.cart || [];
      const itemIndex = cart.findIndex((item) => item.id === payload.id);

      if (itemIndex === -1) {
        const newItem = {
          ...payload,
          price: payload.price * payload.count,
          newPrice: payload.newPrice * payload.count,
        };

        state.currentUser.cart = [...cart, newItem];
        state.usersData[userIndex] = {
          ...state.usersData[userIndex],
          cart: [...cart, newItem],
        };
      } else {
        const updatedCart = cart.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                count: item.count + payload.count,
                price: (item.count + payload.count) * payload.price,
                newPrice: (item.count + payload.count) * payload.newPrice,
              }
            : item
        );

        state.currentUser.cart = updatedCart;
        state.usersData[userIndex] = {
          ...state.usersData[userIndex],
          cart: updatedCart,
        };
      }
    },

    incrementCount: (state, { payload }) => {
      if (!state.currentUser) return;

      const userIndex = state.usersData.findIndex(
        (user) => user.id === state.currentUser?.id
      );

      if (userIndex === -1) return;

      const productIndex = state.currentUser.cart.findIndex(
        (item) => item.id === payload.id
      );

      const initialNewPrice =
        state.currentUser.cart[productIndex].newPrice /
        state.currentUser.cart[productIndex].count;
      const initialPrice =
        state.currentUser.cart[productIndex].price /
        state.currentUser.cart[productIndex].count;

      if (productIndex !== -1) {
        const product = state.currentUser.cart[productIndex];
        product.count += 1;
        product.price = product.count * initialPrice;
        product.newPrice = product.count * initialNewPrice;

        state.usersData[userIndex].cart[productIndex] = { ...product };
      }
    },

    decrementCount: (state, { payload }) => {
      if (!state.currentUser) return;

      const userIndex = state.usersData.findIndex(
        (user) => user.id === state.currentUser?.id
      );

      if (userIndex === -1) return;

      const productIndex = state.currentUser.cart.findIndex(
        (item) => item.id === payload.id
      );

      const initialNewPrice =
        state.currentUser.cart[productIndex].newPrice /
        state.currentUser.cart[productIndex].count;
      const initialPrice =
        state.currentUser.cart[productIndex].price /
        state.currentUser.cart[productIndex].count;

      if (productIndex !== -1) {
        const product = state.currentUser.cart[productIndex];

        if (product.count > 1) {
          product.count -= 1;
          product.price = product.count * initialPrice;
          product.newPrice = product.count * initialNewPrice;

          state.usersData[userIndex].cart[productIndex] = { ...product };
        } else {
          state.currentUser.cart = state.currentUser.cart.filter(
            (item) => item.id !== payload.id
          );
          state.usersData[userIndex].cart = state.usersData[
            userIndex
          ].cart.filter((item) => item.id !== payload.id);
        }
      }
    },

    deleteItem: (state, { payload }) => {
      if (!state.currentUser) return;

      const idxUser = state.usersData.findIndex(
        (item) => item.id === state.currentUser?.id
      );

      if (idxUser === -1) return;

      state.currentUser.cart = state.currentUser.cart.filter(
        (el) => el.id !== payload.id
      );
      state.usersData[idxUser].cart = state.usersData[idxUser].cart.filter(
        (el) => el.id !== payload.id
      );
    },

    deleteAll: (state) => {
      if (!state.currentUser) return;

      const idxUser = state.usersData.findIndex(
        (item) => item.id === state.currentUser?.id
      );

      if (idxUser === -1) return;

      state.currentUser.cart = [];
      state.usersData[idxUser].cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.usersData = payload || [];
    });
  },
});

export const {
  setCurrentUser,
  addUser,
  logoutUser,
  addToCart,
  incrementCount,
  decrementCount,
  deleteItem,
  deleteAll,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUsers = (state: { users: UsersState }) => state.users;
