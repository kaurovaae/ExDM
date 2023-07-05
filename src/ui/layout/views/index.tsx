import React                    		from "react";
import {Layout}		 					from "antd";
import {Routes, Route, Navigate}		from "react-router";
import URLS, {ANY} 						from "../../../urls";
import Product							from "ui/product";
import Dictionary						from "ui/dictionary";
import dayjs							from "dayjs";

import styles 							from "./index.css";

import 'antd/dist/reset.css';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const {Header, Footer, Sider, Content} = Layout;

const LayoutContent: React.FC = (): React.ReactElement => {
	return (
		<Layout>
			<Layout>
				<Sider className={styles.sider}>SideBar</Sider>
				<Layout>
					<Header className={styles.header}>Header</Header>
					<Content className={styles.content}>
						<Routes>
							<Route key={URLS.PRODUCT} path={URLS.PRODUCT + ANY} element={<Product />} />
							<Route key={URLS.DICTIONARY} path={URLS.DICTIONARY + ANY} element={<Dictionary />} />
							<Route path='*' element={<Navigate to={URLS.PRODUCT} replace />} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
			<Footer className={styles.footer}>Footer</Footer>
		</Layout>
	)
}

export default LayoutContent;
