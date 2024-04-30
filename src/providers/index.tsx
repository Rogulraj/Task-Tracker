// packages
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

//redux
import reduxStore from "@redux/store/store";

// css
import defaultStyle from "./index.module.css";

// // components
// import RotatingLinesLoader from "@components/Loaders/RotatingLine/RotatingLines";

// types
type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
    //   fallback={<RotatingLinesLoader strokeWidth="3" width="30" />}
    >
      <ErrorBoundary
        FallbackComponent={() => (
          <div className={defaultStyle.error_boundary_card}>
            <h2 className={defaultStyle.error_text}>Something went wrong!</h2>
          </div>
        )}>
        <HelmetProvider>
          <Provider store={reduxStore}>
            <Toaster
              position="top-center"
              richColors
              duration={3000}
              theme="light"
            />
            {children}
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
