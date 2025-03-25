import { memo } from "react";
import Product from "../component/ecommerce/Product/Product";
import Heading from "../component/shared/Heading/Heading";
import useProducts from "../../src/hooks/useProducts";

const Products = memo((): JSX.Element => {
  const productFullInfo = useProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Heading>Discover Our Products</Heading>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-2">
        {productFullInfo.map((product) => (
          <div key={product.id} className="w-full">
            <Product product={product} isLiked={product.isLiked} />
          </div>
        ))}
      </div>

      {productFullInfo.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">
            No products available at the moment
          </p>
        </div>
      )}
    </div>
  );
});

export default Products;
