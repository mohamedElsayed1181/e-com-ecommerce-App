import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/cart/cartSlice";
import { useEffect, useState } from "react";
import Like from "../../../assets/svg/like.svg?react";
import LikeFill from "../../../assets/svg/like-fill.svg?react";
import { actLikeToggle } from "../../../store/wishlist/wishlistSlice";
import { TProduct } from "@customTypes/product";

interface ProductProps {
  product: TProduct;
}

export default function Product({
  product,
  isLiked,
}: ProductProps & { isLiked: boolean }) {
  const dispatch = useAppDispatch();
  const [isBtnClicked, setIsBtnClicked] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  useEffect(() => {
    if (!isBtnClicked) {
      return;
    }
    setIsBtnDisabled(true);
    const timer = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isBtnClicked]);

  const addToCartHandler = () => {
    if (remainingQuantity > 0) {
      dispatch(addToCart(product.id));
      setIsBtnClicked((prev) => prev + 1);
    }
  };

  const likeToggleHandler = () => {
    if (isBtnDisabled) return;

    setIsBtnDisabled(true);
    dispatch(actLikeToggle(product.id));

    setTimeout(() => {
      setIsBtnDisabled(false);
    }, 500);
  };
  const remainingQuantity = (product.max ?? 0) - (product.quantity ?? 0);

  return (
    <div className="flex flex-col items-center border rounded-2xl shadow-md py-3 px-4 w-[198px] h-[227px] relative hover:shadow-lg transition-shadow duration-300">
      <div className="w-40 h-40 overflow-hidden rounded-lg relative">
        <img
          src={product.img}
          alt="Product Image"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button
          disabled={isBtnDisabled}
          onClick={likeToggleHandler}
          className={`absolute top-2 right-2 p-1 bg-white rounded-full shadow-md 
            ${
              isBtnDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 transition-colors"
            }`}
        >
          {isLiked ? (
            <LikeFill className="w-6 h-6 text-red-500 hover:text-red-600" />
          ) : (
            <Like className="w-6 h-6 text-gray-600 hover:text-gray-700" />
          )}
        </button>
      </div>

      <h2 className="mt-2 text-lg font-bold text-center text-gray-800">
        {product.title}
      </h2>

      <div className="flex justify-around w-full">
        <h3 className="mt-1 text-lg font-semibold text-gray-700">
          ${product.price}
        </h3>
        <h2 className="mt-1 text-lg font-semibold text-gray-700">
          Max: {product.max}
        </h2>
      </div>

      <p
        className={`mt-1 text-sm ${
          remainingQuantity === 0 ? "text-red-500" : "text-gray-600"
        }`}
      >
        {remainingQuantity === 0
          ? "Out of stock"
          : `Remaining: ${remainingQuantity}`}
      </p>

      <button
        onClick={addToCartHandler}
        disabled={isBtnDisabled || remainingQuantity === 0}
        className={`mt-4 px-4 py-2 rounded-lg transition-colors flex items-center justify-center w-full
          ${
            remainingQuantity === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }
        `}
      >
        {isBtnDisabled ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-2 border-t-white border-blue-400 rounded-full animate-spin"></div>
          </span>
        ) : (
          <span>
            {remainingQuantity === 0 ? "Out of stock" : "Add to cart"}
          </span>
        )}
      </button>
    </div>
  );
}
