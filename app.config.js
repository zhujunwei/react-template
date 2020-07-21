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

const publicPath = '/ebalanceadmin-front/';
const webpackConfig = {
    devServer: {
        proxy: [
            {
                //要代理的地址 此规则用！取反
                context: [`!${publicPath}**`],
                //要代理的目标 （默认开发环境）
                target: 'http://192.168.3.118:9228',
                //是否更改源
                changeOrigin: true,
                //路径重写
                pathRewrite: {
                    '^/$': '',
                },
                //cookie域名重写
                cookieDomainRewrite: getLocalIp(),
            },
        ],
    },
};

module.exports = {
    appName: '',
    publicPath,
    externals: {},
    favicon: '', //路径
    webpackConfig,
};
