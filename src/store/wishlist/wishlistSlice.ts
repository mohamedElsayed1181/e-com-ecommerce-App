import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TProduct } from "@customTypes/product";

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    //getwishlist
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.productsFullInfo = action.payload;
      state.itemsId = action.payload.map((product) => product.id);
    });
  },
});
export const { cleanWishlistProductsFullInfo } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;
