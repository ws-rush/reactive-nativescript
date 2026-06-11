const webpack = require("@nativescript/webpack");
const {
  getPlatformName,
} = require("@nativescript/webpack/dist/helpers/platform");
module.exports = (env) => {
  webpack.init(env);
  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  // webpack.useConfig("typescript");
  // const config = solid(webpack.resolveChainableConfig(), env);
  webpack.useConfig("react");
  webpack.chainWebpack((config) => {
    config.resolve.alias.set("react-dom", "react-dom");
  });
  return webpack.resolveConfig();
};

/**
 *
 * @param {import('webpack-chain')} config
 * @param {*} env
 * @returns
 */
function solid(config, env) {
  // const platform = getPlatformName();
  // const mode = env.production ? "production" : "development";
  // const production = mode === "production";

  // config.resolve.extensions.prepend(".tsx").prepend(`.${platform}.tsx`);

  // config.module.rules.delete("ts").end();

  // config.module
  //   .rule("bundle-source")
  //   .test(/\.(t|j)sx?$/)
  //   .exclude.add(/node_modules/)
  //   .end()
  //   .use("babel-loader")
  //   .loader("babel-loader")
  //   .options({
  //     babelrc: false,
  //     configFile: false,
  //     presets: ["@babel/preset-react"],
  //   });

  return config;
}
