import {
	post, get, put, del,
	BaseElementInfo
} 										from "ui/shared/services";

function getEndpoint(): string {
	return '/api/product';
}

interface ProductItem extends BaseElementInfo {
	dictionaryId: string;
	date: string;
}

type ProductListResponse = {
	data: ProductItem[];
	success: boolean;
	message: string;
};

export async function getProductList(): Promise<{ok: boolean, result?: ProductListResponse} | undefined> {
	const url = getEndpoint();

	return await get<ProductListResponse>(url);
}

interface ProductItem extends BaseElementInfo {
	dictionaryId: string;
	date: string;
}

type ProductItemResponse = {
	data: ProductItem;
	success: boolean;
	message: string;
};

export async function getProductItem(params: {queryKey: string[]}): Promise<{ok: boolean, result?: ProductItemResponse} | undefined> {
	const id = params.queryKey?.[1];
	const url = getEndpoint() + '/' + id;

	return await get<ProductItemResponse>(url);
}

export type CreateProductRequest = {
	dictionaryId: string;
	date: string;
};

type CreateProductResponse = {
	id: string;
	success: boolean;
	message: string;
};

export async function createProduct(params: CreateProductRequest): Promise<{ok: boolean, result?: CreateProductResponse} | undefined> {
	const url = getEndpoint();

	const options = {
		body: params
	};

	return await post<CreateProductResponse>(url, options);
}

type EditProductItemRequest = {
	id: string;
	date: string;
};

type EditProductItemResponse = {
	id: string;
	success: boolean;
	message: string;
};

export async function editProductItem(params: EditProductItemRequest): Promise<{ok: boolean, result?: EditProductItemResponse} | undefined> {
	const {id, ...rest} = params;
	const url = getEndpoint() + '/' + id;

	const options = {
		body: rest
	};

	return await put<EditProductItemResponse>(url, options);
}

type RemoveProductItemRequest = {
	id: string;
};

type RemoveProductItemResponse = {
	success: boolean;
	message: string;
};

export async function removeProductItem(params: RemoveProductItemRequest): Promise<{ok: boolean, result?: RemoveProductItemResponse} | undefined> {
	const url = getEndpoint() + '/' + params.id;

	return await del<RemoveProductItemResponse>(url);
}