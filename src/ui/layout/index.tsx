import React                    from "react";
import {
	QueryClient,
	QueryClientProvider
	// useQuery
}                                   from "react-query";
import {ReactQueryDevtools}         from "react-query/devtools";
import Layout					from "ui/layout/views";

const queryClient = new QueryClient()

const LayoutBundle: React.FC = (): React.ReactElement => {
    return (
		<QueryClientProvider client={queryClient}>
			<Layout />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
    )
}

export default LayoutBundle;
