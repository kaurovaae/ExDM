import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useQuery
} 										from "react-query";
import {
	getProductItem
} 										from "ui/shared/services/product";
import {
	Button, DatePicker, Form,
	Select, Space
} 										from "antd";
import {EditOutlined}				 	from "@ant-design/icons";
import {QUERY}			 				from "ui/product/consts";
import {QUERY as DICTIONARY_QUERY} 		from "ui/dictionary/consts";
import {getDictionaryList} 				from "ui/shared/services/dictionary";
import {DATE_FORMAT} 					from "ui/shared/consts";
import dayjs 							from "dayjs";
import URLS 							from "../../../urls";

import styles 							from "./index.css";

const ProductPreview: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('productId'), [searchParams]);

	const navigate = useNavigate();

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

	const disabledDate = useCallback((current): boolean => {
		return current && current < dayjs().startOf('day');
	}, []);

	const onEdit = useCallback(() => {
		navigate(`${URLS.PRODUCT}/${URLS.EDIT}?productId=${id}`);
	}, [navigate, id]);

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
						options={dInitial && dInitial.map(el => ({
							value: el._id,
							label: `${el?.name}${el?.mfr ? ' / ' + el.mfr : ''}${el?.measuring ? ' / ' + el.measuring : ''}`
						}))}
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
						disabled
					/>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button
							type="primary"
							onClick={onEdit}
							icon={<EditOutlined />}
						>
							Редактировать
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ProductPreview;
