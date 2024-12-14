import { useNavigate } from "react-router-dom";
import "./NavBar.css";
const NavBar = ({theme,switchTheme}:navbarProps) => {

  const navigate = useNavigate();
 
  return (
    <nav className={theme+"-theme"}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cinemapage")}>Cinema page</button>
      <button onClick={() => navigate("/movielist")}> Movie list</button>
      <button onClick={() => navigate("/addmoviepage")}> Add Movie Page</button>
      <button onClick={switchTheme}> Switch to {theme=="light" ? "dark" : "light"} mode</button>
    </nav>
  );
};

interface navbarProps{
  theme:string,
  switchTheme:() => void
}
export default NavBar;