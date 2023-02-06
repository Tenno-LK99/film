const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // lintOnSave: false, //暂时关闭代码格式检测
  // 反向代理
  // devServer: {
  //   proxy: {
  //     "/ajax": {
  //       target: "https://m.maoyan.com",
  //       changeOrigin: true,
  //     },
  // '/kerwin': {
  // target:'https://m.maoyan.com',
  // changeOrigin: true,
  // pathRewrite: {
  // '^/kerwin': ''
  // }
  // }
  //   },
  // },
});
