import { useEffect } from "react";
import { deleteAll, selectUsers } from "../../store/slices/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchUsers } from "../../store/slices/users/usersAPi";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import Error from "../Error/Error";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUsers);

  const items = currentUser?.cart;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [currentUser]);

  const handlerDeleteAll = () => {
    dispatch(deleteAll());
  };

  if (!currentUser?.id) return <Error />;

  return (
    <div className="cart">
      {items?.length ? (
        <>
          <button className="cart--remove" onClick={handlerDeleteAll}>
            Remove All
          </button>
          <CartItem items={items} />{" "}
        </>
      ) : (
        <p className="cart--empty">
          Cart is Empty <NavLink to="/products">Back to the shop</NavLink>
        </p>
      )}
    </div>
  );
};
export default Cart;
