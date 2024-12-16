import { Routes, Route } from "react-router-dom";
import HomeWrapper from "./wrapper/homeWrapper";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import CurrentProduct from "./components/CurrentProduct/CurrentProduct";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Error from "./components/Error/Error";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeWrapper />}>
          <Route index element={<Home />} />

          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":id" element={<CurrentProduct />} />
          </Route>

          <Route path="authorization">
            <Route index element={<Login />} />
            <Route path=":registration" element={<Registration />} />
          </Route>
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
export default App;
