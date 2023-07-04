import React                    from "react";
import {
	QueryClient,
	QueryClientProvider
	// useQuery
}                                   from "react-query";
import {ReactQueryDevtools}         from "react-query/devtools";
import LayoutContent				from "ui/layout/views";

const queryClient = new QueryClient()

const LayoutBundle: React.FC = (): React.ReactElement => {
    return (
		<QueryClientProvider client={queryClient}>
			<LayoutContent />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
    )
}

export default LayoutBundle;
