import { routePaths } from "@constants/routesPath";
import { RoutePropsType } from "@interfaces/route.interface";
import Analytics from "@pages/Analytics/Analytics";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

// pages
const Home = lazy(() => import("@pages/Home/Home"));

export const taskRoutes: RoutePropsType[] = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "analytics",
    element: <Analytics />,
  },
  {
    path: "*",
    element: <Navigate to={routePaths.authLogin} />,
  },
];
