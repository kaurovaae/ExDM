import React                   		from "react";
import {Route, Routes} 				from "react-router";
import URLS, {ANY} 					from "../../urls";
import DictionaryContent			from "ui/dictionary/views";
import DictionaryCreate				from "ui/dictionary/views/Create";
import DictionaryEdit				from "ui/dictionary/views/Edit";
import DictionaryPreview			from "ui/dictionary/views/Preview";

const DictionaryBundle: React.FC = (): React.ReactElement => {
    return (
		<Routes>
			<Route key={URLS.DICTIONARY + URLS.CREATE} path={URLS.CREATE + ANY} element={<DictionaryCreate />} />
			<Route key={URLS.DICTIONARY + URLS.EDIT} path={URLS.EDIT + ANY} element={<DictionaryEdit />} />
			<Route key={URLS.DICTIONARY + URLS.PREVIEW} path={URLS.PREVIEW + ANY} element={<DictionaryPreview />} />
			<Route key={URLS.DICTIONARY} path="*" element={<DictionaryContent />} />
		</Routes>
    )
}

export default DictionaryBundle;
