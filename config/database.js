// 引入模块
const mongoose = require('mongoose')

// 链接数据库
// mongodb://数据库ip地址:端口号( 默认端口27017可以省略 )/数据库名
// vue-blog 是数据库名，没有就创建
mongoose
  .connect('mongodb://127.0.0.1/vue-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => {
    console.log('数据库链接成功')
  })
  .catch((err) => {
    console.error('数据库链接失败', err)
  })

module.exports = mongoose
