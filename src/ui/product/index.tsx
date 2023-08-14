import React                   		from "react";
import {Route, Routes} 				from "react-router";
import URLS, {ANY} 					from "../../urls";
import ProductContent				from "ui/product/views";
import ProductCreate				from "ui/product/views/Create";
import ProductEdit 					from "ui/product/views/Edit";
import ProductPreview 				from "ui/product/views/Preview";

const ProductBundle: React.FC = (): React.ReactElement => {
    return (
		<Routes>
			<Route key={URLS.PRODUCT + URLS.CREATE} path={URLS.CREATE + ANY} element={<ProductCreate />} />
			<Route key={URLS.PRODUCT + URLS.EDIT} path={URLS.EDIT + ANY} element={<ProductEdit />} />
			<Route key={URLS.PRODUCT + URLS.PREVIEW} path={URLS.PREVIEW + ANY} element={<ProductPreview />} />
			<Route key={URLS.PRODUCT} path="*" element={<ProductContent />} />
		</Routes>
    )
}

export default ProductBundle;
