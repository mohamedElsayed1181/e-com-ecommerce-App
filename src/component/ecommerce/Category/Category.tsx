import { Link } from "react-router-dom";
import { TCategory } from "@customTypes/category";

interface CategoryProps {
  category: TCategory;
}
export default function Category({ category }: CategoryProps) {
  return (
    <Link to={`/categories/products/${category.prefix}`}>
      <div className="flex flex-col items-center p-4 border rounded-lg shadow-md ">
        <div className="w-32 h-32 overflow-hidden rounded-full">
          <img
            src={category.img}
            alt="Category"
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="mt-2 text-lg font-semibold">{category.title}</h4>
      </div>
    </Link>
  );
}
