import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import RootAppComponent from './core/layout/root-app-component';
import RenderRouter from './route/route';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './customTheme';

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={customTheme}>
                <Suspense>
                    <RootAppComponent>
                        <RenderRouter />
                    </RootAppComponent>
                </Suspense>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
