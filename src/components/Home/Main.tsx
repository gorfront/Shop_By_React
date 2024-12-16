import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Main = () => {
  const navigate = useNavigate();
  return (
    <main className="home--main">
      <h1 className="home--main__title">Welcome To Our Shop Page</h1>
      <section className="home--main__body">
        <div className="home--main__body--text">
          <p>
            Big discounts are waiting for you. Hurry up to get 50% discount
            before the end of the season!
          </p>
        </div>
        <div className="home--main__body--img">
          <img src="sale.jpg" alt="sale" />
        </div>
        <button
          className="home--main__body--btn"
          onClick={() => navigate("/products")}
        >
          See All <span className="home--main__body--btn--symbol">&#8594;</span>
        </button>
      </section>
    </main>
  );
};
export default Main;
