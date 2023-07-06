import React 								from "react";
import {
	Modal
} 											from 'antd';

interface Props {
	title?: string;
	onSubmit?: () => void;
	children?: string | React.ReactElement | React.ReactElement[];
	shown?: boolean;
	onCancel: () => void;
	footer?: React.ReactElement[];
}

const Popup: React.FC<Props> = (props: Props): React.ReactElement => {
	const {title, children, shown, onCancel, footer} = props;

	return (
		<Modal
			title={title}
			open={shown}
			onCancel={onCancel}
			footer={footer}
		>
			{children}
		</Modal>
	)
}

export default React.memo(Popup);