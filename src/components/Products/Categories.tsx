import { useEffect } from "react";
import { activeChange } from "../../store/slices/categories/categoriesSlice";
import { useAppDispatch } from "../../utils/hooks";
import { fetchCategories } from "../../store/slices/categories/categoriesAPI";
import { Category } from "../../types/types";
import "./Products.scss";

const Categories = ({ categories }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handlerCahnge = (id: string) => {
    dispatch(activeChange(id));
  };

  return (
    <nav className="products--nav">
      <ul className="products--categories">
        {categories.map((category: Category) => (
          <li
            onClick={() => handlerCahnge(category.id)}
            className={`products--categories__item ${
              category.active && "products--categories__item--active"
            }`}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Categories;
