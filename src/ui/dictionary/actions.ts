import * as dictionaryService		from "ui/shared/services/dictionary";
import {message}					from "antd";

import {Dispatch, GetState} 		from "ui/shared/Model/Redux";

export function createDictionaryItem(data: {name: string, date: string}) {
	return (dispatch: Dispatch, getState: GetState): void => {
		const cb = (): void => {
			void message.success("Элемент справочника успешно добавлен");
		};

		void createDictionaryItemImpl(data, cb);
	}
}

async function createDictionaryItemImpl(data: {name: string, date: string}, callBack?: () => void): Promise<void> {
	const res = await dictionaryService.createDictionaryItem(data);
	if (!res?.ok) {
		return;
	}

	if (res.result?.success) {
		callBack && callBack();
	} else {
		void message.error(res.result?.message || "При добавлении элемент справочника произошла ошибка");
	}
}