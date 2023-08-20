import React, {useCallback, useMemo} 	from "react";
import {useNavigate} 					from "react-router";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import {
	useQuery
} 										from "react-query";
import {
	DictionaryItem,
	getDictionaryItem
} 										from "ui/shared/services/dictionary";
import {
	Button, Form,
	Input, Space
} 										from "antd";
import {EditOutlined} 					from "@ant-design/icons";
import {QUERY}			 				from "ui/dictionary/consts";
import URLS 							from "../../../urls";
import SelectInput 						from "ui/ui-kit/SelectInput";
import {MEASURING} 						from "ui/shared/consts";

import styles 							from "./index.css";

const DictionaryPreview: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('itemId'), [searchParams]);

	const navigate = useNavigate();

	const {isLoading, error, data} = useQuery([QUERY.DICTIONARY_ITEM, `${id}`], getDictionaryItem, {
		enabled: !!id
	});

	const initial = useMemo(() => data?.result?.data || {} as DictionaryItem, [data]);

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
					name="measuringCount"
					label="Мера измерения"
					className={styles.field}
				>
					<SelectInput
						placeholder="Количество в упаковке"
						options={Object.values(MEASURING)}
						min={1}
						selectOptions={{
							defaultValue: initial.measuring,
							disabled: true
						}}
						className={styles.input}
						disabled
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
