import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErorrHandler from "../../../util/isAxiosErorrHandler";
import { RootState } from "../../index";
import { TOrederItem } from "@customTypes/order.type";
type TResponse = TOrederItem[];
const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;
    const { auth } = getState() as RootState;
    try {
      const response = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErorrHandler(error));
    }
  }
);
export default actGetOrders;
