import AppProvider from "@providers/index";
import AppRoutes from "./router";

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
export default App;
