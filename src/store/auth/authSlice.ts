import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../../src/types/shared";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthStat {
  loading: TLoading;
  error: string | null;
  accessToken: string | null;
  user: {
    id: number;
    firistName: string;
    secondName: string;
    email: string;
  } | null;
}

const initialState: IAuthStat = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUi: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //register

    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    //LOGIN

    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export { actAuthRegister, actAuthLogin };
export const { resetUi, authLogOut } = authslice.actions;
export default authslice.reducer;
