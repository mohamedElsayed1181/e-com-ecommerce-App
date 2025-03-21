import { memo } from "react";
import { TProduct } from "../../../types/product";

type CartItemListProps = TProduct & {
  changQuantityHandler: (id: number, quantity: number) => void;
} & { removeItemHandler: (id: number) => void };

const CartItem = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    changQuantityHandler,
    removeItemHandler,
  }: CartItemListProps): JSX.Element => {
    
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changQuantityHandler(id, quantity);
    };
 
    return (
      <div className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        {/* صورة المنتج */}
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="flex-1 ml-3">
          <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>
          <p className="text-xs text-gray-600 mt-1">Price: {price} EGP</p>

          <div className="mt-2">
            <label htmlFor="quantity" className="text-xs text-gray-600 mr-2">
              Quantity:
            </label>
            <select
              id="quantity"
              className="p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue={quantity}
              onChange={changeQuantity}
            >
              {renderOptions}
            </select>
          </div>
        </div>

        <button
          className="ml-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-xs"
          onClick={() => removeItemHandler(id)}
        >
          Delete
        </button>
      </div>
    );
  }
);

export default CartItem;
