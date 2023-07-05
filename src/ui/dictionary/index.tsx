import React                   		from "react";
import {Route, Routes} 				from "react-router";
import URLS, {ANY} 					from "../../urls";
import DictionaryContent			from "ui/dictionary/views";
import DictionaryCreate				from "ui/dictionary/views/Create";

const DictionaryBundle: React.FC = (): React.ReactElement => {
    return (
		<Routes>
			<Route key={URLS.DICTIONARY + URLS.CREATE} path={URLS.CREATE + ANY} element={<DictionaryCreate />} />
			<Route key={URLS.DICTIONARY} path="*" element={<DictionaryContent />} />
		</Routes>
    )
}

export default DictionaryBundle;
