import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { loginUser } from "../store/actions/authActions";
import { AuthState } from "../store/slices/authSlice";

const Login = () => {
  const { loading, error, user } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  const submitForm = async (data: any) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <h1>Login Form</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" {...register("email")} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} required />
      </div>
      <div>
        <button type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
