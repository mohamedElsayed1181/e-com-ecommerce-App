import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./act/actGetProduct";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";

interface IProductsState {
  products: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export const { cleanUp } = productSlice.actions;
export { actGetProducts };
export default productSlice.reducer;
