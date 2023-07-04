import {SET_MODEL}							from "ui/layout/consts";
import type LayoutState						from "ui/layout/Model/State";

export default function layoutReducer(
	state: LayoutState | null = null,
	action: {type: string, model: Partial<LayoutState>}
): LayoutState {
	switch (action.type) {
		case SET_MODEL: {
			return {
				...state,
				...action.model
			}
		}
		default:
			return state as LayoutState;
	}
}