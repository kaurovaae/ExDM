import * as productService			from "ui/shared/services/product";
import {message}					from "antd";

import {Dispatch, GetState} 		from "ui/shared/Model/Redux";

export function createProduct(data: {name: string, date: string}) {
	return (dispatch: Dispatch, getState: GetState): void => {
		const cb = (): void => {
			void message.success("Продукт успешно добавлен");
		};

		void createProductImpl(data, cb);
	}
}

async function createProductImpl(data: {name: string, date: string}, callBack?: () => void): Promise<void> {
	const res = await productService.createProduct(data);
	if (!res?.ok) {
		return;
	}

	if (res.result?.success) {
		callBack && callBack();
	} else {
		void message.error(res.result?.message || "При добавлении продукта произошла ошибка");
	}
}