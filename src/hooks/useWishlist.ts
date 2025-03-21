import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { useEffect } from "react";
import {
  actGetWishlist,
  cleanWishlistProductsFullInfo,
} from "../../src/store/wishlist/wishlistSlice";
interface ProductType {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max?: number;
}

export default function useWishlist() {
  const productWishlist = useAppSelector(
    (state) => state.wishlist.productsFullInfo
  );
  console.log(productWishlist);

  const dispatch = useAppDispatch();

  const productFullInfo = (productWishlist ?? []).map(
    (product: ProductType) => {
      return {
        ...product,

        isLiked: true,
      };
    }
  );
  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      promise.abort();
      dispatch(cleanWishlistProductsFullInfo());
    };
  }, [dispatch]);
  return productFullInfo;
}
