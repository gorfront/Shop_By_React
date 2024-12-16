import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCurrentProduct } from "../../store/slices/currentProduct/currentProductAPI";
import {
  selectCurrentProduct,
  incCount,
  decCount,
} from "../../store/slices/currentProduct/currentProductSlice";
import { selectUsers, addToCart } from "../../store/slices/users/usersSlice";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import "./CurrentProduct.scss";
import Loader from "../Loader/Loader";

const CurrentProduct = () => {
  const current = useAppSelector(selectCurrentProduct);
  const { currentUser } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
  }, [dispatch, id]);

  const handleIncrement = () => {
    dispatch(incCount());
  };

  const handleDecrement = () => {
    dispatch(decCount());
  };

  const handleAddCart = () => {
    if (currentUser) {
      if (current.count > 0) {
        dispatch(addToCart(current));
        navigate("/cart");
      } else {
        alert("Count must be greater than zero to add to the cart.");
      }
    } else {
      navigate("/authorization");
    }
  };

  if (!current.id) {
    return <Loader />;
  }

  // Рассчитываем итоговые цены
  const totalNewPrice = current.newPrice * current.count;
  const totalOldPrice = current.price * current.count;

  return (
    <div className="current">
      <div className="current--img">
        <img src={current.image} alt={current.title} />
      </div>
      <div className="current--about">
        <div className="current--about__head">
          <h2 className="current--about__head--title">{current.title}</h2>
          <p className="current--about__head--des">{current.description}</p>
        </div>
        <div className="current--about__footer">
          <p className="current--about__footer--price">
            <span className="current--about__footer--price--new">
              {totalNewPrice.toFixed(2)} $
            </span>
            <span className="current--about__footer--price--old">
              {totalOldPrice.toFixed(2)} $
            </span>
          </p>
          <div className="current--about__footer--add">
            <button
              className="current--about__footer--add--btn"
              onClick={handleDecrement}
              disabled={current.count === 1}
            >
              -
            </button>
            <span className="current--about__footer--add--count">
              {current.count}
            </span>
            <button
              className="current--about__footer--add--btn"
              onClick={handleIncrement}
            >
              +
            </button>
            <button
              className="current--about__footer--add--btn"
              onClick={handleAddCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentProduct;
