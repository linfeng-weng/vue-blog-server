const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const https = require('https')
const BLOG = require('./blog_config')

// 创建express服务器实例
const app = express()
// 处理跨域
app.use(cors({ origin: BLOG.origin }))
// 解析较大的JSON数据
app.use(bodyParser.json({ limit: '5mb' }))
// 解析表单数据的中间件,这个中间件，解析 application/x-www-form-urlencoded 格式的表单
app.use(bodyParser.urlencoded({ extended: true }))
// 将uploads文件夹设置为静态文件夹，可供外部直接访问
app.use(express.static('./uploads'))
app.use(express.static('./RSS'))

// 导入使用处理图片路由模块
const uploadsRouter = require('./routes/uploads')
app.use('/api/uploads', uploadsRouter)
// 导入并使用用户路由模块
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)
// 导入并使用文章路由模块
const articlesRouter = require('./routes/articles')
app.use('/api/articles', articlesRouter)
// 导入并使用分类路由模块
const categoriesRouter = require('./routes/categories')
app.use('/api/categories', categoriesRouter)
// 导入并使用标签路由模块
const tagsRouter = require('./routes/tags')
app.use('/api/tags', tagsRouter)
// 导入并使用百度AI模型路由模块
const baiduAIRouter = require('./routes/baiduAI')
app.use('/api/baidu_ai', baiduAIRouter)
// 导入并使用访问路由模块
const visitsRouter = require('./routes/visits')
app.use('/api/visits', visitsRouter)

// 定义错误级别中间件
app.use((err, req, res, next) => {
  const errorLevels = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  }

  const statusCode = err.status || 500
  const errorLevel = errorLevels[statusCode] || 'Unknown Error'

  console.error(err.stack)

  res.status(statusCode).json({
    error: {
      level: errorLevel,
      message: err.message
    }
  })
})

// 是否为https服务, 启动服务器
if (BLOG.https) {
  const options = {
    key: fs.readFileSync('./SSL/SSL.key'),
    cert: fs.readFileSync('./SSL/SSL.crt')
  }
  const httpsServer = https.createServer(options, app)
  httpsServer.listen(BLOG.port, () => {
    console.log(`httpsServer is running on port ${BLOG.port}`)
  })
} else {
  app.listen(BLOG.port, () => {
    console.log(`Server is running on port ${BLOG.port}`)
  })
}
