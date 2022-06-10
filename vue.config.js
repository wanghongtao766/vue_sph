const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 配置代理服务器
  devServer: {
    proxy: {
      api: {  // 匹配所有以api开头的请求路径
        target: 'http://gmall-h5-api.atguigu.cn'  // 代理目标的基础路径
      }
    }
  },
  // 删除打包后的 .map文件
  productionSourceMap: false

})
