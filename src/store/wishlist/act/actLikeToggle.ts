import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const isRecordExists = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      );
      if (isRecordExists.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExists.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post(`/wishlist`, { userId: 1, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
export default actLikeToggle;

//ملاحطه مهمه جدا
// تُستخدم التايب للتمييز بين حالتين مختلفتين عند تحديث الحالة (state) في Redux.
