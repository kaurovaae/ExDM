import React						from "react";
import {InputNumber, Select} 		from "antd";

interface Props {
	options: string[];
	placeholder?: string;
	selectOptions?: {
		onChange?: (value) => void;
		defaultValue?: string;
		disabled?: boolean;
	};

	[key: string]: unknown;
}

const SelectInput: React.FC<Props> = (props: Props): React.ReactElement => {
	const {options = [], placeholder = '', selectOptions = {}, ...rest} = props;

	return (
		<InputNumber
			placeholder={placeholder}
			addonAfter={(
				<Select style={{width: 80}} {...selectOptions}>
					{options.map(el => <Select.Option key={el} value={el}>{el}</Select.Option>)}
				</Select>
			)}
			{...rest}
		/>
	)
};

export default React.memo(SelectInput);