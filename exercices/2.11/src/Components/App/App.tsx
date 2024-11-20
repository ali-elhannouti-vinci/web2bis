import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import MovieListPage from "../MovieListPage/MovieListPage";
import CinemaPage from "../CinemaPage/CinemaPage";
import HomePage from "../HomePage/HomePage";

const HomePageRender = () => <HomePage />;
const MovieListPageRender = () => <MovieListPage />;
const CinemaPageRender = () => <CinemaPage />;

const App = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

export { App,HomePageRender, MovieListPageRender, CinemaPageRender };
