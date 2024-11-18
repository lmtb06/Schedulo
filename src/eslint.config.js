import htmlPlugin from "@html-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import prettierConfig from "eslint-plugin-prettier/recommended";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";

export default [
    // Configuration de base pour tous les fichiers
    {
        ignores: ["node_modules/", "dist/"],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },

    // Configuration pour les fichiers JavaScript
    {
        files: ["**/*.{js,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2024,
            },
        },
        plugins: {
            import: importPlugin,
            jsdoc: jsdocPlugin,
            n: nodePlugin,
            promise: promisePlugin,
            security: securityPlugin,
        },
        rules: {
            ...jsdocPlugin.configs["flat/recommended"].rules,
            ...nodePlugin.configs["flat/recommended-script"].rules,
            ...importPlugin.configs.recommended.rules,
            ...promisePlugin.configs["flat/recommended"].rules,
            ...securityPlugin.configs.recommended.rules,

            // Règles personnalisées
            "no-unused-vars": "warn",
            "no-console": "warn",
            // 'import/no-unresolved': 'off', // Désactivé temporairement si nécessaire
        },
        // settings: {
        //   'import/resolver': {
        //     node: true,
        //   },
        // },
    },

    // Configuration pour les fichiers HTML
    {
        files: ["**/*.html"],
        ...htmlPlugin.configs["flat/recommended"],
    },

    // Configuration Prettier
    prettierConfig,
];
