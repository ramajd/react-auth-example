import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import UserAPI from "../services/UserAPI";
import { AppDispatch, RootState } from "../store";
import { AuthState, logoutUser, setUser } from "../store/slices/authSlice";

const Header = () => {
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const api = new UserAPI();
      api.restoreUser(token).then((user) => dispatch(setUser(user)));
    }
  }, [token, dispatch]);

  const doLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        borderBottom: "1px solid",
        padding: 10,
      }}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {token && <button onClick={() => doLogout()}>Logout</button>}
    </div>
  );
};

export default Header;
