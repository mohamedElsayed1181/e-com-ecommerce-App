import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";
import isAxiosErorrHandler from "../../../util/isAxiosErorrHandler";

type TResponse = TProduct[];
const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErorrHandler(error));
    }
  }
);

export default actGetProducts;
