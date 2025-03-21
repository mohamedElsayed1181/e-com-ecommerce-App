import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/shared";
import { TOrederItem } from "@customTypes/order.type";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

type OrderState = {
  orderList: TOrederItem[];
  loading: TLoading;
  error: string | null;
};

const initialState: OrderState = {
  orderList: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
      state.orderList = action.payload;
      state.loading = "succeeded";
      state.error = null;
    });
    // getOrders
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.orderList = action.payload;
      state.loading = "succeeded";
      state.error = null;
    });
  },
});

export default orderSlice.reducer;
