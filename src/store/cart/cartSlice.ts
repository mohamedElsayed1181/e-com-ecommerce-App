import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TProduct } from "@customTypes/product";
interface ICartState {
  //اندكس سنجنتشر بعمله علشان اعرف اوبجكت بيحتوى على عدد غير معروف من الخصائص
  items: { [key: number]: number };
  productFullInfo: TProduct[];
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },

    cleanCartProductsFullInfo: (state) => {
      state.productFullInfo = [];
    },
    clearCartAfterSubTotal: (state) => {
      state.items = {};
      state.productFullInfo = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.productFullInfo = Array.isArray(action.payload)
        ? action.payload
        : [];
    });
  },
});
export { actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
  clearCartAfterSubTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
