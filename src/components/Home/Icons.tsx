import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectUsers } from "../../store/slices/users/usersSlice";
import { useEffect } from "react";
import { fetchUsers } from "../../store/slices/users/usersAPi";
import "./Home.scss";

const Icons = ({ handlerShow, setShowLogOutPopup }: any) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUsers);

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchUsers());
    }
  }, [dispatch, currentUser]);

  const dynamicIcons = currentUser?.id
    ? [
        { id: 0, title: "cart.svg", link: "/cart", isImage: true },
        { id: 1, title: "Log Out", link: "", isImage: false },
      ]
    : [{ id: 2, title: "Log In", link: "/authorization", isImage: false }];

  return (
    <ul className="home--list">
      <li className="home--list__item" onClick={handlerShow}>
        <img src="search.svg" alt="Search" />
      </li>

      {dynamicIcons.map((icon) => (
        <li key={icon.id} className="home--list__item">
          {icon.isImage ? (
            <NavLink to="/cart" className="home--list__item--cart">
              <img src={icon.title} alt={icon.title} />
              <span className="home--list__item--cart--count">
                {currentUser?.cart.length}
              </span>
            </NavLink>
          ) : icon.link ? (
            <NavLink to={icon.link} className="home--list__item">
              {icon.title}
            </NavLink>
          ) : (
            <button
              onClick={() => setShowLogOutPopup((prev: boolean) => !prev)}
              className="home--list__item"
            >
              {icon.title}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Icons;
