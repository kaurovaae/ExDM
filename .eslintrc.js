module.exports = {
	"parser": "@babel/eslint-parser",
	"parserOptions": {
		"sourceType": "module",
		"requireConfigFile": false,
		"allowImportExportEverywhere": false,
		"ecmaVersion": 8,
		"ecmaFeatures": {
			"jsx": true,
			"legacyDecorators": true
		}
	},
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				"project": "tsconfig.json",
				"tsconfigRootDir": ".",
				ecmaFeatures: {
					jsx: true
				}
			},
			plugins: ["@typescript-eslint"],
			settings: {
				"paths": ["src"],
				"react": {
					"pragma": "React",	// Pragma to use, default to "React"
					"version": "16" // React version, default to the latest React stable release
				},
				"import/parsers": {
					"@typescript-eslint/parser": [".ts", ".tsx"]
				},
				"import/resolver": {
					// webpack: {
					// 	config: path.join(__dirname, 'build/webpack/client.dev.config.ts'),
					// 	extensions: [".js", ".jsx", ".ts", ".tsx"],
					// 	moduleDirectory: ['node_modules', 'src/'],
					// 	env: {
					// 		"TS_NODE_PROJECT": "\"./tsconfig-for-webpack-config.json\""
					// 	}
					// },
					node: {
						extensions: ['.js', '.jsx', '.ts', '.tsx'],
						moduleDirectory: ['node_modules', 'src/']
					}
				}
			},
			rules: {
				"react/jsx-uses-react": 2,
				"react/jsx-uses-vars": 2,
				"react/require-render-return": 2,
				"react/self-closing-comp": 2,
				"react/jsx-boolean-value": 0,
				"react/jsx-equals-spacing": 1,
				"react/jsx-key": 2,
				"react/jsx-no-comment-textnodes": 1,
				"react/jsx-no-duplicate-props": 2,
				"react/jsx-no-undef": 2,
				"react/jsx-pascal-case": 1,
				"generator-star-spacing": 1,
				"babel/new-cap": 0,
				"array-bracket-spacing": 1,
				"babel/object-curly-spacing": 1,
				"babel/object-shorthand": 0,
				"babel/arrow-parens": 0,
				"no-await-in-loop": 0,
				"comma-dangle": 2,
				"no-unused-vars": [2, {"args": "none", "varsIgnorePattern": "React", "ignoreRestSiblings": true}],
				"no-useless-escape": 0,
				"no-control-regex": 0,
				"no-mixed-spaces-and-tabs": 2,
				"require-atomic-updates": 0,
				"no-prototype-builtins": 0,
				"import/namespace": 0,
				"import/default": 0,
				"no-console": [1, {"allow": ["warn", "error"]}],
				"curly": [2, "all"],
				"brace-style": [2, "1tbs", {"allowSingleLine": true}],
				"react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
				"react-hooks/exhaustive-deps": "warn", // Проверяем зависимости эффекта
				"@typescript-eslint/no-use-before-define": 0,
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/explicit-function-return-type": "error",
				"@typescript-eslint/explicit-module-boundary-types": "error",
				"@typescript-eslint/no-unsafe-assignment": 0,
				"@typescript-eslint/no-unsafe-member-access": 0,
				"@typescript-eslint/no-unsafe-return": 0,
				"@typescript-eslint/no-unsafe-call": 0,
				"@typescript-eslint/restrict-template-expressions": 0,
				"@typescript-eslint/restrict-plus-operands": 0,
				"@typescript-eslint/unbound-method": 0,
				"@typescript-eslint/no-unused-vars": 0,
				"@typescript-eslint/no-var-requires": 0,
				"@typescript-eslint/prefer-regexp-exec": 0,
				"@typescript-eslint/no-unnecessary-type-assertion": 0,
				"@typescript-eslint/no-unsafe-argument": 0,
				"import/no-named-as-default": 0,
				"import/no-named-as-default-member": 0,
				"no-irregular-whitespace": 0,
				"no-restricted-syntax": [
					"error",
					{
						"selector": "TSEnumDeclaration",
						"message": "Enums is forbidden use consts and valueof<typeof TYPE>."
					}
				]
			},
			"extends": [
				"eslint:recommended",
				"plugin:import/errors",
				"plugin:import/warnings",
				"plugin:import/typescript",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			]
		}
	],
	"plugins": [
		"react",
		"babel",
		"import",
		"react-hooks",
		"@typescript-eslint"
	],
	"settings": {
		"paths": ["src"],
		"react": {
			"pragma": "React",	// Pragma to use, default to "React"
			"version": "17" // React version, default to the latest React stable release
		},
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			// webpack: {
			// 	config: path.join(__dirname, 'build/webpack/client.dev.config.ts'),
			// 	extensions: [".js", ".jsx", ".ts", ".tsx"],
			// 	env: {
			// 		"TS_NODE_PROJECT": "\"./tsconfig-for-webpack-config.json\""
			// 	}
			// },
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				moduleDirectory: ['node_modules', 'src/']
			}
		}
	},
	"rules": {
		"react/jsx-uses-react": 2,
		"react/jsx-uses-vars": 2,
		"react/require-render-return": 2,
		"react/self-closing-comp": 2,
		"react/jsx-boolean-value": 0,
		"react/jsx-equals-spacing": 1,
		"react/jsx-key": 2,
		"react/jsx-no-comment-textnodes": 1,
		"react/jsx-no-duplicate-props": 2,
		"react/jsx-no-undef": 2,
		"react/jsx-pascal-case": 1,
		"generator-star-spacing": 1,
		"babel/new-cap": 0,
		"array-bracket-spacing": 1,
		"babel/object-curly-spacing": 1,
		"babel/object-shorthand": 0,
		"babel/arrow-parens": 0,
		"no-await-in-loop": 0,
		"comma-dangle": 2,
		"no-unused-vars": [2, {"args": "none", "varsIgnorePattern": "React", "ignoreRestSiblings": true}],
		"no-useless-escape": 0,
		"no-control-regex": 0,
		"no-mixed-spaces-and-tabs": 2,
		"require-atomic-updates": 0,
		"no-prototype-builtins": 0,
		"import/no-named-as-default": 0,
		"import/no-named-as-default-member": 0,
		"no-irregular-whitespace": 0,
		"no-console": [1, {"allow": ["warn", "error"]}],
		"curly": [2, "all"],
		"brace-style": [2, "1tbs", {"allowSingleLine": true}],
		"react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
		"react-hooks/exhaustive-deps": "warn" // Проверяем зависимости эффекта
	},
	"extends": [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript"
	],
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"es2017": true
	},
	"globals": {
		"__SERVER__": true,
		"__CLIENT__": true,
		"__DEV__": true,
		"__PROD__": true,
		"__webpack_require__": true,
		"Promise": true,
		"Symbol": true,
		"Set": true,
		"Map": true,
		"Uint8Array": true
	}
};