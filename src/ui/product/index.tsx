import React                   		from "react";
import {Route, Routes} 				from "react-router";
import URLS, {ANY} 					from "../../urls";
import ProductContent				from "ui/product/views";
import ProductCreate				from "ui/product/views/Create";

const ProductBundle: React.FC = (): React.ReactElement => {
    return (
		<Routes>
			<Route key={URLS.PRODUCT + URLS.CREATE} path={URLS.CREATE + ANY} element={<ProductCreate />} />
			<Route key={URLS.PRODUCT} path="*" element={<ProductContent />} />
		</Routes>
    )
}

export default ProductBundle;
