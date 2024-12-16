import { NavLink } from "react-router-dom";
import { FOOTER_LIST, SOCIAL } from "../../utils/constants";
import "./Home.scss";

const Footer = () => {
  return (
    <footer className="home--footer">
      <div className="home--footer__icons">
        <ul className="home--footer__list">
          {FOOTER_LIST.map((el) => (
            <li key={el.id} className="home--footer__list--item">
              {el.title}
            </li>
          ))}
        </ul>
        <ul className="home--footer__list">
          {SOCIAL.map((el) => (
            <li key={el.id} className="home--footer__list--item icon">
              <NavLink to={"/" + el.title}>
                <img src={el.icon} alt={el.title} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <p className="home--footer__text">
        &#169;&#174; 2022 Your Company. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
