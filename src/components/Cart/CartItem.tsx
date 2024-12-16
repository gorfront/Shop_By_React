import { useAppDispatch } from "../../utils/hooks";
import {
  decrementCount,
  incrementCount,
  deleteItem,
} from "../../store/slices/users/usersSlice";
import "./Cart.scss";

const CartItem = ({ items }: any) => {
  const dispatch = useAppDispatch();

  const handleDecrement = (item: any) => {
    dispatch(decrementCount(item));
  };

  const handleIncrement = (item: any) => {
    dispatch(incrementCount(item));
  };

  const handleDeleteItem = (item: any) => {
    dispatch(deleteItem(item));
  };

  return (
    <>
      {items?.map((item: any) => (
        <div key={item.id} className="cart--item">
          <div className="cart--item__img">
            <img src={item.image} alt={item.title} />
          </div>
          <h3 className="cart--item__title">{item.title}</h3>
          <div className="cart--item__about">
            <p className="cart--item__about--price">
              {item?.newPrice?.toFixed(2)} $
            </p>
            <div className="current--about__footer--add">
              <button
                className="current--about__footer--add--btn"
                onClick={() => handleDecrement(item)}
                disabled={item?.count === 1}
              >
                -
              </button>
              <span className="current--about__footer--add--count">
                {item?.count}
              </span>
              <button
                className="current--about__footer--add--btn"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
              <button
                className="current--about__footer--add--btn"
                onClick={() => handleDeleteItem(item)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
