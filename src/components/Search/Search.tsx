import SearchItem from "./SearchItem";
import "./Search.scss";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectProducts } from "../../store/slices/products/productsSlice";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../../store/slices/products/productsAPI";

const Search = ({ show, handlerShow }: any) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filteredProduct = useMemo(() => {
    if (!value) return products;
    return products.filter(
      (product: any) =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, products]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="search" style={{ display: show ? "flex" : "none" }}>
      <button className="search--close" onClick={handlerShow}>
        <img src="close.svg" alt="close" />
      </button>
      <form className="search--form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search..."
          className="search--form__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="search--form__btn">
          <img src="search.svg" alt="search" />
        </button>
      </form>

      {filteredProduct.length ? (
        filteredProduct.map((el: any) => (
          <SearchItem
            title={el.title}
            id={el.id}
            image={el.image}
            newPrice={el.newPrice}
            price={el.price}
            rating={{
              rate: el.rating.rate,
              count: el.rating.count,
            }}
            description={el.description}
            key={el.id}
            handlerShow={handlerShow}
          />
        ))
      ) : (
        <p>
          No One Item by <i>{value}</i>
        </p>
      )}
    </div>
  );
};
export default Search;
