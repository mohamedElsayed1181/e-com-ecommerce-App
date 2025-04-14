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
    if (!isBtnClicked) return;
    setIsBtnDisabled(true);
    const timer = setTimeout(() => setIsBtnDisabled(false), 300);
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
    setTimeout(() => setIsBtnDisabled(false), 500);
  };

  const remainingQuantity = (product.max ?? 0) - (product.quantity ?? 0);

  return (
    <div className="flex flex-col border rounded-2xl shadow-md p-3 sm:p-4 w-full max-w-xs mx-auto h-full hover:shadow-lg transition-all duration-300">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          disabled={isBtnDisabled}
          onClick={likeToggleHandler}
          className={`absolute top-2 right-2 p-1 bg-white/80 rounded-full shadow-sm backdrop-blur-sm
            ${
              isBtnDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100"
            }`}
        >
          {isLiked ? (
            <LikeFill className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          ) : (
            <Like className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          )}
        </button>
      </div>

      <div className="mt-3 flex-grow">
        <h2 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm sm:text-base font-semibold text-gray-700">
            ${product.price}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            Max: {product.max}
          </span>
        </div>

        <p
          className={`mt-1 text-xs sm:text-sm ${
            remainingQuantity === 0 ? "text-red-500" : "text-gray-600"
          }`}
        >
          {remainingQuantity === 0
            ? "Out of stock"
            : `Available: ${remainingQuantity}`}
        </p>
      </div>

      <button
        onClick={addToCartHandler}
        disabled={isBtnDisabled || remainingQuantity === 0}
        className={`mt-3 sm:mt-4 px-3 py-2 text-sm sm:text-base rounded-lg transition-colors w-full
          ${
            remainingQuantity === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
      >
        {isBtnDisabled ? (
          <span className="flex justify-center">
            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-2 border-t-white border-blue-400 rounded-full animate-spin"></span>
          </span>
        ) : remainingQuantity === 0 ? (
          "Out Of Stock"
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
}
