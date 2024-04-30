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

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={routePaths.taskHome} />,
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
