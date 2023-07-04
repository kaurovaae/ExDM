export const MODE = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
}

export function baseConsts(prod: boolean, server?: boolean) {
	const consts = {
		__DEV__: !prod,
		__PROD__: prod,
		__CLIENT__: !server,
		__SERVER__: !!server
	};

	if (!server) {
		// @ts-ignore
		consts.global = 'window';
	}

	return consts;
}