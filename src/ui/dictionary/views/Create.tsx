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
import {useMutation, useQueryClient} 	from "react-query";
import {createDictionaryItem} 			from "ui/shared/services/dictionary";
import URLS 							from "../../../urls";

import styles 							from "./index.css";

const DictionaryCreate: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form] = Form.useForm();

	const mutation = useMutation(createDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				const id = data.result?.id;
				void queryClient.invalidateQueries(['dictionaryList', `${id}`]);
				void message.success("Элемент справочника успешно добавлен");
				navigate(`${URLS.DICTIONARY}/${URLS.EDIT}?itemId=${id}`);
			} else {
				void message.error(data?.result?.message || "При добавлении элемент справочника произошла ошибка");
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || "При изменении элемента справочника произошла ошибка");
		}
	});

	const onFinish = useCallback((data) => {
		mutation.mutate(data);
	}, [mutation]);

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
