import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import RootAppComponent from './core/layout/root-app-component';
import RenderRouter from './route/route';

const queryClient = new QueryClient();
function App() {
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
