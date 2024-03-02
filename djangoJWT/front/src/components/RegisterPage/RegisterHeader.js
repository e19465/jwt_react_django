import { Link } from "react-router-dom";

const RegisterHeader = () => {
  return (
    <div className="header">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/login">
        login
      </Link>
    </div>
  );
};

export default RegisterHeader;
