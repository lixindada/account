module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://47.98.201.115:40001',
        secure: false,
        pathRewrite:{
          '^/api':'/'
        }
      },
      '/testapi': {
        target: 'http://192.168.3.51:39255/',
        secure: false,
        pathRewrite:{
          '^/testapi':'/'
        }
      }
    }
  }
}