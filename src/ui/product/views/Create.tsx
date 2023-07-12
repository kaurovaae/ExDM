import React, {useCallback} 			from "react";
import {useNavigate} 					from "react-router";
import {
	Form,
	message, Space,
	Button, DatePicker,
	Select
}										from "antd";
import {
	CheckOutlined,
	StopOutlined
} 										from "@ant-design/icons";
import {createProduct} 					from "ui/shared/services/product";
import {DATE_FORMAT} 					from "ui/shared/consts";
import {
	useQuery, useMutation,
	useQueryClient
}									 	from "react-query";
import {getDictionaryList} 				from "ui/shared/services/dictionary";
import URLS 							from "../../../urls";
import {QUERY as DICTIONARY_QUERY}		from "ui/dictionary/consts";
import {QUERY}							from "ui/product/consts";

import styles 							from "./create.css";

const ProductCreate: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form] = Form.useForm();

	const {data} = useQuery(DICTIONARY_QUERY.DICTIONARY_LIST, getDictionaryList);

	const mutation = useMutation(createProduct, {
		onSuccess: (data) => {
			if (data?.ok) {
				const id = data.result?.id;
				void queryClient.invalidateQueries([QUERY.PRODUCT_LIST, `${id}`]);
				void message.success("Продукт успешно добавлен");
				navigate(`${URLS.PRODUCT}/${URLS.EDIT}?itemId=${id}`);
			} else {
				void message.error(data?.result?.message || "При добавлении продукта произошла ошибка");
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || "При добавлении продукта произошла ошибка");
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

	const items = data?.result?.data;

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
					<Select
						placeholder="Введите наименование"
						className={styles.input}
						options={items && items.map(el => ({value: el.name, label: el.name}))}
						disabled={!items || !items?.length}
					/>
				</Form.Item>

				<Form.Item
					name="date"
					label="Срок действия"
					rules={[
						{required: true, message: 'Необходимо заполнить поле'}
					]}
					className={styles.field}
				>
					<DatePicker
						placeholder="Введите срок действия"
						format={DATE_FORMAT}
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

export default ProductCreate;
