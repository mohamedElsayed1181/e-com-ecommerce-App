import React, { useState } from "react";
import { TProduct } from "../../../types/product";
import { useAppDispatch } from "../../../store/hooks";
import actPlaceOrder from "../../../store/orders/act/actPlaceOrder";
import { clearCartAfterSubTotal } from "../../../store/cart/cartSlice";

type CartItemListProps = { products: TProduct[]; userAccessToken?: string };

const CartSubtotalPrice: React.FC<CartItemListProps> = ({
  products,
  userAccessToken,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  //accumulator=0
  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterSubTotal());
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="text-sm text-gray-700 mt-2">
          Subtotal: <span className="font-semibold ">{subtotal} EGP</span>
        </div>

        {userAccessToken && (
          <div className="mt-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-xs ml-1">
            <button
              onClick={placeOrderHandler}
              className="font-semibold flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4l-3 3-3-3h4z"
                  ></path>
                </svg>
              ) : (
                "Place Order"
              )}
            </button>
            {!loading && error && <p>{error}</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSubtotalPrice;
