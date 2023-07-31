// 导入处理文件上传中间件
const multer = require('multer')
const path = require('path')
const fs = require("fs")

// 配置 multer 存储引擎
const storage = multer.diskStorage({
  // 设置上传文件的存储目录
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/images')
    
    // 判断是否有该文件夹，没有就创建
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath,{ recursive: true })
    }

    cb(null, 'uploads/images')
  },
  // 设置上传文件的文件名
  filename: (req, file, cb) => {
    // 获取原始文件名的扩展名
    const ext = path.extname(file.originalname)
    // 使用当前时间戳_随机数和原始文件扩展名创建一个新文件名
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`
    // 将新文件名返回给 multer
    cb(null, fileName)
  }
});

// 使用配置好的存储引擎初始化 multer，并设置其只接受名为 "file" 的单个文件
const uploadMiddleware = multer({ storage }).single('file')

module.exports = uploadMiddleware