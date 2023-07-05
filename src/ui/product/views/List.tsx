import React, {useMemo} 				from "react";
import {useQuery} 						from "react-query";
import {getProductList} 				from "ui/shared/services/product";
import {Table}							from "antd";
import {MONTH_FORMAT} 					from "ui/shared/consts";
import dayjs							from "dayjs";

const ProductList: React.FC = (): React.ReactElement => {
	const {isLoading, error, data} = useQuery('productList', getProductList);

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

	const products = data?.result?.data;
	const dataSource = products && !!products?.length && products.map(el => ({
		key: el._id,
		name: el.name,
		date: dayjs(el.date).format(MONTH_FORMAT)
	}))

	return (
		<div>
			{isLoading && <div>Loading</div>}
			{dataSource && <Table dataSource={dataSource} columns={columns} bordered />}
			{error && <div>error</div>}
		</div>
	)
}

export default ProductList;
