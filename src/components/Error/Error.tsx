import { NavLink } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  return (
    <div>
      <h1>404 Error Page</h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <NavLink to="/" className="more-link">
          Go To Home Page
        </NavLink>
      </div>
    </div>
  );
};
export default Error;
