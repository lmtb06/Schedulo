import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import rollupResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

import path from "node:path";

const scripts = [
    { input: "pages/calendrier", output: "calendrier" },
    { input: "pages/index", output: "index" },
    { input: "main", output: "main" },
];
const styles = [
    { input: "main", output: "main" },
    { input: "styles", output: "styles" },
    { input: "pages/calendrier", output: "calendrier" },
];
const __dirname = path.resolve();
const __source_dir = path.join(__dirname, "./src");
const __output_dir = path.join(__dirname, "../backend/public");
const plugins = [
    postcss({
        modules: true,
        extract: true,
        config: {
            path: "./postcss.config.cjs",
        },
        minimize: true,
    }),
    rollupResolve({
        browser: true,
        main: true,
        preferBuiltins: true,
    }),
    commonjs(),
    json(),
];

export default [
    ...scripts.map((script) => ({
        input: `${__source_dir}/scripts/${script.input}.js`,
        output: {
            file: `${__output_dir}/scripts/${script.output}.js`,
            format: "es",
        },
        plugins,
    })),
    ...styles.map((style) => ({
        input: `${__source_dir}/styles/${style.input}.css`,
        output: {
            file: `${__output_dir}/styles/${style.output}.css`,
        },
        plugins,
    })),
];
