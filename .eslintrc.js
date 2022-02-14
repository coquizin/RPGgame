module.exports = {
	root: true,
	env: {
		"browser": true,
		"node": true
	},
	plugins: [
		'unicorn'
	],
	extends: [
		'eslint:recommended',
		'plugin:unicorn/recommended',
	],
	rules: {
		"unicorn/filename-case": `off`,
		'no-mixed-operators': `error`,
    'no-unneeded-ternary': `error`,
    'no-nested-ternary': `off`,
    'no-use-before-define': [`off`],
    'no-restricted-syntax': [`off`],
		'import/prefer-default-export': `off`
	}
}