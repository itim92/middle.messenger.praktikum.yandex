// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Yandex.Practicum chat",
            template: path.resolve(__dirname, "index.html"),
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        clean: true,
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        alias: { "@": path.resolve(path.dirname("./"), "src") },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                    },
                ],
            },
            {
                test: /\.tpl$/,
                use: [
                    {
                        loader: path.resolve(
                            "packages/templator-loader/loader.js"
                        ),
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(
                        path.dirname("./"),
                        "tsconfig.json"
                    ),
                },
                exclude: /(node_modules)/,
            },
        ],
    },
};
