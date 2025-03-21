import { createSlice } from "@reduxjs/toolkit";
import actGetCatigories from "./actGetCatigories";
import { TLoading } from "@customTypes/shared";
import { TCategory } from "@customTypes/category";
interface ICatigoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICatigoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const catigoriesSlice = createSlice({
  name: "catigories",
  initialState,
  reducers: {
    cleanCategoryRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCatigories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCatigories.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(actGetCatigories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export const { cleanCategoryRecords } = catigoriesSlice.actions;
export { actGetCatigories };
export default catigoriesSlice.reducer;
