import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ display: "flex", gap: 10, borderBottom: '1px solid', padding: 10 }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};

export default Header;
