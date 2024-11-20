import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddMoviePage from "./Components/Pages/AddMoviePage/AddMoviePage";
import MovieListPage from "./Components/Pages/MovieListPage/MovieListPage";
import CinemaPage from "./Components/Pages/CinemaPage/CinemaPage";
import HomePage from "./Components/Pages/HomePage/HomePage";
import MoviePage from "./Components/Pages/MoviePage/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<HomePage />,
      },
      {
        path: "cinemapage",
        element: <CinemaPage />,
      },
      {
        path: "movielist",
        element: <MovieListPage />,
      },
      {
        path: "addmoviepage",
        element: <AddMoviePage />
      },
      {
        path: "moviepage/:movieId",
        element:<MoviePage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
);
