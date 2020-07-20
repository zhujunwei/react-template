const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
function getCss(env) {
    return !env.development
        ? [
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader', //css-loader是处理CSS中的import 和url
                  options: { importLoaders: 1 },
              },
              {
                  loader: 'postcss-loader', //postcss是用来给CSS中根据can i use 网站的数据添加厂商前缀的
                  options: {
                      plugins: [require('autoprefixer')],
                  },
              },
          ]
        : [
              'style-loader',
              {
                  //style-loader是把CSS当作一个style标签插入到HTML中
                  loader: 'css-loader', //css-loader是处理CSS中的import 和url
                  options: { importLoaders: 1 },
              },
              {
                  loader: 'postcss-loader', //postcss是用来给CSS中根据can i use 网站的数据添加厂商前缀的
                  options: {
                      plugins: [require('autoprefixer')],
                  },
              },
          ];
}

function getLess(env) {
    return !env.development
        ? [
              MiniCssExtractPlugin.loader,
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
          ]
        : [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: { importLoaders: 0 },
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
    return '/ebalanceadmin-front/';
}

const externalsMap = {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDOM',
    // 'styled-components': 'styled',
    // moment: 'moment',
    // '../moment': 'moment',
    // axios: 'axios',
    // '@ant-design/icons/lib/dist': 'AntDesignIcons',
    // antd: 'antd',
    // 'antd/dist/antd.min.css': 'antd',
};

module.exports = {
    getCss,
    getLess,
    getPublicPath,
    externalsMap,
};
