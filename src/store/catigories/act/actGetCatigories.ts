import { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErorrHandler from "../../../util/isAxiosErorrHandler";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>("/categories", { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErorrHandler(error));
    }
  }
);

export default actGetCategories;
