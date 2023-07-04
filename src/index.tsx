import React                        from "react";
import ReactDOM                     from "react-dom/client";
import {Provider}                   from "react-redux";
import {HistoryRouter as Router} 	from "redux-first-history/rr6";
import getStore		                from "./ui/store";
import LayoutBundle                 from "./ui/layout";

const {store, history} = getStore();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const app = <Provider store={store}><Router history={history as History}>
		<LayoutBundle />
	</Router>
</Provider>

export const App = (): React.ReactElement => (
    <React.StrictMode>
		{app}
    </React.StrictMode>
)

const root = ReactDOM.createRoot(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	document.getElementById("root")
);
root.render(<App />);
