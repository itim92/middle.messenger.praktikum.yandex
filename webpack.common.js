// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
        extensions: [".ts", ".tsx", ".js"],
        alias: { "@": path.resolve(path.dirname("./"), "src") },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
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
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                    {
                        loader: path.resolve(
                            "packages/templator-loader/loader.js"
                        ),
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: ["style-loader", "css-loader", "less-loader"],
            },
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
