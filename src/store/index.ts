import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import categories from "../../src/store/catigories/act/catigoriesSlice";
import products from "../../src/store/products/productSlice";
import cart from "../../src/store/cart/cartSlice";
import "../API/axios-global";
import wishlist from "../../src/store/wishlist/wishlistSlice";
import auth from "../store/auth/authSlice";
import orders from "../store/orders/ordersSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["accessToken", "user"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whiteList: ["itemsIdو"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  orders,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: persistReducer(wishlistPersistConfig, wishlist),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const perisistor = persistStore(store);
export default { store, perisistor };
