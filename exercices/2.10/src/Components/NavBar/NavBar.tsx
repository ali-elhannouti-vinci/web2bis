import { useNavigate } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cinemapage")}>Cinema page</button>
      <button onClick={() => navigate("/movielist")}> Movie list</button>
    </nav>
  );
};
export default NavBar;