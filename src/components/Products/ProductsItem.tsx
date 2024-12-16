import { useNavigate } from "react-router-dom";
import { CurrentProduct } from "../../types/types";
import "./Products.scss";
import RatingReview from "./RatingReview";

const ProductItem = ({
  id,
  image,
  newPrice,
  price,
  title,
  rating,
}: CurrentProduct) => {
  const navigate = useNavigate();

  return (
    <div className="products--item" onClick={() => navigate(`/products/${id}`)}>
      <div className="products--item__img">
        <img src={image} alt={title} />
      </div>
      <p className="products--item__title">{title}</p>
      <div className="products--item__about">
        <p className="products--item__about__price">
          <span className="products--item__about__price--new">
            {newPrice.toFixed(2)}$
          </span>{" "}
          <span className="products--item__about__price--old">
            {price.toFixed(2)}$
          </span>
        </p>
        <RatingReview rating={rating.rate} />
      </div>
    </div>
  );
};
export default ProductItem;
