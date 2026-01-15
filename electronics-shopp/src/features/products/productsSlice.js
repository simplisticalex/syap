import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categoryId, search } = {}, { rejectWithValue }) => {
    try {
      const url = new URL(API_URL);

      if (categoryId) url.searchParams.set("categoryId", String(categoryId));
      if (search) url.searchParams.set("search", String(search));

      const res = await fetch(url.toString());
      if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle", 
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load products";
      });
  }
});

export default productsSlice.reducer; 
