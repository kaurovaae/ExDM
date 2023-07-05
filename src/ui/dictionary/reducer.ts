import {SET_MODEL}							from "ui/dictionary/consts";
import type DictionaryState					from "ui/dictionary/Model/State";

export default function dictionaryReducer(
	state: DictionaryState | null = null,
	action: {type: string, model: Partial<DictionaryState>}
): DictionaryState {
	switch (action.type) {
		case SET_MODEL: {
			return {
				...state,
				...action.model
			}
		}
		default:
			return state as DictionaryState;
	}
}