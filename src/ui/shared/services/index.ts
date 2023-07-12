import {message}					from "antd";

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

export interface BaseElementInfo {
	createdAt: string;
	updatedAt: string;
	__v: number;
	_id: string;
}

export async function get<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'GET',
		...params
	};

	return await doRequest(url, options);
}

export async function post<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'POST',
		...params
	};

	return await doRequest(url, options, true);
}

export async function put<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'PUT',
		...params
	};

	return await doRequest(url, options, true);
}

export async function del<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'DELETE',
		...params
	};

	return await doRequest(url, options, true);
}

async function doRequest<T>(url: string, params: RequestInit = {}, send?: boolean): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		headers,
		...params,
		body: params.body ? JSON.stringify(params.body) : null
	};

	let result;
	try {
		result = await (await fetch(url, options)).json();
	} catch (err) {
		void message.error(`При ${send ? 'отправлении' : 'получении'} данных произошла ошибка`);
		return {ok: false}
	}

	return {ok: true, result}
}