import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/users/usersSlice";
import { useAppDispatch } from "../../utils/hooks";
import "./LogOutPopup.scss";

export interface LogOutPopup {
  showLogOutPopup: boolean;
  setShowLogOutPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogOutPopup: React.FC<LogOutPopup> = ({
  showLogOutPopup,
  setShowLogOutPopup,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerLogOut = () => {
    dispatch(logoutUser());
    setShowLogOutPopup((prev) => !prev);
    navigate("/authorization");
  };

  const handlerShow = () => {
    setShowLogOutPopup((prev) => !prev);
  };

  return (
    <div
      className="logOutPopup"
      style={{ display: showLogOutPopup ? "flex" : "none" }}
    >
      <h2 className="logOutPopup--title">Are you sure you want to log out?</h2>
      <div className="logOutPopup--buttons">
        <button className="logOutPopup--buttons__btn" onClick={handlerLogOut}>
          Yes
        </button>
        <button className="logOutPopup--buttons__btn" onClick={handlerShow}>
          No
        </button>
      </div>
    </div>
  );
};
export default LogOutPopup;
