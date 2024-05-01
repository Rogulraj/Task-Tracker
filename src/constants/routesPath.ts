const taskPath = `/task`;

interface RoutePathsType {
  taskHome: string;
  taskAnalytics: string;
}

export const routePaths: RoutePathsType = {
  taskHome: `${taskPath}/home`,
  taskAnalytics: `${taskPath}/analytics`,
};
