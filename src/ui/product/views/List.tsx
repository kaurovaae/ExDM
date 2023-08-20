import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {
	useQuery, useMutation,
	useQueryClient
} 										from "react-query";
import {
	getProductList,
	removeProductItem
}						 				from "ui/shared/services/product";
import URLS								from "../../../urls";
import {message} 						from "antd";
import {MONTH_FORMAT} 					from "ui/shared/consts";
import dayjs							from "dayjs";
import {
	EXPIRATION_COLOR, QUERY,
	MESSAGE, EXPIRATION_LEVEL
} 										from "ui/product/consts";
import {getExpirationLvl} 				from "ui/product/helpers";
import Table							from "ui/ui-kit/Table";
import Spinner 							from "ui/ui-kit/Spinner";
import {QUERY as DICTIONARY_QUERY} 		from "ui/dictionary/consts";
import {getDictionaryList} 				from "ui/shared/services/dictionary";

import styles 							from "./index.css";

const ProductList: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading: dIsLoading, error: dError, data: dData} = useQuery(DICTIONARY_QUERY.DICTIONARY_LIST, getDictionaryList);
	const {isLoading, error, data} = useQuery(QUERY.PRODUCT_LIST, getProductList);

	const mutation = useMutation(removeProductItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries(QUERY.PRODUCT_LIST);
				void message.success(MESSAGE.SUCCESS_REMOVE);
			} else {
				void message.error(data?.result?.message || MESSAGE.ERROR_REMOVE);
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || MESSAGE.ERROR_REMOVE);
		}
	});

	const onPreviewItem = useCallback((id: string) => {
		navigate(`${URLS.PRODUCT}/${URLS.PREVIEW}?productId=${id}`);
	}, [navigate]);

	const onCreateItem = useCallback(() => {
		navigate(`${URLS.PRODUCT}/${URLS.CREATE}`);
	}, [navigate]);

	const onEditItem = useCallback((id: string) => {
		navigate(`${URLS.PRODUCT}/${URLS.EDIT}?productId=${id}`);
	}, [navigate]);

	const onRemoveItem = useCallback((id: string): void => {
		mutation.mutate({id});
	}, [mutation]);

	const columns = useMemo(() => ([
		{
			title: "Наименование",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Срок годности",
			dataIndex: "date",
			key: "date"
		}
	]), []);

	const formatDate = useCallback((date: string) => {
		const formattedDate = dayjs(date).format(MONTH_FORMAT);
		const lvl = getExpirationLvl(date);

		return <span className={styles[EXPIRATION_COLOR[lvl]]}>{formattedDate}</span>;
	}, []);

	const products = useMemo(() => data?.result?.data, [data]);
	const dictionary = useMemo(() => dData?.result?.data, [dData]);

	const dataSource = useMemo(() => (products || [])
		?.map(el => ({
			key: el._id,
			id: el._id,
			name: dictionary?.find(it => it._id === el.dictionaryId)?.name,
			date: formatDate(el.date),
			fullDate: el.date
		}))
		?.sort((a, b) => {
			const lvlA = getExpirationLvl(a.fullDate);
			const lvlB = getExpirationLvl(b.fullDate);

			const nameSort = a.name.localeCompare(b.name);

			// if expiration lvl is ok - sort by name
			const isOk = lvlA === lvlB && lvlA === EXPIRATION_LEVEL.NORMAL;
			if (isOk) {
				return nameSort;
			}

			// if soon will be expired - sort by expiration date and by name if dates are equal
			return lvlA === lvlB && dayjs(a.fullDate).diff(b.fullDate, 'days') === 0
				? nameSort
				: dayjs(a.fullDate).diff(b.fullDate);
		})
	, [products, dictionary, formatDate]);

	if (isLoading || dIsLoading) {
		return <Spinner />
	}

	if (error || dError) {
		return <div>error</div>
	}

	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			onPreview={onPreviewItem}
			onCreate={onCreateItem}
			onEdit={onEditItem}
			onRemove={onRemoveItem}
		/>
	)
}

export default ProductList;
