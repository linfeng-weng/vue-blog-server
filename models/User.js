const mongoose = require('../config/database')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 16 },
  password: { type: String, required: true },
  avatar: String,
  nickname: { type: String, default: '欲知新' },
  motto: { type: String, default: 'To learn something new' },
  blogLink: { type: String, default: 'http://localhost:2233/' },
  github: { type: String, default: 'https://github.com/linfeng-weng' },
  noticeOn: { type: Boolean, default: false },
  noticeContent: { type: String, default: '' },
  musicOn: { type: Boolean, default: false },
  musicId: { type: Number, default: 3778678 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User
