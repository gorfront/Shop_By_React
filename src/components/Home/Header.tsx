import Icons from "./Icons";
import Navbar from "./Navbar";
import "./Home.scss";

const Header = ({ handlerShow }: any) => {
  return (
    <header className="home--header">
      <div className="home--header--logo">
        <img src="logo.jpg" alt="logo" />
      </div>
      <Navbar />
      <Icons handlerShow={handlerShow} />
    </header>
  );
};
export default Header;
