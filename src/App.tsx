import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import RootAppComponent from './core/layout/root-app-component';
import RenderRouter from './route/route';
import AnimationPage from './shared-components/animation-page';

const queryClient = new QueryClient();
function App() {
  //const isLoadingApp = useAppSelector(state => state.app.isAppLoading);
  return (
    <QueryClientProvider client={queryClient}>
      {/* provides a uniform configuration support for components */}
        <Suspense>
            <RootAppComponent>
                <RenderRouter/>
            </RootAppComponent>  
				</Suspense>
    </QueryClientProvider>
  );
}

export default App;
