import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErorrHandler from "../../../util/isAxiosErorrHandler";
import { RootState } from "../../index";

const actPlaceOrder = createAsyncThunk(
  "orders/actGetPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;
    const orderItems = cart.productFullInfo.map((el) => ({
      productId: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id],
    }));

    try {
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subtotal,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErorrHandler(error));
    }
  }
);
export default actPlaceOrder;
