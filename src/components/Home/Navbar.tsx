import { NavLink } from "react-router-dom";
import { NAVBAR } from "../../utils/constants";
import { useState } from "react";
import "./Home.scss";

const Navbar = () => {
  const [navbar, setNavbar] = useState(NAVBAR);

  const handlerChange = (id: string) => {
    setNavbar((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
    });
  };

  return (
    <ul className="home--list">
      {navbar.map((el) => (
        <li
          key={el.id}
          className={`home--list__item ${
            el.active && "home--list__item--active"
          }`}
          onClick={() => handlerChange(el.id)}
        >
          <NavLink to={`${el.title === "home" ? "/" : el.title}`}>
            {el.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default Navbar;
