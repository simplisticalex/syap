import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    minPrice: "",
    maxPrice: "",
    sort: "price_asc" 
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.minPrice = "";
      state.maxPrice = "";
      state.sort = "price_asc";
    }
  }
});

export const { setSearch, setMinPrice, setMaxPrice, setSort, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
