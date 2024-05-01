import { routePaths } from "@constants/routesPath";
import { RoutePropsType } from "@interfaces/route.interface";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

// pages
const LoginPage = lazy(() => import("@pages/Auth/Login/LoginPage"));

export const authRoutes: RoutePropsType[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to={routePaths.authLogin} />,
  },
];
