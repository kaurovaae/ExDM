import React, {useMemo} 				from "react";
import {useSearchParams} 				from "react-router-dom";
import Spinner 							from "ui/ui-kit/Spinner";
import DictionaryEditContent 			from "ui/dictionary/edit/Content";

const DictionaryEdit: React.FC = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const id = useMemo(() => searchParams.get('itemId'), [searchParams]);

	if (!id) {
		return <Spinner />
	}

	return <DictionaryEditContent id={id} />
}

export default DictionaryEdit;
