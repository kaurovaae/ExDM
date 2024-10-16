import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useMutation, useQuery,
	useQueryClient
} 										from "react-query";
import {
	DictionaryItem,
	editDictionaryItem,
	getDictionaryItem
} 										from "ui/shared/services/dictionary";
import {
	Button, Form, Input,
	message, Space
} 										from "antd";
import {CheckOutlined, StopOutlined} 	from "@ant-design/icons";
import {QUERY, MESSAGE} 				from "ui/dictionary/consts";
import SelectInput 						from "ui/ui-kit/SelectInput";
import {MEASURING} 						from "ui/shared/consts";

import styles 							from "./index.css";

const DictionaryEdit: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('itemId'), [searchParams]);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading, error, data} = useQuery([QUERY.DICTIONARY_ITEM, `${id}`], getDictionaryItem, {
		enabled: !!id
	});

	const initial = useMemo(() => data?.result?.data || {} as DictionaryItem, [data]);

	const [measuringCount, setMeasuringCount] = useState<number>();
	const [measuring, setMeasuring] = useState<string>();

	useEffect(() => {
		setMeasuringCount(initial?.measuringCount);
		setMeasuring(initial?.measuring);
	}, [initial]);

	const [form] = Form.useForm();

	const mutation = useMutation(editDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries([QUERY.DICTIONARY_LIST]);
				void queryClient.invalidateQueries([QUERY.DICTIONARY_ITEM, `${id}`]);
				void message.success(MESSAGE.SUCCESS_EDIT);
			} else {
				void message.error(data?.result?.message || MESSAGE.ERROR_EDIT);
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || MESSAGE.ERROR_EDIT);
		}
	});

	const onChange = useCallback((value) => {
		setMeasuringCount(value);
	}, []);

	const onSelectChange = useCallback((value) => {
		setMeasuring(value);
	}, []);

	const onFinish = useCallback((data) => {
		mutation.mutate({id, ...data, measuring, measuringCount});
	}, [mutation, id, measuring, measuringCount]);

	const onFinishFailed = useCallback(() => {
		void message.error('Ошибка валидации!');
	}, []);

	const back = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	if (!id || isLoading) {
		return <Spinner />
	}

	if (error) {
		return <div>error</div>
	}

	return (
		<div>
			<Form
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{span: 8}}
				wrapperCol={{span: 16}}
				initialValues={initial}
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
							defaultValue: initial.measuring,
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

export default DictionaryEdit;
