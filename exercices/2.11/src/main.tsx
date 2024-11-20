import React from "react";
import ReactDOM from "react-dom/client";
import {App,HomePageRender,CinemaPageRender,MovieListPageRender} from "./Components/App/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddMoviePageRender from "./Components/Pages/AddMoviePage/AddMoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<HomePageRender />,
      },
      {
        path: "cinemapage",
        element: <CinemaPageRender />,
      },
      {
        path: "movielist",
        element: <MovieListPageRender />,
      },
      {
        path: "addmoviepage",
        element: <AddMoviePageRender />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
);
