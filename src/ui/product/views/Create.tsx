import React, {useCallback, useMemo} 	from "react";
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
import {formatProductName} 				from "ui/shared/helpers";
import URLS 							from "../../../urls";
import {QUERY as DICTIONARY_QUERY}		from "ui/dictionary/consts";
import {QUERY, MESSAGE} 				from "ui/product/consts";
import dayjs							from "dayjs";

import styles 							from "./create.css";

const ProductCreate: React.FC = (): React.ReactElement => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form] = Form.useForm();

	const {data: dData} = useQuery(DICTIONARY_QUERY.DICTIONARY_LIST, getDictionaryList);

	const items = useMemo(() => dData?.result?.data, [dData]);

	const onSuccess = useCallback(() => {
		void message.success(MESSAGE.SUCCESS_CREATE);
		navigate(URLS.PRODUCT);
	}, [navigate]);

	const mutation = useMutation(createProduct, {
		onSuccess: (data) => {
			if (data?.ok) {
				const id = data.result?.id;
				void queryClient.invalidateQueries([QUERY.PRODUCT_LIST, `${id}`]);
				onSuccess();
			} else {
				void message.error(data?.result?.message || MESSAGE.ERROR_CREATE);
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || MESSAGE.ERROR_CREATE);
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

	const disabledDate = useCallback((current): boolean => {
		return current && current < dayjs().startOf('day');
	}, []);

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
					name="dictionaryId"
					label="Наименование"
					rules={[
						{required: true, message: 'Необходимо заполнить поле. Минимум 3 символа', min: 3}
					]}
					className={styles.field}
				>
					<Select
						placeholder="Введите наименование"
						className={styles.input}
						options={items && items.map(el => ({
							value: el._id,
							label: formatProductName(el)
						}))}
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
						disabledDate={disabledDate}
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
