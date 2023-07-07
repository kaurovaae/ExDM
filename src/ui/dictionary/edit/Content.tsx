import React, {
	useEffect, useCallback
} 										from "react";
import Spinner 							from "ui/ui-kit/Spinner";
import {useNavigate} 					from "react-router";
import {useQuery} 						from "react-query";
import {
	Form, Input,
	message, Space,
	Button
}										from "antd";
import {
	CheckOutlined,
	StopOutlined
} 										from "@ant-design/icons";
import useDispatch 						from "ui/shared/hooks/useDispatch";
import {getDictionaryItem} 				from "ui/shared/services/dictionary";

import styles 							from "./index.css";

interface Props {
	id: string;
}

const DictionaryEditContent: React.FC<Props> = (props: Props): React.ReactElement => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const id = props.id;

	const {isLoading, error, data} = useQuery(id, getDictionaryItem);

	const [form] = Form.useForm();

	const onFinish = useCallback((data) => {
		// dispatch(createDictionaryItem(data));
	}, [dispatch]);

	const onFinishFailed = useCallback(() => {
		void message.error('Ошибка валидации!');
	}, []);

	const back = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		return <div>error</div>
	}

	console.log("data", data)

	return (
		<div>
			<Form
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{span: 8}}
				wrapperCol={{span: 16}}
			>
				<Form.Item
					name="name"
					label="Наименование"
					rules={[
						{required: true, message: 'Необходимо заполнить поле. Минимум 3 символа', min: 3}
					]}
					className={styles.field}
				>
					<Input
						placeholder="Введите наименование"
						className={styles.input}
					/>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button
							type="primary"
							htmlType="submit"
							icon={<CheckOutlined />}
						>
							Сохранить
						</Button>
						<Button onClick={back} icon={<StopOutlined />}>
							Отменить
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default DictionaryEditContent;