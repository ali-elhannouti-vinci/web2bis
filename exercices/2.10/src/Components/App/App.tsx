import { Outlet, useNavigate } from "react-router-dom";
import MovieListPage from "../MovieListPage/MovieListPage";
import CinemaPage from "../CinemaPage/CinemaPage";

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

const HomePage = () => <HomePage />;
const MovieListPageRender = () => <MovieListPage />;
const CinemaPageRender = () => <CinemaPage />;

const App = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

export default App;
export { HomePage, MovieListPageRender, CinemaPageRender };
