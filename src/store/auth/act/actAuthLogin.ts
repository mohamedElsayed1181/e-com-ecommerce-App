import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type TFormData = {
  email: string;
  password: string;
};
type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firistName: string;
    secondName: string;
    email: string;
  };
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.post<TResponse>("/login", formData);
      console.log(res);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data?.massege);
    }
  }
);

export default actAuthLogin;
