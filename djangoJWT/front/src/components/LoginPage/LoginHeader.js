import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="header">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginHeader;
