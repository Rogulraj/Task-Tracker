const taskPath = `/task`;
const authPath = `/auth`;

interface RoutePathsType {
  authLogin: string;
  taskHome: string;
  taskAnalytics: string;
}

export const routePaths: RoutePathsType = {
  authLogin: `${authPath}/login`,
  taskHome: `${taskPath}/home`,
  taskAnalytics: `${taskPath}/analytics`,
};
