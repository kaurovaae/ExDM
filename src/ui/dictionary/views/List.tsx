import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useQuery} 						from "react-query";
import {getDictionaryList} 				from "ui/shared/services/dictionary";
import Table							from "ui/ui-kit/Table";
import URLS 							from "../../../urls";
import {removeDictionaryItem} 			from "ui/dictionary/actions";
import useDispatch 						from "ui/shared/hooks/useDispatch";

const DictionaryList: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {isLoading, error, data} = useQuery('dictionaryList', getDictionaryList);

	const onPreviewItem = useCallback((id: string) => {
		navigate(`${URLS.DICTIONARY}/${URLS.PREVIEW}?itemId=${id}`);
	}, [navigate]);

	const onCreateItem = useCallback(() => {
		navigate(`${URLS.DICTIONARY}/${URLS.CREATE}`);
	}, [navigate]);

	const onEditItem = useCallback((id: string) => {
		navigate(`${URLS.DICTIONARY}/${URLS.EDIT}?itemId=${id}`);
	}, [navigate]);

	const onRemoveItem = useCallback((selectedId: string, cb: () => void): void => {
		dispatch(removeDictionaryItem(selectedId, cb));
	}, [dispatch]);

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
		id: el._id,
		name: el.name
	}))

	if (isLoading) {
		return (
			<div>Loading</div>
		)
	}

	return (
		<div>
			{error && <div>error</div>}
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
		</div>
	)
}

export default DictionaryList;
