module.exports = { // 部署打包時的url
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Nature_store_lastest/'
    : '/',
};
