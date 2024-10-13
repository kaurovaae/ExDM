module.exports = {
	extends: ['stylelint-config-standard'],
	rules: {
		'declaration-empty-line-before': 'never',
		'declaration-block-no-duplicate-properties': true,
		'no-invalid-double-slash-comments': null,
		'no-descending-specificity': null,
		'selector-class-pattern': null,
		'selector-id-pattern': null,
		'custom-media-pattern': null,
		'custom-property-pattern': null,
		'keyframes-name-pattern': null,
		'font-family-name-quotes': null,
		'color-function-notation': null,
		'alpha-value-notation': null,
		'at-rule-no-unknown':[
			true,
			{
				ignoreAtRules: ['mixin', 'define-mixin']
			}
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global', 'export', 'import', 'local'],
			}
		]
	},
	ignoreFiles: []
}
