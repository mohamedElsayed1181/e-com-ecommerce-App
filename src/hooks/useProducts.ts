import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetProducts, cleanUp } from "../store/products/productSlice";
interface ProductType {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max?: number;
}

export default function useProducts() {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productFullInfo = products.map((product: ProductType) => {
    const quantityInCart = cartItems[product.id] || 0;
    const remainingQuantity = (product.max ?? Infinity) - quantityInCart;

    return {
      ...product,
      quantity: quantityInCart,
      remainingQuantity: Math.max(remainingQuantity, 0),

      isLiked: wishlistItemsId.includes(product.id),
    };
  });

  useEffect(() => {
    if (prefix) {
      const promise = dispatch(actGetProducts(prefix));
      return () => {
        promise.abort();
      };
    }
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, prefix]);
  return productFullInfo;
}
