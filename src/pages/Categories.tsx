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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Heading >
        Our Categories
      </Heading>

      {normalizedCategories.length === 0 && (
        <div className="flex justify-center items-center h-40 ">
          <p className="text-lg text-gray-500 animate-pulse">
            Loading categories...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
        {normalizedCategories.map((category: CategoryType) => (
          <Category key={category.id} category={category} />
        ))}
      </div>

      {normalizedCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No categories available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}

export default Categories;