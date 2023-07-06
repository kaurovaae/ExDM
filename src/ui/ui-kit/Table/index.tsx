import React, {
	useCallback,
	useState
} 											from "react";
import ActionBtns, {DisabledProps} 			from "ui/ui-kit/ActionBtns";
import Spinner 								from "ui/ui-kit/Spinner";
import {
	Empty,
	Table,
	TablePaginationConfig
} 											from "antd";

import type {ColumnsType} 					from "antd/es/table";

import styles 								from "./index.css";

interface Props {
	disabled?: DisabledProps;

	onPreview: (id: string) => void;
	onCreate: () => void;
	onEdit: (id: string) => void;
	onRemove: (id: string, cb: () => void) => void;
	onSelect?: (item: unknown) => void;

	columns: ColumnsType<object>;
	dataSource?: readonly object[];
	pagination?: TablePaginationConfig;
}

const TableList: React.FC<Props> = (props): React.ReactElement => {
	const {disabled, onPreview, onCreate, onEdit, onRemove, onSelect, columns, dataSource, pagination} = props;

	const [selectedId, setSelectedId] = useState<string>('');

	const previewItem = useCallback(() => {
		onPreview(selectedId);
	}, [selectedId, onPreview]);

	const createItem = useCallback(() => {
		onCreate();
	}, [onCreate]);

	const editItem = useCallback(() => {
		onEdit(selectedId);
	}, [selectedId, onEdit]);

	const cb = useCallback(() => {
		setSelectedId('');
	}, []);

	const removeItem = useCallback((): void => {
		onRemove(selectedId, cb);
	}, [selectedId, onRemove, cb]);

	const selectItem = useCallback((record) => (): void => {
		setSelectedId(prev => prev === record.id ? '' : record.id);
		onSelect && onSelect(record);
	}, [onSelect]);

	const rowClassName = useCallback((record): string =>
		record.key === selectedId ? 'ant-table-row-selected' : '', [selectedId]);

	const dis = {
		...disabled,
		preview: disabled?.preview || !selectedId,
		edit: disabled?.edit || !selectedId,
		remove: disabled?.remove || !selectedId
	};

	return (
		<>
			<ActionBtns
				onPreview={previewItem}
				onCreate={createItem}
				onEdit={editItem}
				onRemove={removeItem}
				disabled={dis}
			/>

			<div className={styles.content}>
				{!Array.isArray(dataSource)
					? <Spinner />
					: (
						<Table
							locale={{emptyText: <Empty description={<div className={styles.empty}>Нет данных</div>} />}}
							dataSource={dataSource}
							columns={columns}
							rowClassName={rowClassName}
							pagination={pagination}
							onRow={(record): {onClick: (record) => void} => ({
								onClick: selectItem(record)
							})}
							bordered
						/>
					)}
			</div>
		</>
	)
};

export default React.memo(TableList);