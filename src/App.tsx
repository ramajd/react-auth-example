import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedArea from "./components/ProtectedArea";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import store from "./store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedArea />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
