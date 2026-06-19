import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabaseClient.js";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // 🔥 Optimize payload for mobile by selecting only necessary fields
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image, stock, description, usage, safety");

      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        // 🔥 Select even fewer fields for the featured section
        .select("id, name, price, image, description")
        .limit(4); // 🔥 only 4

      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch featured products",
      );
    }
  },
);

const initialState = {
  items: [],
  featured: [],
  loading: false,
  featuredLoading: false,
  error: null,
}; //

const productsSlice = createSlice({
  name: "products",
  initialState,

  // ↓ For YOUR OWN actions (sync)
  reducers: {
    clearProducts(state) {
      // * Uses When user Logout();
      state.items = [];
    },
  },

  // ↓ For ASYNC actions (createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // 🔹 ALL PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 FEATURED PRODUCTS
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.featuredLoading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.featuredLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
