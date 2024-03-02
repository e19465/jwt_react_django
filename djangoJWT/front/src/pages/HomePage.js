import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../components/HomePage/HomeHeader";
import { useEffect, useState } from "react";
import api from "../api";
import { logout } from "../redux/features/userTokens/userTokenSlice";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((store) => store.userAuth);
  const { auth_tokens } = useSelector((store) => store.userToken);
  const dispatch = useDispatch();

  const getNotes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(auth_tokens.access),
      },
    };
    try {
      const response = await api.get("/notes/", config);
      setNotes(response.data);
    } catch (err) {
      dispatch(logout());
      console.log(err.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="home">
      <HomeHeader />
      {user && <p className="homepage-welcome">Hello {user.username}!</p>}
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
