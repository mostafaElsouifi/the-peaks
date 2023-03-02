import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Default from "./layouts/Default";
import Home from "./routes/Home";
import AllBookmarks from "./routes/AllBookmarks";
import Article from "./routes/Article";
import SearchResults from "./routes/SearchResults";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allbookmarks",
        element: <AllBookmarks />,
      },
      {
        path: "/article/:id?",
        element: <Article />,
      },
      {
        path: "/search/:searchTerm?",
        element: <SearchResults />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
