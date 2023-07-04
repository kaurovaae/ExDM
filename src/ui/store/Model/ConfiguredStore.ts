import {History} 								from "history";

export default interface ConfiguredStore {
	store: unknown,
	history: History & {
		listenObject: boolean;
	}
}