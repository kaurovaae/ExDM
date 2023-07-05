import React                    		from "react";
import {Link}							from "react-router-dom";
import URLS 							from "../../../urls";

import ProductList 						from "./List";

const ProductContent: React.FC = (): React.ReactElement => {
	return (
		<div>
			<Link to={URLS.CREATE}>Добавить продукт</Link>
			<ProductList />
		</div>
	)
}

export default ProductContent;
