import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";

import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import filtersReducer from "./features/filters/filtersSlice";

test("renders app header", () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
      categories: categoriesReducer,
      filters: filtersReducer,
    },
    preloadedState: {
      cart: { items: [] },
      products: { list: [], status: "idle", error: null },
      categories: { list: [], status: "idle", error: null },
      filters: { search: "", minPrice: "", maxPrice: "", sort: "default" },
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByRole("link", { name: /electronics shop/i })).toBeInTheDocument();
});
