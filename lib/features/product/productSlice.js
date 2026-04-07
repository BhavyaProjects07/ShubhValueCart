import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------- FETCH PRODUCTS ----------------
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      const query = {};

      if (params.storeId) query.storeId = params.storeId;
      if (params.search) query.search = params.search;
      if (params.category) query.category = params.category;
      if (params.page) query.page = params.page;

      // ✅ FILTERS
      if (params.minPrice) query.minPrice = params.minPrice;
      if (params.maxPrice) query.maxPrice = params.maxPrice;
      if (params.minRating) query.minRating = params.minRating;
      if (params.minDiscount) query.minDiscount = params.minDiscount;

      query.limit = 50;

      const { data } = await axios.get("/api/products", {
        params: query,
      });

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// ---------------- SLICE ----------------
const productSlice = createSlice({
  name: "product",

  initialState: {
    list: [],
    pagination: {},
    loading: false,
    error: null,
  },

  reducers: {
    // 🔥 SET PRODUCTS (REPLACE)
    setProduct: (state, action) => {
      state.list = action.payload || [];
    },

    // 🔥 MERGE PRODUCTS (IMPORTANT FOR DEALS)
    addProducts: (state, action) => {
      const newProducts = action.payload || [];

      const existingIds = new Set(
        state.list.map((p) => String(p.id || p._id))
      );

      const normalizedNew = newProducts.map((p) => ({
        ...p,
        id: p.id || p._id, // ✅ normalize globally
      }));

      const merged = [
        ...state.list,
        ...normalizedNew.filter(
          (p) => !existingIds.has(String(p.id))
        ),
      ];

      state.list = merged;
    },

    // 🔥 CLEAR
    clearProduct: (state) => {
      state.list = [];
      state.pagination = {};
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 FETCH START
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🔄 FETCH SUCCESS
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload?.products || [];

        // ✅ normalize here too (VERY IMPORTANT)
        const normalized = products.map((p) => ({
          ...p,
          id: p.id || p._id,
        }));

        state.list = normalized;
        state.pagination = action.payload?.pagination || {};
        state.loading = false;
      })

      // 🔄 FETCH ERROR
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ---------------- EXPORTS ----------------
export const {
  setProduct,
  clearProduct,
  addProducts, // 🔥 IMPORTANT EXPORT
} = productSlice.actions;

export default productSlice.reducer;