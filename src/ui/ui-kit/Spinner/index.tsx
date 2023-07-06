import React					from 'react';
import {LoadingOutlined} 		from '@ant-design/icons';
import {Spin} 					from "antd";

import styles					from './index.css';

const Spinner: React.FC = (): React.ReactElement => (
	<div className={styles.connecting}>
		<Spin
			size="large"
			indicator={<LoadingOutlined style={{fontSize: 40}} spin />}
		/>
	</div>
);

export default React.memo(Spinner);