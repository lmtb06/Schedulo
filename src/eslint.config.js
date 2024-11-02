import htmlPlugin from "@html-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import prettierConfig from "eslint-plugin-prettier/recommended";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";

export default [
	jsdocPlugin.configs["flat/recommended"],
	nodePlugin.configs["flat/recommended-script"],
	importPlugin.flatConfigs.recommended,
	promisePlugin.configs["flat/recommended"],
	securityPlugin.configs.recommended,
	{
		// recommended configuration included in the plugin
		...htmlPlugin.configs["flat/recommended"],
		files: ["**/*.html"],
	},
	{
		ignores: ["node_modules/", "dist/"], // Ignore common directories
	},
	{
		files: ["**/*.{js,mjs}"],
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.node, // Node.js globals
				...globals.es2024, // ECMAScript 2024 globals
			},
		},
		rules: {},
	},
	prettierConfig,
];
