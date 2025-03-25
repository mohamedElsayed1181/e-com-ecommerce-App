import { Link } from "react-router-dom";
import { TCategory } from "@customTypes/category";

interface CategoryProps {
  category: TCategory;
}

export default function Category({ category }: CategoryProps) {
  return (
    <Link
      to={`/categories/products/${category.prefix}`}
      className="block transition-all duration-300 hover:transform hover:scale-105"
    >
      <div className="flex flex-col items-center p-4 sm:p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white hover:border-teal-300 transition-all duration-300 h-full">
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 overflow-hidden rounded-full ring-2 ring-gray-100 hover:ring-teal-200 transition-all duration-300 mb-3">
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <h4 className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium sm:font-semibold text-gray-800 text-center">
          {category.title}
        </h4>
      </div>
    </Link>
  );
}
