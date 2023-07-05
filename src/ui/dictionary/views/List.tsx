import React, {useMemo} 				from "react";
import {useQuery} 						from "react-query";
import {getDictionaryList} 				from "ui/shared/services/dictionary";
import {Table}							from "antd";

const DictionaryList: React.FC = (): React.ReactElement => {
	const {isLoading, error, data} = useQuery('dictionaryList', getDictionaryList);

	const columns = useMemo(() => ([
		{
			title: "Наименование",
			dataIndex: "name",
			key: "name"
		}
	]), []);

	const products = data?.result?.data;
	const dataSource = products && !!products?.length && products.map(el => ({
		key: el._id,
		name: el.name
	}))

	return (
		<div>
			{isLoading && <div>Loading</div>}
			{dataSource && <Table dataSource={dataSource} columns={columns} bordered />}
			{error && <div>error</div>}
		</div>
	)
}

export default DictionaryList;
