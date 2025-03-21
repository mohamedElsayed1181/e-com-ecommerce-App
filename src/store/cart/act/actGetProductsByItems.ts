import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/product";
import { RootState } from "src/store";
import isAxiosErorrHandler from "../../../util/isAxiosErorrHandler";
type TResponse = TProduct;
const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkApi;
    const { cart } = getState() as RootState;

    const itemId = Object.keys(cart.items);
    if (!itemId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemId.map((el) => `id=${el}`).join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErorrHandler(error));
    }
  }
);
export default actGetProductsByItems;
