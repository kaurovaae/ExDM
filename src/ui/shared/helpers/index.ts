import {DictionaryItem} 					from "../services/dictionary";

export function formatProductName(item?: DictionaryItem): string {
	if (!item) {
		return '';
	}

	let name = item.name;

	if (item.dose) {
		name += `, ${item.dose}`;
	}

	if (item.measuringCount && item.measuring) {
		name += `, ${item.measuringCount} ${item.measuring}`;
	}

	if (item.mfr) {
		name += ` / «${item.mfr}»`;
	}

	return name;
}