const jwt = require('jsonwebtoken')
const BLOG = require('../blog_config')
const { adminUsername, adminPassword } = BLOG

// 登录
const login = (req, res) => {
    try {
        const { username, password } = req.body
        if(username === adminUsername && password === adminPassword) {
            const token = jwt.sign({ username: username }, '@vue-blog*', {
                expiresIn: '24h',   //有效期
                algorithm: 'HS256'  //加密算法
            })
            return res.status(200).json({ token, username, message: '登录成功' })
        }else {
            res.status(400).json({message: '用户名或密码不正确'})
        }
    } catch (error) {
        res.status(500).json({message: '登录失败', error: error.message})
    }
}


module.exports = { login }