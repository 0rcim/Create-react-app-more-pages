const { resolveAppModule , resolveApp } = require("./paths");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { readdirSync , statSync } = require("fs");

let page_names = readdirSync(resolveApp("src"))
  // 排除非目录项
  .filter(name => statSync(resolveApp(`src/${name}`)).isDirectory())
  // 排除目录下不含app.js(x)和src/assets/目录下不含{name}.html项
  .filter(name => {
    let files = readdirSync(resolveApp(`src/${name}`));
    let assets_files = readdirSync(resolveApp(`src/assets/`));
    return files.some(i => /^app.jsx?$/.test(i)) && assets_files.includes(`${name}.html`);
  }
);

// 入口配置
exports.entries = (webpackEnv) => {
  let entryObj = {};
  let isEnvDevelopment = webpackEnv === "development";
  page_names.forEach(name => {
    entryObj[name] = [
      isEnvDevelopment && // 热加载工具
        require.resolve('react-dev-utils/webpackHotDevClient'),
      // 打包入口js(x)
      resolveAppModule(`src/${name}/app`),
    ].filter(Boolean);
  });
  return entryObj;
}

// 打包的html文件
exports.htmlPlugin = (webpackEnv) => page_names.map(name => 
  new HtmlWebpackPlugin(Object.assign(
    {},
    {
      inject: true,
      // 模板html
      template: resolveApp(`src/assets/${name}.html`),
      filename: `${name}.html`,
      // 指向打包入口名
      chunks: [name]
    },
    webpackEnv === "production"
      ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      : undefined
  ))
);

// webpackDevServer.config: historyApiFallback.rewrites
exports.rewrites = page_names.map(name => 
  ({
    from: new RegExp(`^\/${name}$`),
    to: `/${name}.html`
  })
);