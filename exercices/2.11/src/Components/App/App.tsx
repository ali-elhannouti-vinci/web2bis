import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import MovieListPage from "../Pages/MovieListPage/MovieListPage";
import CinemaPage from "../Pages/CinemaPage/CinemaPage";
import HomePage from "../Pages/HomePage/HomePage";

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
