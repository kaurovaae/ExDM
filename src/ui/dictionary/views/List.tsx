import React, {
	useCallback, useMemo
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
import Table							from "ui/ui-kit/Table";
import URLS 							from "../../../urls";
import Spinner 							from "ui/ui-kit/Spinner";
import {message} 						from "antd";

const DictionaryList: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading, error, data} = useQuery('dictionaryList', getDictionaryList);

	const mutation = useMutation(removeDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries('dictionaryList');
				void message.success("Элемент справочника успешно удалён");
			} else {
				void message.error(data?.result?.message || "При удалении элемента справочника произошла ошибка");
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || "При удалении элемента справочника произошла ошибка");
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
			key: "name"
		}
	]), []);

	const products = data?.result?.data;
	const dataSource = products?.map(el => ({
		key: el._id,
		id: el._id,
		name: el.name
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

export default DictionaryList;
