import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from './core/hook/redux';
import { Suspense } from 'react';
import RootAppComponent from './core/layout/root-app-component';
import RenderRouter from './route/route';

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
