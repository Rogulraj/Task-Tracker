// packages
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// routes
import { taskRoutes } from "./task.routes";

// constants
import { routePaths } from "@constants/routesPath";
import { authRoutes } from "./auth.routes";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={routePaths.authLogin} />,
    },
    {
      path: "/auth/*",
      children: [...authRoutes],
    },
    {
      path: "/task/*",
      children: [...taskRoutes],
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
