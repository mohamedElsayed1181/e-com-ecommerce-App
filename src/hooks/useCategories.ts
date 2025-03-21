import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";

import { cleanCategoryRecords } from "../../src/store/catigories/act/catigoriesSlice";
import actGetCategories from "../../src/store/catigories/act/actGetCatigories";

export default function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.records); // استدعاء البيانات من Redux
  console.log(categories);

  const normalizedCategories = categories.map((category: any) => ({
    ...category,
  }));
  useEffect(() => {
    if (categories.length === 0) {
      const promise = dispatch(actGetCategories());
      return () => {
        promise.abort();
      };
    }

    return () => {
      dispatch(cleanCategoryRecords());
    };
  }, [dispatch]);

  return normalizedCategories;
}
