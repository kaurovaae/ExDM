import {configureStore}                 	from "@reduxjs/toolkit";
import {createLogger} 						from "redux-logger";
import {createReduxHistoryContext} 			from "redux-first-history";
import {
	createBrowserHistory,
	createMemoryHistory
} 											from "history";
import thunk 								from "redux-thunk";

import {PREFIX as LAYOUT_PREFIX} 			from "ui/layout/consts";
import {PREFIX as PRODUCT_PREFIX} 			from "ui/product/consts";
import layoutReducer 						from "ui/layout/reducer";
import productReducer 						from "ui/product/reducer";

import type ConfiguredStore					from "ui/store/Model/ConfiguredStore";

const staticReducers = {
	[LAYOUT_PREFIX]: layoutReducer,
	[PRODUCT_PREFIX]: productReducer
}

export function createStore(initialState?: unknown, initUrl?: string): ConfiguredStore {
	const {
		createReduxHistory,
		routerMiddleware,
		routerReducer
	} = createReduxHistoryContext({history: __CLIENT__ ? createBrowserHistory() : createMemoryHistory(initUrl ? {initialEntries: [initUrl]} : undefined)});

	const logger = __DEV__ && __CLIENT__ ? createLogger({collapsed: true}) : undefined;
	const middleware = logger ? [routerMiddleware, thunk, logger] : [thunk, routerMiddleware];

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	staticReducers.router = routerReducer;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const store = configureStore({reducer: staticReducers, middleware, preloadedState: initialState});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	store.asyncReducers = {};

	const history = createReduxHistory(store);

	// Return the modified store
	return {
		store,
		history
	};
}