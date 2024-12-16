import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Search from "../components/Search/Search";
import { useState } from "react";

const homeWrapper = () => {
  const [show, setShow] = useState(false);

  const handlerShow = () => {
    setShow((show) => !show);
  };

  return (
    <>
      <Header handlerShow={handlerShow} />
      <Outlet />
      <Search show={show} handlerShow={handlerShow} />
      <Footer />
    </>
  );
};
export default homeWrapper;
