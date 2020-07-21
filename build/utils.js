const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const appConfig = require('../app.config.js');
const os = require('os');
const iFaces = os.networkInterfaces();

function getLocalIp() {
    let host = '127.0.0.1';
    for (const dev in iFaces) {
        iFaces[dev].forEach(function (details) {
            if (details.family === 'IPv4' && details.address.indexOf('192.168') >= 0) {
                host = details.address;
            }
        });
    }
    return host;
}

//解析css
function getCss(env) {
    //loader解析从下往上，从右往左
    return [
        !env.development ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            //style-loader是把CSS当作一个style标签插入到HTML中
            loader: 'css-loader', //css-loader是处理CSS中的import 和url
            options: { importLoaders: 1 }, //@import的资源 需要用下面的postcss-loader
        },
        {
            loader: 'postcss-loader', //postcss是用来给CSS中根据can i use 网站的数据添加厂商前缀的
            options: {
                plugins: [require('autoprefixer')],
            },
        },
    ];
}

//解析less
function getLess(env) {
    return [
        !env.development ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: { importLoaders: 2 },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')],
            },
        },
        'less-loader',
        {
            loader: 'style-resources-loader',
            options: {
                patterns: [path.resolve(__dirname, '../src/assets/css/variables.less')],
            },
        },
    ];
}

function getPublicPath() {
    return appConfig.publicPath || '/';
}

function getExternalsMap() {
    const defaultExternalsMap = {};

    if (typeof appConfig.externals === 'object' && appConfig.externals !== null) {
        try {
            return Object.assign(defaultExternalsMap, appConfig.externals);
        } catch (e) {
            console.log(e);
        }
    }
    return defaultExternalsMap;
}

module.exports = {
    getCss,
    getLess,
    getPublicPath,
    getExternalsMap,
    getLocalIp,
};
