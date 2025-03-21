import { memo } from "react";
import Product from "../component/ecommerce/Product/Product";

import Heading from "../component/shared/Heading/Heading";
import useProducts from "../../src/hooks/useProducts";

const Products = memo((): JSX.Element => {
  const productFullInfo = useProducts();
  return (
    <div>
      <Heading>Products</Heading>
      <div className="grid grid-cols-4 gap-3 pl-5 pt-3">
        {productFullInfo.length > 0 ? (
          productFullInfo.map((product) => (
            <Product
              key={product.id}
              product={product}
              isLiked={product.isLiked}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
});

export default Products;
