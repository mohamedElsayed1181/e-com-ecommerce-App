import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TFormData = {
  firistName: string;
  secondName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.post("/register", formData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data?.massege);
    }
  }
);

export default actAuthRegister;
