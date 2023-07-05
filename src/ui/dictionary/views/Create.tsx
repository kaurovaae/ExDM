import React, {useCallback} 			from "react";
import {useNavigate} 					from "react-router";
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
import {createDictionaryItem} 			from "ui/dictionary/actions";

import styles 							from "./create.css";

const DictionaryCreate: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const onFinish = useCallback((data) => {
		dispatch(createDictionaryItem(data));
	}, [dispatch]);

	const onFinishFailed = useCallback(() => {
		void message.error('Ошибка валидации!');
	}, []);

	const back = useCallback(() => {
		navigate(-1);
	}, [navigate]);

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

export default DictionaryCreate;
