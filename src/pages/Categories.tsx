import Category from "../component/ecommerce/Category/Category";
import useCategories from "../../src/hooks/useCategories";

import Heading from "../component/shared/Heading/Heading";

interface CategoryType {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

function Categories() {
  const normalizedCategories = useCategories();
  return (
    <div>
      <Heading>Categories</Heading>
      <div className="grid grid-cols-4 gap-4 pl-5 pt-3">
        {normalizedCategories.length > 0 ? (
          normalizedCategories.map((category: CategoryType) => (
            <Category key={category.id} category={category} />
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
