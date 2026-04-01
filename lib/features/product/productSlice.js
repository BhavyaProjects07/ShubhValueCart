import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      const query = {}

if (params.storeId) query.storeId = params.storeId
if (params.search) query.search = params.search
if (params.category) query.category = params.category
if (params.page) query.page = params.page

// ✅ NEW FILTERS
if (params.minPrice) query.minPrice = params.minPrice
if (params.maxPrice) query.maxPrice = params.maxPrice
if (params.minRating) query.minRating = params.minRating
if (params.minDiscount) query.minDiscount = params.minDiscount

query.limit = 50

      const { data } = await axios.get("/api/products", {
        params: query
      })

      return data // ✅ FIX (NOT data.products)

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
    pagination: {}, // ✅ ADD THIS
  },
  reducers: {
    setProduct: (state, action) => {
      state.list = action.payload
    },
    clearProduct: state => {
      state.list = []
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
  state.list = action.payload.products;
state.pagination = action.payload.pagination;

  state.pagination = action.payload.pagination;
});
  },
})

export const { setProduct, clearProduct } = productSlice.actions
export default productSlice.reducer