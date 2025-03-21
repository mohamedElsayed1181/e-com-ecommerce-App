import Lottie from "lottie-react";
import wishListt from "../assets/lottieFiles/wishList.json";
import Heading from "../component/shared/Heading/Heading";
import Product from "../component/ecommerce/Product/Product";
import useWishlist from "../../src/hooks/useWishlist";

export default function Wishlist() {
  const productFullInfo = useWishlist();

  return (
    <>
      <Heading>Wishlist</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5 min-h-[70vh]">
        {productFullInfo.length > 0 ? (
          productFullInfo.map((product) => (
            <Product
              key={product.id}
              product={product}
              isLiked={product.isLiked}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center w-full">
            <Lottie
              animationData={wishListt}
              className="w-[300px] h-[250px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[350px]"
            />
          </div>
        )}
      </div>
    </>
  );
}
