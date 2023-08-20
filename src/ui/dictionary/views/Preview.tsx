import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useQuery
} 										from "react-query";
import {
	getDictionaryItem
} 										from "ui/shared/services/dictionary";
import {
	Button, Form, Input,
	Space
} 										from "antd";
import {EditOutlined} 					from "@ant-design/icons";
import {QUERY}			 				from "ui/dictionary/consts";
import URLS 							from "../../../urls";

import styles 							from "./index.css";

const DictionaryPreview: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('itemId'), [searchParams]);

	const navigate = useNavigate();

	const {isLoading, error, data} = useQuery([QUERY.DICTIONARY_ITEM, `${id}`], getDictionaryItem, {
		enabled: !!id
	});

	const initial = useMemo(() => data?.result?.data || {}, [data]);

	const [form] = Form.useForm();

	const onEdit = useCallback(() => {
		navigate(`${URLS.DICTIONARY}/${URLS.EDIT}?itemId=${id}`);
	}, [navigate, id]);

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
						disabled
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
						disabled
					/>
				</Form.Item>

				<Form.Item
					name="measuring"
					label="Мера измерения"
					rules={[
						{required: false, message: 'Необходимо заполнить поле. Минимум 3 символа', min: 3}
					]}
					className={styles.field}
				>
					<Input
						placeholder="Количество капсул, таблеток, и тд в упаковке"
						className={styles.input}
						disabled
					/>
				</Form.Item>

				<Form.Item
					name="dose"
					label="Дозировка"
					rules={[
						{required: false, message: 'Необходимо заполнить поле. Минимум 3 символа', min: 3}
					]}
					className={styles.field}
				>
					<Input
						placeholder="Укажите дозировку"
						className={styles.input}
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

export default DictionaryPreview;
