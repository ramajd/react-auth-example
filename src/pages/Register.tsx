import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../store";
import { AuthState, resetSuccess } from "../store/slices/authSlice";
import { registerUser } from "../store/actions/authActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, error, user, success } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/login");
    }
    if (user) {
      navigate("/profile");
    }
  }, [loading, success, user, dispatch, navigate,]);

  const submitForm = async (data: any) => {
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <h1>Register new user</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" {...register("name")} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" {...register("email")} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} required />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Register;
