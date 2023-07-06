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
	children?: string | React.ReactElement | React.ReactElement[];
}

const ConfimationPopup: React.FC<Props> = (props: Props): React.ReactElement => {
	const {onSubmit, onCancel, ...rest} = props;

	return (
		<Popup
			title="Подтверждение"
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
			{...rest}
		/>
	)
}

export default React.memo(ConfimationPopup);