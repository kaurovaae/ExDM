import {post, get, BaseElementInfo} 				from "ui/shared/services";

function getEndpoint(): string {
	return '/api/product';
}

interface ProductItem extends BaseElementInfo {
	date: string;
	name: string;
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

export type CreateProductRequest = {
	name: string;
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