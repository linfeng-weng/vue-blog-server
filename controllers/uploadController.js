const uploadFile = (req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({ message: '没有上传封面' })
  }

  const coverUrl = `/images/${file.filename}`

  res.status(201).json({ coverUrl, message: '上传封面成功' })
}

module.exports = { uploadFile }
