export const PREFIX = 'product';

export const SET_MODEL = 'product_SET';

export const EXPIRATION_LEVEL = {
	LOW: 'low',
	MIDDLE: 'middle',
	NORMAL: 'normal'
}

export const EXPIRATION_COLOR = {
	[EXPIRATION_LEVEL.LOW]: 'red',
	[EXPIRATION_LEVEL.MIDDLE]: 'orange',
	[EXPIRATION_LEVEL.NORMAL]: 'green'
}

export const QUERY = {
	PRODUCT_LIST: 'productList'
}

export const MESSAGE = {
	ERROR_CREATE: "При добавлении продукта произошла ошибка",
	SUCCESS_CREATE: "Продукт успешно добавлен",
	ERROR_EDIT: "При изменении продукта произошла ошибка",
	SUCCESS_EDIT: "Продукт успешно измененён",
	ERROR_REMOVE: "При удалении элемента справочника произошла ошибка",
	SUCCESS_REMOVE: "Элемент справочника успешно удалён"
}