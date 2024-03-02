import LoginHeader from "../components/LoginPage/LoginHeader";
import { useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/features/userAuth/userAuthSlice";
import {
  getTokenStart,
  getTokenSuccess,
  getTokenError,
} from "../redux/features/userTokens/userTokenSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    dispatch(getTokenStart());

    try {
      const response = await api.post("/token/", {
        username: username,
        password: password,
      });
      console.log(response.data);
      dispatch(loginSuccess(jwtDecode(response.data.access)));
      dispatch(getTokenSuccess(response.data));
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      dispatch(loginFailure());
      dispatch(getTokenError());
    }
  };

  return (
    <div className="login-main">
      <LoginHeader />
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="username"
          required
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
