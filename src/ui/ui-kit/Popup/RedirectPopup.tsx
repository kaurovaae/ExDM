import React 								from "react";
import {
	Button
} 											from 'antd';
import Popup 								from 'ui/ui-kit/Popup';
import {
	CheckOutlined,
	StopOutlined
} 											from "@ant-design/icons";

interface Props {
	onSubmit?: () => void;
	shown?: boolean;
	onCancel: () => void;
}

const RedirectPopup: React.FC<Props> = (props: Props): React.ReactElement => {
	const {onSubmit, shown, onCancel} = props;

	return (
		<Popup
			title="Информация"
			shown={shown}
			onCancel={onCancel}
			footer={[
				<Button
					key="primary"
					type="primary"
					onClick={onSubmit}
					icon={<CheckOutlined />}
				>
					Да
				</Button>,
				<Button
					key="secondary"
					onClick={onCancel}
					icon={<StopOutlined />}
				>
					Нет
				</Button>
			]}
		>
			<p>Вы переходите на другую страницу. Внесённые изменения не будут сохранены.</p>
			<p>Во избежание потери введённых данных нажмите на кнопку "Сохранить" и попробуйте снова.</p>
			<p>Продолжить?</p>
		</Popup>
	)
}

export default React.memo(RedirectPopup);