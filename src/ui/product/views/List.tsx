import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useQuery} 						from "react-query";
import {getProductList} 				from "ui/shared/services/product";
import URLS								from "../../../urls";
import {MONTH_FORMAT} 					from "ui/shared/consts";
import dayjs							from "dayjs";
import {
	EXPIRATION_COLOR
} 										from "ui/product/consts";
import {getExpirationLvl} 				from "ui/product/helpers";
import Table							from "ui/ui-kit/Table";
import useDispatch 						from "ui/shared/hooks/useDispatch";
import {removeItem}						from "ui/product/actions";

import styles 							from "./list.css";

const ProductList: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {isLoading, error, data} = useQuery('productList', getProductList);

	const onPreviewItem = useCallback((id: string) => {
		navigate(`${URLS.PRODUCT}/${URLS.PREVIEW}?macroId=${id}`);
	}, [navigate]);

	const onCreateItem = useCallback(() => {
		navigate(`${URLS.PRODUCT}/${URLS.CREATE}`);
	}, [navigate]);

	const onEditItem = useCallback((id: string) => {
		navigate(`${URLS.PRODUCT}/${URLS.EDIT}?macroId=${id}`);
	}, [navigate]);

	const onRemoveItem = useCallback((selectedId: string, cb: () => void): void => {
		dispatch(removeItem(selectedId, cb));
	}, [dispatch]);

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
	const dataSource = products && !!products?.length && products.map(el => ({
		key: el._id,
		id: el._id,
		name: el.name,
		date: formatDate(el.date)
	}))

	return (
		<div>
			{isLoading && <div>Loading</div>}
			{dataSource && (
				<Table
					dataSource={dataSource}
					columns={columns}
					onPreview={onPreviewItem}
					onCreate={onCreateItem}
					onEdit={onEditItem}
					onRemove={onRemoveItem}
				/>
			)}
			{error && <div>error</div>}
		</div>
	)
}

export default ProductList;
