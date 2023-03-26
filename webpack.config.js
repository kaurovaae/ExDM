const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserlist';
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
       filename: '[name].[contenthash].css',
    }),
];

module.exports = {
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    entry: './src/index.js',
    mode,
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.(s[ac]|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                    },
                },
            },
        ],
    },
    output: {
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    target,
}
