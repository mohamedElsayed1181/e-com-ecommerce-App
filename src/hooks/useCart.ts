import actGetProductsByItems from "../store/cart/act/actGetProductsByItems";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "../store/cart/cartSlice";

export default function useCart() {
  const dispatch = useAppDispatch();
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const { items, productFullInfo } = useAppSelector((state) => state.cart);

  const products = productFullInfo.map((el) => {
    return { ...el, quantity: items[el.id] || 0 };
  });
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);

  const changQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  return {
    products,
    userAccessToken,
    changQuantityHandler,
    removeItemHandler,
  };
}
