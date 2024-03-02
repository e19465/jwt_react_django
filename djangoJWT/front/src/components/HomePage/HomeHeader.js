import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userTokens/userTokenSlice";
import { useDispatch } from "react-redux";

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      dispatch(logout());
      localStorage.removeItem("persist:root");
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <Link className="Link" to="/login">
        Login
      </Link>
      <Link className="Link" to="/register">
        Register
      </Link>
      <button className="logout-btn" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default HomeHeader;
