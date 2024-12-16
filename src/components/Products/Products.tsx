import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectProducts } from "../../store/slices/products/productsSlice";
import { fetchProducts } from "../../store/slices/products/productsAPI";
import ProductsItem from "./ProductsItem";
import { ProductItem } from "../../types/types";
import "./Products.scss";
import Categories from "./Categories";
import { selectCategories } from "../../store/slices/categories/categoriesSlice";
import Loader from "../Loader/Loader";
import { fetchCategories } from "../../store/slices/categories/categoriesAPI";

const Products = () => {
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const filteredProducts = useMemo(() => {
    const currentCategory = categories.filter(
      (category: any) => category.active
    );

    return products.filter(
      (product: any) =>
        product.category.toLowerCase() ===
        currentCategory[0]?.name.toLowerCase()
    );
  }, [categories, products]);

  if (!products.length || !categories.length) return <Loader />;

  return (
    <>
      <Categories categories={categories} />
      <main className="products">
        {filteredProducts.length
          ? filteredProducts.map((product: ProductItem) => (
              <ProductsItem
                key={product.id}
                id={product.id}
                image={product.image}
                newPrice={product.newPrice}
                price={product.price}
                title={product.title}
                rating={product.rating}
                description={product.description}
              />
            ))
          : products.map((product: ProductItem) => (
              <ProductsItem
                key={product.id}
                id={product.id}
                image={product.image}
                newPrice={product.newPrice}
                price={product.price}
                title={product.title}
                rating={product.rating}
                description={product.description}
              />
            ))}
      </main>
    </>
  );
};
export default Products;
