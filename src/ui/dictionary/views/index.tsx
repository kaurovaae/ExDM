import React                    		from "react";
import {Link}							from "react-router-dom";
import URLS 							from "../../../urls";

import DictionaryList 					from "./List";

const DictionaryContent: React.FC = (): React.ReactElement => {
	return (
		<div>
			<Link to={URLS.CREATE}>Добавить элемент справочника</Link>
			<DictionaryList />
		</div>
	)
}

export default DictionaryContent;
