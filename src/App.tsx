import AppProvider from "@providers/index";
import AppRoutes from "./router";
import { ValidateEnv } from "@utils/envValidator";

ValidateEnv();

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
export default App;
