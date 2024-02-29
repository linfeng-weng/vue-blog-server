const mongoose = require('mongoose')
const BLOG = require('../blog_config')

// 链接数据库
mongoose
  .connect(BLOG.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
  })
  .then((res) => {
    console.log('数据库链接成功')
  })
  .catch((err) => {
    console.error('数据库链接失败', err)
  })

module.exports = mongoose
