import path                                     from 'path';
import HtmlWebpackPlugin                        from 'html-webpack-plugin';
import MiniCssExtractPlugin                     from 'mini-css-extract-plugin';
import {MODE}                                   from './webpack.consts';

export function getConfig(isProd: boolean, targets: string[]): unknown {
    const plugins = [
        new HtmlWebpackPlugin({
            template: './build/index.html', // Данный html будет использован как шаблон
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // Формат имени файла
        }),
    ];

    return {
        devtool: isProd ? false : 'eval',
        devServer: {
            // Включает автоматическую перезагрузку страницы при изменениях
            hot: true,
        },
        // Указываем точку входа - главный модуль приложения,
        // в который импортируются все остальные
        entry: './src/index.tsx',
        mode: isProd ? MODE.PRODUCTION : MODE.DEVELOPMENT,
        module: {
            rules: [
                {
                    // Добавляем загрузчик для html
                    test: /\.(html)$/,
                    use: ['html-loader'],
                },
                {
                    // Добавляем загрузчики стилей
                    test: /\.(s[ac]|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    // В продакшн режиме изображения размером до 8кб будут инлайниться в код
                    // В режиме разработки все изображения будут помещаться в dist/assets
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
                    type: isProd ? 'asset' : 'asset/resource',
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.jsx?$/,
                    // не обрабатываем файлы из node_modules
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // Использование кэша для избежания рекомпиляции при каждом запуске
                            cacheDirectory: true,
                            presets: [
                                '@babel/env',
                                '@babel/react',
                            ],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    // не обрабатываем файлы из node_modules
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // Использование кэша для избежания рекомпиляции при каждом запуске
                            cacheDirectory: true,
                            presets: [
                                '@babel/env',
                                '@babel/react',
                                "@babel/typescript",
                            ],
                        },
                    },
                },
            ],
        },
        output: {
            // Все ассеты будут складываться в dist/assets
            assetModuleFilename: 'assets/[hash][ext][query]',
            // Очищает директорию dist перед обновлением бандла
            // Свойство стало доступно с версии 5.20.0, до этого использовался
            // CleanWebpackPlugin
            // комманда в package.json: clean
            clean: true,
            // Директория, в которой будет размещаться итоговый бандл, папка dist в корне приложения
            path: path.resolve(__dirname, '../../dist'),
        },
        plugins,
        target: ['web', "browserslist:" + targets.join(',')],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                ui: path.resolve(__dirname, '../src/ui'),
                api: path.resolve(__dirname, '../src/api'),
            },
        }
    }
}
