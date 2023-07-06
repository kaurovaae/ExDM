import React, {useCallback, useState} 		from "react";
import {
	Button,
	Space
} 											from 'antd';
import {
	EyeOutlined,
	FileOutlined,
	EditOutlined,
	DeleteOutlined
} 											from "@ant-design/icons";
import ConfirmationPopup 					from "ui/ui-kit/Popup/ConfirmationPopup";

export interface DisabledProps {
	// просмотр
	preview?: boolean;
	// создать
	create?: boolean;
	// изменить
	edit?: boolean;
	// удалить
	remove?: boolean;
}

interface Props {
	onPreview?: () => void;
	onCreate?: () => void;
	onEdit?: () => void;
	onRemove?: () => void;
	disabled?: DisabledProps;
}

const ActionBtns: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const {onPreview, onCreate, onEdit, onRemove, disabled = {}} = props;

	const [shown, setShown] = useState<boolean>(false);

	const toggle = useCallback(() => {
		setShown(prev => !prev);
	}, []);

	const remove = useCallback((): void => {
		onRemove && onRemove();
		setShown(false);
	}, [onRemove]);

	return (
		<>
			<ConfirmationPopup shown={shown} onCancel={toggle} onSubmit={remove}>
				<p>Вы действительно хотите удалить выбранный элемент?</p>
			</ConfirmationPopup>
			<Space wrap>
				<Button icon={<EyeOutlined />} disabled={disabled.preview} onClick={onPreview}>
					Просмотр
				</Button>
				<Button icon={<FileOutlined />} disabled={disabled.create} onClick={onCreate}>
					Добавить
				</Button>
				<Button icon={<EditOutlined />} disabled={disabled.edit} onClick={onEdit}>
					Изменить
				</Button>
				<Button icon={<DeleteOutlined />} disabled={disabled.remove} onClick={toggle}>
					Удалить
				</Button>
			</Space>
		</>
	)
}

export default React.memo(ActionBtns);