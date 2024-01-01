module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint','formatjs'],
	"settings": {
		"additionalFunctionNames" : ["t"]
	},
	ignorePatterns: ['*.cjs'],
	rules:{
		"formatjs/enforce-id": [
			"error",
			{
				"idInterpolationPattern": "[sha512:contenthash:base64:6]"
			}
		],
		"formatjs/enforce-description": ["error", "literal"],
		"formatjs/enforce-default-message": ["error", "literal"],
		"formatjs/enforce-placeholders": ["error"],
	}
};