import React                        from 'react';
import ReactDOM                     from 'react-dom/client';
import Layout                       from './ui/layout';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
}                                   from 'react-query';
import {ReactQueryDevtools}         from 'react-query/devtools';
import {Provider}                   from 'react-redux';
import store                        from './ui/store';

const queryClient = new QueryClient()

export const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Layout />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
