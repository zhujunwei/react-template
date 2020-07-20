const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
                terserOptions: {
                    compress: {
                        drop_console: true, //生产环境删除console打印
                    },
                },
            }),
        ],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    minSize: 0,
                    minChunks: 2,
                    chunks: 'initial',
                },
                vendors: {
                    name: 'vendors',
                    chunks: 'initial',
                    test: /node_modules/,
                    priority: 1,
                },
            },
        },
    },
};
