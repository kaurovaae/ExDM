import React, {
	useCallback, useMemo,
	useState
} 										from "react";
import {useNavigate} 					from "react-router";
import {
	useQuery, useQueryClient,
	useMutation
}								 		from "react-query";
import {
	removeDictionaryItem,
	getDictionaryList
}										from "ui/shared/services/dictionary";
import {formatProductName} 				from "ui/shared/helpers";
import Table							from "ui/ui-kit/Table";
import URLS 							from "../../../urls";
import Spinner 							from "ui/ui-kit/Spinner";
import {message, Form, Input} 			from "antd";
import {QUERY, MESSAGE} 				from "ui/dictionary/consts";

import styles 							from './index.css';

const DictionaryList: React.FC = (): React.ReactElement => {
	const [name, setName] = useState<string>("");

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading, error, data} = useQuery(QUERY.DICTIONARY_LIST, getDictionaryList);

	const mutation = useMutation(removeDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries(QUERY.DICTIONARY_LIST);
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
		navigate(`${URLS.DICTIONARY}/${URLS.PREVIEW}?itemId=${id}`);
	}, [navigate]);

	const onCreateItem = useCallback(() => {
		navigate(`${URLS.DICTIONARY}/${URLS.CREATE}`);
	}, [navigate]);

	const onEditItem = useCallback((id: string) => {
		navigate(`${URLS.DICTIONARY}/${URLS.EDIT}?itemId=${id}`);
	}, [navigate]);

	const onRemoveItem = useCallback((id: string): void => {
		mutation.mutate({id});
	}, [mutation]);

	const columns = useMemo(() => ([
		{
			title: "Наименование",
			dataIndex: "name",
			key: "name",
			filteredValue: [name],
			onFilter: (value: string, record) => record.name.toLowerCase().startsWith(value.toLowerCase()),
			sorter: (a, b) => a.name.localeCompare(b.name)
		}
	]), [name]);

	const products = data?.result?.data;
	const dataSource = useMemo(() => (products || [])
		?.map(el => ({
			key: el._id,
			id: el._id,
			name: formatProductName(el)
		}))
		?.sort((a, b) => a.name.localeCompare(b.name))
	, [products]);

	const updateFilter = useCallback((changedValues, allValues) => {
		setName(changedValues.name);
	}, [setName]);

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
			beforeTable={(
				<div className={styles.filters}>
					<Form name="nameSearch" initialValues={{}} onValuesChange={updateFilter}>
						<Form.Item label="Поиск по наименованию" name="name">
							<Input />
						</Form.Item>
					</Form>
				</div>
			)}
		/>
	)
}

export default DictionaryList;
