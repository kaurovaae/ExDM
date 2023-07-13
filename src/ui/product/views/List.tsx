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
	MESSAGE
} 										from "ui/product/consts";
import {getExpirationLvl} 				from "ui/product/helpers";
import Table							from "ui/ui-kit/Table";
import Spinner 							from "ui/ui-kit/Spinner";

import styles 							from "./list.css";

const ProductList: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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

	const products = data?.result?.data;
	const dataSource = products?.map(el => ({
		key: el._id,
		id: el._id,
		name: el.name,
		date: formatDate(el.date)
	})) || [];

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
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
