import {createStore}						from "ui/store/confStore";

import type ConfiguredStore					from "ui/store/Model/ConfiguredStore";

export default function getStore(initUrl?: string): ConfiguredStore {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const store = createStore(__CLIENT__ && global.__PRELOADED_STATE__ ? global.__PRELOADED_STATE__ : {}, initUrl);

	if(__CLIENT__){
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete global.__PRELOADED_STATE__;
	}

	return {...store};
}