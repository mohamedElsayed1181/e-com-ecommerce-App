import Lottie from "lottie-react";
import cartEmpty from "../assets/lottieFiles/cartEmpty.json";
import Heading from "../component/shared/Heading/Heading";
import CartItemList from "../component/ecommerce/CartItemList/CartItemList";
import useCart from "../../src/hooks/useCart";

export default function Cart() {
  const { products, changQuantityHandler, removeItemHandler, userAccessToken } =
    useCart();

  return (
    <>
      <Heading>Cart</Heading>
      {products.length ? (
        <CartItemList
          userAccessToken={userAccessToken}
          products={products}
          changQuantityHandler={changQuantityHandler}
          removeItemHandler={removeItemHandler}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
          <Lottie
            animationData={cartEmpty}
            className="w-[300px] h-[250px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[350px]"
          />
        </div>
      )}
    </>
  );
}
