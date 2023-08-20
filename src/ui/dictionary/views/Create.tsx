import React, {useCallback, useState} 	from "react";
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
import {MEASURING}						from "ui/shared/consts";
import {QUERY, MESSAGE} 				from "ui/dictionary/consts";
import SelectInput 						from "ui/ui-kit/SelectInput";

import styles 							from "./index.css";

const DictionaryCreate: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form] = Form.useForm();

	const [measuringCount, setMeasuringCount] = useState<number>(1);
	const [measuring, setMeasuring] = useState<string>(MEASURING.COUNT);

	const onSuccess = useCallback(() => {
		void message.success(MESSAGE.SUCCESS_CREATE);
		navigate(URLS.DICTIONARY);
	}, [navigate]);

	const mutation = useMutation(createDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				const id = data.result?.id;
				void queryClient.invalidateQueries([QUERY.DICTIONARY_LIST, `${id}`]);
				onSuccess();
			} else {
				void message.error(data?.result?.message || MESSAGE.ERROR_CREATE);
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || MESSAGE.ERROR_CREATE);
		}
	});

	const onChange = useCallback((value) => {
		setMeasuringCount(value);
	}, []);

	const onSelectChange = useCallback((value) => {
		setMeasuring(value);
	}, []);

	const onFinish = useCallback((data) => {
		mutation.mutate({...data, measuring, measuringCount});
	}, [mutation, measuring, measuringCount]);

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

				<Form.Item
					name="mfr"
					label="Производитель"
					rules={[
						{required: true, message: 'Необходимо заполнить поле. Минимум 3 символа', min: 3}
					]}
					className={styles.field}
				>
					<Input
						placeholder="Укажите производителя"
						className={styles.input}
					/>
				</Form.Item>

				<Form.Item
					name="measuringCount"
					label="Мера измерения"
					className={styles.field}
				>
					<SelectInput
						placeholder="Количество в упаковке"
						options={Object.values(MEASURING)}
						onChange={onChange}
						min={1}
						className={styles.input}
						selectOptions={{
							defaultValue: measuring,
							onChange: onSelectChange
						}}
					/>
				</Form.Item>

				<Form.Item
					name="dose"
					label="Дозировка"
					className={styles.field}
				>
					<Input
						placeholder="Укажите дозировку"
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
