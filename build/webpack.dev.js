const path = require("path");
const helper = require("./utils");
const host = helper.getLocalIp();

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    host,
    hot: true,
    open: true,
    port: "3006",
    openPage: helper.getPublicPath().slice(1),
    publicPath: helper.getPublicPath(),
    contentBase: path.resolve(__dirname, "../dist"),
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(`^${helper.getPublicPath()}`),
          to: `${helper.getPublicPath()}index.html`,
        },
      ],
    },
  },
};
