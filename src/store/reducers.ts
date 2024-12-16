import { combineReducers } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products/productsSlice";
import { categoriesReducer } from "./slices/categories/categoriesSlice";
import { currentProductReducer } from "./slices/currentProduct/currentProductSlice";
import { usersReducer } from "./slices/users/usersSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  currentProduct: currentProductReducer,
  users: usersReducer,
});

export default rootReducer;
