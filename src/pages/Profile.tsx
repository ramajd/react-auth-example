import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { AuthState, logoutUser } from "../store/slices/authSlice";

const Profile = () => {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>User Profile</h1>
      <div>Welcome {user?.name}</div>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

export default Profile;
