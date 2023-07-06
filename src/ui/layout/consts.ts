import URLS 							from "../../urls";

import {
	IdcardOutlined,
	DatabaseOutlined
} 										from '@ant-design/icons';

export const PREFIX = 'layout';

export const SET_MODEL = 'layout_SET';

export const NAV_ITEMS = [
	{
		label: "Справочник",
		link: URLS.DICTIONARY,
		icon: IdcardOutlined
	},
	{
		label: "Картотека",
		link: URLS.PRODUCT,
		icon: DatabaseOutlined
	}
]