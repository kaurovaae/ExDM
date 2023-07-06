import path                                     from "path";
import {DefinePlugin} 							from "webpack";
import HtmlWebpackPlugin                        from "html-webpack-plugin";
import MiniCssExtractPlugin                     from "mini-css-extract-plugin";
import {MODE, baseConsts}                       from "./webpack.consts";
import db                              			from "../src/api/db";
import api                              		from "../src/api/routers";
import bodyParser                       		from "body-parser";
import favicon									from "serve-favicon";
import express 									from "express";

export function getConfig(isProd: boolean, targets: string[]): unknown {
	const buildConsts = baseConsts(isProd);

	const plugins = [
        new HtmlWebpackPlugin({
            template: "./build/index.html", // Данный html будет использован как шаблон
        }),
		new DefinePlugin(buildConsts),
		new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css", // Формат имени файла
        }),
    ];

    return {
        devtool: isProd ? false : "eval",
        devServer: {
			client: {
				progress: false,
				overlay: false
			},
			static: path.join(__dirname, "../dist/static"),
			compress: true,
			port: 3005,
			// Включает автоматическую перезагрузку страницы при изменениях
			hot: true,
			open: false,
			historyApiFallback: true,
			setupMiddlewares: (middlewares, devServer) => {
				devServer.app.use(bodyParser.json());

				devServer.app.use(favicon(path.join(__dirname, '../static/favicon.ico')));

				devServer.app.use(`/static`, express.static('../static'));

				db.on("error", console.error.bind(console, "MongoDB connection error:"));

				devServer.app.use(`/api`, api);
				return middlewares;
			},
        },
        // Указываем точку входа - главный модуль приложения,
        // в который импортируются все остальные
        entry: "./src/index.tsx",
        mode: isProd ? MODE.PRODUCTION : MODE.DEVELOPMENT,
        module: {
            rules: [
                {
                    // Добавляем загрузчик для html
                    test: /\.(html)$/,
                    use: ["html-loader"],
                },
                {
                    // Добавляем загрузчики стилей
                    test: /\.css$/,
                    use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: false,
							},
						},
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[local]---[hash:base64:5]",
								},
								importLoaders: 1,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										[
											"postcss-custom-media",
										],
										[
											'postcss-discard-comments',
											{
												removeAll: true,
											},
										],
										[
											'postcss-mixins',
										],
										[
											'postcss-preset-env',
											{
												stage: 0,
												features: {
													'nesting-rules': {
														noIsPseudoSelector: true
													},
												},
											}
										]
									]
								}
							},
						},
                    ],
                },
                {
                    // В продакшн режиме изображения размером до 8кб будут инлайниться в код
                    // В режиме разработки все изображения будут помещаться в dist/assets
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
                    type: isProd ? "asset" : "asset/resource",
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    type: "asset/resource",
                },
                {
                    test: /\.jsx?$/,
                    // не обрабатываем файлы из node_modules
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            // Использование кэша для избежания рекомпиляции при каждом запуске
                            cacheDirectory: true,
                            presets: [
                                "@babel/env",
                                "@babel/react",
                            ],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    // не обрабатываем файлы из node_modules
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            // Использование кэша для избежания рекомпиляции при каждом запуске
                            cacheDirectory: true,
                            presets: [
                                "@babel/env",
                                "@babel/react",
                                "@babel/typescript",
                            ],
                        },
                    },
                },
            ],
        },
        output: {
            // Все ассеты будут складываться в dist/assets
            assetModuleFilename: "assets/[hash][ext][query]",
            // Директория, в которой будет размещаться итоговый бандл, папка dist в корне приложения
            path: path.resolve(__dirname, "../../dist"),
        },
        plugins,
        target: ["web", "browserslist:" + targets.join(",")],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                ui: path.resolve(__dirname, "../src/ui"),
                api: path.resolve(__dirname, "../src/api"),
            },
        }
    }
}
