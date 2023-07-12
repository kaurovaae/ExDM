import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useMutation, useQuery,
	useQueryClient
} 										from "react-query";
import {
	editDictionaryItem,
	getDictionaryItem
} 										from "ui/shared/services/dictionary";
import {
	Button, Form, Input,
	message, Space
} 										from "antd";
import {CheckOutlined, StopOutlined} 	from "@ant-design/icons";
import {QUERY} 							from "ui/dictionary/consts";

import styles 							from "./index.css";

const DictionaryEdit: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('itemId'), [searchParams]);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading, error, data} = useQuery([QUERY.DICTIONARY_ITEM, `${id}`], getDictionaryItem, {
		enabled: !!id
	});

	const initial = useMemo(() => data?.result?.data, [data]);

	const [form] = Form.useForm();

	const mutation = useMutation(editDictionaryItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries([QUERY.DICTIONARY_LIST, `${id}`]);
				void message.success("Элемент справочника успешно изменён");
			} else {
				void message.error(data?.result?.message || "При изменении элемента справочника произошла ошибка");
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || "При изменении элемента справочника произошла ошибка");
		}
	});

	const onFinish = useCallback((data) => {
		mutation.mutate({id, ...data});
	}, [mutation, id]);

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
				initialValues={initial ? {...initial} : {}}
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

export default DictionaryEdit;
