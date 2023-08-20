import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useMutation, useQuery,
	useQueryClient
} 										from "react-query";
import {
	editProductItem,
	getProductItem
} 										from "ui/shared/services/product";
import {
	Button, DatePicker, Form,
	message, Select, Space
} 										from "antd";
import {CheckOutlined, StopOutlined} 	from "@ant-design/icons";
import {QUERY, MESSAGE} 				from "ui/product/consts";
import {QUERY as DICTIONARY_QUERY} 		from "ui/dictionary/consts";
import {getDictionaryList} 				from "ui/shared/services/dictionary";
import {DATE_FORMAT} 					from "ui/shared/consts";
import dayjs 							from "dayjs";

import styles 							from "./index.css";

const ProductEdit: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('productId'), [searchParams]);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {isLoading: dIsLoading, error: dError, data: dData} = useQuery(DICTIONARY_QUERY.DICTIONARY_LIST, getDictionaryList);

	const {isLoading, error, data} = useQuery([QUERY.PRODUCT_ITEM, `${id}`], getProductItem, {
		enabled: !!id
	});

	const initial = useMemo(() => {
		const info = data?.result?.data;
		return info ? {
			...info,
			date: info && dayjs(new Date(info?.date))
		} : {};
	}, [data]);

	const dInitial = useMemo(() => dData?.result?.data, [dData]);

	const [form] = Form.useForm();

	const mutation = useMutation(editProductItem, {
		onSuccess: (data) => {
			if (data?.ok) {
				void queryClient.invalidateQueries([QUERY.PRODUCT_LIST]);
				void queryClient.invalidateQueries([QUERY.PRODUCT_ITEM, `${id}`]);
				void message.success(MESSAGE.SUCCESS_EDIT);
			} else {
				void message.error(data?.result?.message || MESSAGE.ERROR_EDIT);
			}
		},
		onError: (error: {message?: string}) => {
			void message.error(error.message || MESSAGE.ERROR_EDIT);
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

	const disabledDate = useCallback((current): boolean => {
		return current && current < dayjs().startOf('day');
	}, []);

	if (!id || isLoading || dIsLoading) {
		return <Spinner />
	}

	if (error || dError) {
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
						options={dInitial && dInitial.map(el => ({value: el._id, label: el.name}))}
						disabled
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

export default ProductEdit;
