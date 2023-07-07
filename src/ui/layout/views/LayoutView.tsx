import React                    		from "react";
import URLS								from "../../../urls";
import {Link} 							from "react-router-dom";

const LayoutView: React.FC = (): React.ReactElement => {

	return (
		<ul>
			<li>Заполните <Link to={URLS.DICTIONARY}>справочник продуктов</Link></li>
			<li>Добавьте <Link to={`${URLS.PRODUCT}/${URLS.CREATE}`}>продукты</Link></li>
			<li>Отслеживайте <Link to={URLS.PRODUCT}>статус</Link></li>
		</ul>
	)
}

export default LayoutView;
