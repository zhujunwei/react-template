const path = require('path');
const helper = require('./helper');
const os = require('os');
const iFaces = os.networkInterfaces();

const getLocalIp = () => {
    let host = '127.0.0.1';

    for (const dev in iFaces) {
        iFaces[dev].forEach(function (details) {
            if (details.family === 'IPv4' && details.address.indexOf('192.168') >= 0) {
                host = details.address;
            }
        });
    }

    return host;
};
const host = getLocalIp();

console.log(helper.getPublicPath());

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host,
        hot: true,
        open: true,
        port: '2233',
        openPage: helper.getPublicPath().slice(1),
        publicPath: helper.getPublicPath(),
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: {
            rewrites: [
                {
                    from: new RegExp(`^${helper.getPublicPath()}`),
                    to: `${helper.getPublicPath()}index.html`,
                },
            ],
        },
        proxy: [
            {
                //要代理的地址 此规则用！取反
                context: [`!${helper.getPublicPath()}**`],
                //要代理的目标 （默认开发环境）
                // target: 'http://trialos.dev.com',
                // target: 'http://192.168.102.26:9228',
                target: 'http://192.168.3.118:9228',

                //是否更改源
                changeOrigin: true,
                //路径重写
                pathRewrite: {
                    '^/$': '',
                },
                //cookie域名重写
                cookieDomainRewrite: host,
            },
        ],
    },
};
