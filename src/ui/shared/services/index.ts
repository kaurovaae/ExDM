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

	return await doRequest(url, options);
}

export async function put<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'PUT',
		...params
	};

	return await doRequest(url, options);
}

export async function del<T>(url: string, params = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		method: 'DELETE',
		...params
	};

	return await doRequest(url, options);
}

async function doRequest<T>(url: string, params: RequestInit = {}): Promise<{ok: boolean, result?: T} | undefined> {
	const options = {
		headers,
		...params,
		body: params.body ? JSON.stringify(params.body) : null
	};

	let result;
	try {
		const res = await fetch(url, options);
		if (res.status === 400) {
			throw new Error(res.statusText);
		}

		result = await res.json();
	} catch (err) {
		return {ok: false}
	}

	return {ok: true, result}
}