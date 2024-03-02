import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "./api";
import { logout } from "./redux/features/userTokens/userTokenSlice";
import { loginSuccess } from "./redux/features/userAuth/userAuthSlice";
import { jwtDecode } from "jwt-decode";

function App() {
  let { auth_tokens } = useSelector((store) => store.userToken);
  const { isLoadingUser } = useSelector((store) => store.userAuth);
  const dispatch = useDispatch();
  const fourMinutes = 1000 * 60 * 4;

  const updateToken = async () => {
    console.log("update token called!");
    try {
      const response = await api.post("/token/refresh/", {
        refresh: auth_tokens?.refresh,
      });
      dispatch(loginSuccess(jwtDecode(response.data.access)));
      auth_tokens = response.data;
    } catch (err) {
      console.log(err.message);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (isLoadingUser) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (auth_tokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => {
      clearInterval(interval);
    };
  }, [auth_tokens, isLoadingUser]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={auth_tokens ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
