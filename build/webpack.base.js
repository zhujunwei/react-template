const path = require('path');
const webpackMerge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const { getCss, getLess, getExternalsMap, getPublicPath } = require('./utils');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appConfig = require('../app.config');

module.exports = (env) => {
    const modeConfig = !!env.development ? devConfig : prodConfig;

    const baseConfig = {
        entry: {
            main: path.resolve(__dirname, '../src/index.ts'),
        },
        output: {
            filename: '[name].[hash:8].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: getPublicPath(),
        },
        resolve: {
            alias: {
                src: path.resolve(__dirname, '../src'),
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        externals: getExternalsMap(),
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true, //只转译，不检查
                                getCustomTransformers: () => ({
                                    //获取或者说定义自定义的转换器
                                    before: [
                                        tsImportPluginFactory({
                                            libraryName: 'antd', //对哪个模块进行按需加载
                                            libraryDirectory: 'es', //按需加载的模块，如果实现按需加载，必须是ES Modules
                                            style: 'css', //自动引入它对应的CSS
                                        }),
                                    ],
                                }),
                                compilerOptions: {
                                    module: 'es2015',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: getLess(env),
                },
                {
                    test: /\.css$/,
                    use: getCss(env),
                },

                {
                    test: /\.(jpg|png|gif|svg|jpeg)$/,
                    exclude: /node_modules/,
                    use: ['url-loader'],
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    exclude: /node_modules/,
                    use: ['file-loader'],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../template/index.html'),
                favicon: appConfig.favicon,
                title: appConfig.appName,
                minify: {
                    removeComments: !env.development,
                    collapseWhitespace: !env.development,
                    removeRedundantAttributes: !env.development,
                    useShortDoctype: !env.development,
                    removeEmptyAttributes: !env.development,
                    removeStyleLinkTypeAttributes: !env.development,
                    keepClosingSlash: !env.development,
                    minifyJS: !env.development,
                    minifyCSS: !env.development,
                    minifyURLs: !env.development,
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
            !!env.development
                ? false
                : new MiniCssExtractPlugin({
                      filename: '[name].[contenthash].css',
                  }),
        ].filter((item) => !!item),
    };

    return webpackMerge(baseConfig, modeConfig, appConfig.webpackConfig);
};
