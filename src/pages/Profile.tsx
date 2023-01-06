import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthState } from "../store/slices/authSlice";

const Profile = () => {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);

  return (
    <div>
      <h1>User Profile</h1>
      <div>Welcome {user?.name}</div>
    </div>
  );
};

export default Profile;
