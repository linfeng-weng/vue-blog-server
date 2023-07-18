const jwt = require('jsonwebtoken')
const BLOG = require('../blog_config')
const { adminUsername } = BLOG


function authenticateToken(req, res, next) {
  const token = (req.headers.authorization || '').slice(7) // 获取请求头中的 token

  if (!token) {
    return res.status(401).json({ message: '缺少 token' })
  }

  try {
    const decoded = jwt.verify(token, '@vue-blog*', 'HS256') // 验证 token 是否有效
    const username = decoded.username // 从解码后的数据中获取用户名

    if (username === adminUsername) {
      req.user = username // 将用户名存储在请求对象中，以便后续处理
      next() // 继续处理请求
    } else {
      return res.status(401).json({ message: '无效的 token' })
    }
  } catch (error) {
    return res.status(401).json({ message: '无效的 token' })
  }
}

module.exports = authenticateToken
