import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/categories";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load categories";
      });
  }
});

export default categoriesSlice.reducer;
