import React                    		from "react";
import {Layout, Menu}				 	from "antd";
import {Routes, Route, Navigate}		from "react-router";
import URLS, {ANY} 						from "../../../urls";
import Product							from "ui/product";
import Dictionary						from "ui/dictionary";
import {NAV_ITEMS} 						from "ui/layout/consts";
import {Link}							from "react-router-dom";

import dayjs							from "dayjs";

import styles 							from "./index.css";

import 'antd/dist/reset.css';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const {Header, Footer, Sider, Content} = Layout;

const LayoutContent: React.FC = (): React.ReactElement => {

	return (
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
				<div className={styles.logo} />
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
							<Route path='*' element={<Navigate to={URLS.PRODUCT} replace />} />
						</Routes>
					</div>
				</Content>
				<Footer className={styles.footer}>ExDM © 2023 Created by AnitaChess</Footer>
			</Layout>
		</Layout>
	)
}

export default LayoutContent;
