import { RoutePropsType } from "@interfaces/route.interface";
import { lazy } from "react";

// pages
const Home = lazy(() => import("@pages/Home/Home"));

export const taskRoutes: RoutePropsType[] = [
  {
    path: "home",
    element: <Home />,
  },
];
