import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Search from "../components/Search/Search";
import { useState } from "react";
import LogOutPopup from "../components/LogOutPopup/LogOutPopup";

const homeWrapper = () => {
  const [show, setShow] = useState(false);
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);

  const handlerShow = () => {
    setShow((show) => !show);
  };

  return (
    <>
      <Header
        handlerShow={handlerShow}
        setShowLogOutPopup={setShowLogOutPopup}
      />
      <Outlet />
      <Search show={show} handlerShow={handlerShow} />
      <LogOutPopup
        showLogOutPopup={showLogOutPopup}
        setShowLogOutPopup={setShowLogOutPopup}
      />
      <Footer />
    </>
  );
};
export default homeWrapper;
