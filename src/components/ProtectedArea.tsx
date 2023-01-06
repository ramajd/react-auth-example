import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { AuthState } from "../store/slices/authSlice";

const ProtectedArea = () => {
  const {user} = useSelector<RootState, AuthState>((state) => state.auth);
  if (!user) {
    return <div>
      <h1>un-authorized</h1>
      <NavLink to="/login">Login</NavLink>
    </div>;
  }
  return <Outlet />;
};

export default ProtectedArea;
