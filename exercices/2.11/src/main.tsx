import React from "react";
import ReactDOM from "react-dom/client";
import {App,HomePageRender,CinemaPageRender,MovieListPageRender} from "./Components/App/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
);
