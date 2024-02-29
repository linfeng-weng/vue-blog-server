const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const BLOG = require('../blog_config')
const { adminUsername, adminPassword } = BLOG
const User = require('../models/User')
const fs = require('fs')
const path = require('path')

// 判断token是否过期
const judgeToken = (req, res) => {
  res.status(200).json({ code: 0, message: '验证成功' })
}

// 登录公共方法
const handleSuccessfulLogin = (res, userinfo) => {
  const plainUserinfo = userinfo.toObject({ getters: true })
  const { password, ...newUserinfo } = plainUserinfo
  const username = newUserinfo.username
  const token = jwt.sign({ username }, '@vue-blog*', {
    expiresIn: '24h', //有效期
    algorithm: 'HS256' //加密算法
  })
  res.status(200).json({ code: 0, token, data: newUserinfo, message: '登录成功' })
}

// 登录
const login = async (req, res) => {
  try {
    const { username, password } = req.body
    // 初始化，判断数据库用户表是否有值
    const userinfo = await User.findOne({ username })

    // 用户表为空
    if (!userinfo) {
      if (username === adminUsername && password === adminPassword) {
        // 对密码加密保存数据库
        const passwordBcrypt = await bcrypt.hash(password, 10)
        const userinfo = await User.create({ username, password: passwordBcrypt })
        return handleSuccessfulLogin(res, userinfo)
      } else {
        return res.status(400).json({ message: '用户名或密码不正确' })
      }
    }

    // 数据库用户表有值,比较账户密码是否一致
    const match = await bcrypt.compare(password, userinfo.password)
    if (!match || !(userinfo.username === username)) {
      return res.status(400).json({ message: '用户名或密码不正确' })
    } else {
      return handleSuccessfulLogin(res, userinfo)
    }
  } catch (error) {
    res.status(500).json({ message: '登录失败', error: error.message })
  }
}

// 修改密码
const changePassword = async (req, res) => {
  try {
    const userinfo = await User.findOne({ username: req.user })
    const match = await bcrypt.compare(req.body.originalPassword, userinfo.password)
    if (!match) {
      res.status(400).json({ message: '密码验证错误' })
    } else {
      const newPassword = await bcrypt.hash(req.body.newPassword, 10)
      await User.findOneAndUpdate({ username: req.user }, { password: newPassword })
      res.status(201).json({ code: 0, message: '密码修改成功' })
    }
  } catch (error) {
    res.status(500).json({ message: '修改失败', error: error.message })
  }
}

// 修改个人信息
const changeUserInfo = async (req, res) => {
  try {
    const { avatar } = req.body

    const oldUserinfo = await User.findOne({ username: req.user })
    const userinfo = await User.findOneAndUpdate(req.user, req.body, {
      projection: { password: 0 },
      new: true
    })

    if (avatar && oldUserinfo.avatar && oldUserinfo.avatar !== avatar) {
      const imagePath = path.join(__dirname, '..', 'uploads', oldUserinfo.avatar)
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
    }

    res.status(200).json({ code: 0, data: userinfo, message: '修改成功' })
  } catch (error) {
    res.status(500).json({ message: '修改失败', error: error.message })
  }
}

// 获取个人信息
const getUserInfo = async (req, res) => {
  try {
    const userinfo = await User.find({}).select('-password')
    res.status(200).json({ code: 0, data: userinfo, message: '获取成功' })
  } catch (error) {
    res.status(500).json({ message: '获取失败', error: error.message })
  }
}

module.exports = { login, judgeToken, changePassword, changeUserInfo, getUserInfo }
