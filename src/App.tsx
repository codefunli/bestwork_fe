import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import RootAppComponent from "./core/layout/root-app-component";
import RenderRouter from "./route/route";
import { I18nextProvider } from "react-i18next";
import i18n from "./transaction/i18n";

const queryClient = new QueryClient();
function App() {
  //const isLoadingApp = useAppSelector(state => state.app.isAppLoading);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <RootAppComponent>
          <RenderRouter />
        </RootAppComponent>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
