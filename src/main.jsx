import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddPlaylist from "./pages/AddPlaylist.jsx";
import AddSong from "./pages/addSong.jsx";
import SinglePlaylist from "./pages/SinglePlaylist.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/playlist/:playlistId",
        element: <SinglePlaylist />,
      },
      {
        path: "/createPlaylist",
        element: <AddPlaylist />,
      },
      {
        path: "/createSong",
        element: <AddSong />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
