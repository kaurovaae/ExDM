import {post, get, BaseElementInfo} 					from "ui/shared/services";

function getEndpoint(): string {
	return '/api/dictionary';
}

interface DictionaryItem extends BaseElementInfo {
	name: string;
}

type DictionaryListResponse = {
	data: DictionaryItem[];
	success: boolean;
	message: string;
};

export async function getDictionaryList(): Promise<{ok: boolean, result?: DictionaryListResponse} | undefined> {
	const url = getEndpoint();

	return await get<DictionaryListResponse>(url);
}

export type CreateDictionaryItemRequest = {
	name: string;
};

type CreateDictionaryItemResponse = {
	id: string;
	success: boolean;
	message: string;
};

export async function createDictionaryItem(params: CreateDictionaryItemRequest): Promise<{ok: boolean, result?: CreateDictionaryItemResponse} | undefined> {
	const url = getEndpoint();

	const options = {
		body: params
	};

	return await post<CreateDictionaryItemResponse>(url, options);
}