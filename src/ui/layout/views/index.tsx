import React                    		from "react";
import {Layout}		 					from "antd";

import styles 							from "./index.css";

import 'antd/dist/reset.css';
import 'dayjs/locale/ru';

const {Header, Footer, Sider, Content} = Layout;

const LayoutContent: React.FC = (): React.ReactElement => {
	return (
		<Layout>
			<Layout>
				<Sider className={styles.sider}>SideBar</Sider>
				<Layout>
					<Header className={styles.header}>Header</Header>
					<Content className={styles.content}>Content</Content>
				</Layout>
			</Layout>
			<Footer className={styles.footer}>Footer</Footer>
		</Layout>
	)
}

export default LayoutContent;
