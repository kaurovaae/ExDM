import {EXPIRATION_LEVEL} 				from "ui/product/consts";
import dayjs							from "dayjs";

export function getExpirationLvl(date: string): valueof<typeof EXPIRATION_LEVEL> {
	const dayJsDate = dayjs(date);
	const currentDayJsDate = dayjs();

	let lvl = EXPIRATION_LEVEL.NORMAL;
	const diff = dayJsDate.diff(currentDayJsDate, 'month');

	if (diff < 2) {
		lvl = EXPIRATION_LEVEL.LOW;
	} else if (diff < 6) {
		lvl = EXPIRATION_LEVEL.MIDDLE;
	}

	return lvl;
}