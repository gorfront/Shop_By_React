import { useNavigate } from "react-router-dom";
import { CurrentProduct } from "../../types/types";
import RatingReview from "../Products/RatingReview";
import "./Search.scss";

interface SearchItemProps extends CurrentProduct {
  handlerShow: () => void;
}

const SearchItem = ({
  title,
  description,
  newPrice,
  price,
  rating,
  image,
  id,
  handlerShow,
}: SearchItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="search--container">
      <div
        className="search--container__item"
        onClick={() => {
          navigate(`products/${id}`);
          handlerShow();
        }}
      >
        <div className="search--container__item--img">
          <img src={image} alt={title} />
        </div>
        <div className="search--container__item--about">
          <h2 className="search--container__item--about--title">{title}</h2>
          <p className="search--container__item--about--des">{description}</p>
          <div className="search--container__item--about--footer">
            <p className="search--container__item--about--footer--price">
              <span className="search--container__item--about--footer--price--new">
                {newPrice.toFixed(2)} $
              </span>
              <span className="search--container__item--about--footer--price--old">
                {price.toFixed(2)} $
              </span>
            </p>
            <RatingReview rating={rating?.rate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
