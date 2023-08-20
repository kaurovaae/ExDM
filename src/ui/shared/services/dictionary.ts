import {
	post, get, put, del,
	BaseElementInfo
} 										from "ui/shared/services";

function getEndpoint(): string {
	return '/api/dictionary';
}

export interface DictionaryItem extends BaseElementInfo {
	name: string;
	mfr: string;
	measuring?: string; // 20 capsules
	dose?: string; // 500mg
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

type DictionaryItemResponse = {
	data: DictionaryItem;
	success: boolean;
	message: string;
};

export async function getDictionaryItem(params: {queryKey: string[]}): Promise<{ok: boolean, result?: DictionaryItemResponse} | undefined> {
	const id = params.queryKey?.[1];
	const url = getEndpoint() + '/' + id;

	return await get<DictionaryItemResponse>(url);
}

type CreateDictionaryItemRequest = {
	name: string;
	mfr: string;
	measuring?: string;
	dose?: string;
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

type EditDictionaryItemRequest = {
	id: string;
	name: string;
	mfr: string;
	measuring?: string;
	dose?: string;
};

type EditDictionaryItemResponse = {
	id: string;
	success: boolean;
	message: string;
};

export async function editDictionaryItem(params: EditDictionaryItemRequest): Promise<{ok: boolean, result?: EditDictionaryItemResponse} | undefined> {
	const {id, ...rest} = params;
	const url = getEndpoint() + '/' + id;

	const options = {
		body: rest
	};

	return await put<EditDictionaryItemResponse>(url, options);
}

type RemoveDictionaryItemRequest = {
	id: string;
};

type RemoveDictionaryItemResponse = {
	success: boolean;
	message: string;
};

export async function removeDictionaryItem(params: RemoveDictionaryItemRequest): Promise<{ok: boolean, result?: RemoveDictionaryItemResponse} | undefined> {
	const url = getEndpoint() + '/' + params.id;

	return await del<RemoveDictionaryItemResponse>(url);
}