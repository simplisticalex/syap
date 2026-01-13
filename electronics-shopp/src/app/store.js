import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import filtersReducer from "../features/filters/filtersSlice";
import { cartMiddleware } from "./cartMiddleware";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    filters: filtersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cartMiddleware)
});