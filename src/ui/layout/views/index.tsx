import React                    		from "react";
import {Layout, Menu, ConfigProvider}	from "antd";
import {Routes, Route, Navigate}		from "react-router";
import URLS, {ANY} 						from "../../../urls";
import Product							from "ui/product";
import Dictionary						from "ui/dictionary";
import {NAV_ITEMS} 						from "ui/layout/consts";
import LayoutView 						from "ui/layout/views/LayoutView";
import {Link}							from "react-router-dom";
import dayjs							from "dayjs";
import ru_RU 							from 'antd/es/locale/ru_RU';

import styles 							from "./index.css";

import 'antd/dist/reset.css';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const {Header, Footer, Sider, Content} = Layout;

const LayoutContent: React.FC = (): React.ReactElement => {

	return (
		<ConfigProvider locale={ru_RU}>
			<Layout>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					// onBreakpoint={(broken) => {
					// 	console.log(broken);
					// }}
					// onCollapse={(collapsed, type) => {
					// 	console.log(collapsed, type);
					// }}
				>
					<Link to={URLS.HOME}>
						<i className={styles.logo} />
					</Link>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['4']}
						items={NAV_ITEMS.map(
							(el) => ({
								key: el.link,
								icon: React.createElement(el.icon),
								label: <Link to={el.link}>{el.label}</Link>
							})
						)}
					/>
				</Sider>
				<Layout>
					<Header className={styles.header} />
					<Content className={styles.content}>
						<div className={styles.inner}>
							<Routes>
								<Route key={URLS.PRODUCT} path={URLS.PRODUCT + ANY} element={<Product />} />
								<Route key={URLS.DICTIONARY} path={URLS.DICTIONARY + ANY} element={<Dictionary />} />
								<Route key={URLS.HOME} path={URLS.HOME} element={<LayoutView />} />
								<Route path='*' element={<Navigate to={URLS.HOME} replace />} />
							</Routes>
						</div>
					</Content>
					<Footer className={styles.footer}>ExDM © 2023-2024 Created by AnitaChess</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}

export default LayoutContent;
