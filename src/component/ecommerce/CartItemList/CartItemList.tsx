import CartItem from "../CartItem/CartItem";
import { TProduct } from "../../../types/product";
import CartSubtotalPrice from "../CartSubtotalPrice/CartSubtotalPrice";

type CartItemListProps = {
  products: TProduct[];
  changQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
  userAccessToken?: any;
};
export default function CartItemList({
  products,
  changQuantityHandler,
  removeItemHandler,
  userAccessToken,
}: CartItemListProps) {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changQuantityHandler={changQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));
  return (
    <div>
      {renderList}
      <div className="mt-6 mb-2 mx-auto p-6 max-w-md bg-white shadow-xl rounded-xl border border-gray-300 hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Subtotal</h3>
            <p className="text-sm text-gray-500">
              Includes taxes and discounts
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-800 mt-5">
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
