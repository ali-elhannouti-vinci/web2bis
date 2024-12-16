import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { MaybeAuthenticatedUser } from "../../types";
const NavBar = ({theme,switchTheme,authenticatedUser,clearUser}:navbarProps) => {

  const navigate = useNavigate();
 
  if(authenticatedUser){
    return (
      <nav className={theme+"-theme"}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cinemapage")}>Cinema page</button>
        <button onClick={() => navigate("/movielist")}> Movie list</button>
        <button onClick={() => navigate("/addmoviepage")}> Add Movie Page</button>
        <button onClick={() => clearUser()}>Se déconnecter</button>
        <button onClick={switchTheme}> Switch to {theme=="light" ? "dark" : "light"} mode</button>
      </nav>
    );
  }
  return (
    <nav className={theme+"-theme"}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cinemapage")}>Cinema page</button>
      <button onClick={() => navigate("/movielist")}>Movie list</button>
      <button onClick={() => navigate("/register")}>Créer un utilisateur</button>
      <button onClick={() => navigate("/login")}>Se connecter</button>
      <button onClick={switchTheme}> Switch to {theme=="light" ? "dark" : "light"} mode</button>
    </nav>
  );

  
};

interface navbarProps{
  theme:string,
  switchTheme:() => void,
  authenticatedUser: MaybeAuthenticatedUser,
  clearUser: () => void;
}
export default NavBar;