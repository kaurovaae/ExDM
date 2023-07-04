import {SET_MODEL}							from "ui/product/consts";
import type ProductState					from "ui/product/Model/State";

export default function productReducer(
	state: ProductState | null = null,
	action: {type: string, model: Partial<ProductState>}
): ProductState {
	switch (action.type) {
		case SET_MODEL: {
			return {
				...state,
				...action.model
			}
		}
		default:
			return state as ProductState;
	}
}