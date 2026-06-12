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

    config.module
      .rule("ts")
      .use("babel-loader|lingui-macros")
      .loader("babel-loader")
      .before("ts-loader")
      .options({
        babelrc: false,
        configFile: false,
        presets: ["@babel/preset-react"],
        plugins: ["macros"],
      });

    // Transpile @messageformat/parser for Android V8 compatibility
    // (uses \p{Pat_Syn} / \p{Pat_WS} unicode regex not supported by NS runtime)
    config.module
      .rule("messageformat")
      .test(/node_modules[\\/](@messageformat[\\/]parser)[\\/].*\.js$/)
      .use("babel-loader|messageformat")
      .loader("babel-loader")
      .options({
        babelrc: false,
        configFile: false,
        plugins: ["@babel/plugin-transform-unicode-property-regex"],
      });
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
