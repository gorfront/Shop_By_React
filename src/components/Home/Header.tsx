import Icons from "./Icons";
import Navbar from "./Navbar";
import "./Home.scss";

const Header = ({ handlerShow, setShowLogOutPopup }: any) => {
  return (
    <header className="home--header">
      <div className="home--header--logo">
        <img src="logo.jpg" alt="logo" />
      </div>
      <Navbar />
      <Icons
        handlerShow={handlerShow}
        setShowLogOutPopup={setShowLogOutPopup}
      />
    </header>
  );
};
export default Header;
