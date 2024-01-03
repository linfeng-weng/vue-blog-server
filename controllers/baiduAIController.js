const axios = require('axios')
const BaiduAccessToken = require('../models/BaiduAccessToken')
const {
  API_KEY,
  SECRET_KEY,
  ACCESS_TOKEN_URL,
  SD_XL_URL,
  QCL_2_7B_URL,
  QCL_2_13B_URL
} = require('../blog_config')
const typeObj = require('../config/prompt')

/* Access_Token */
// 获取access_token存入数据库，token有效期30天
const fetchAccessToken = async () => {
  const accessTokenRes = await axios.post(ACCESS_TOKEN_URL, null, {
    params: {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: SECRET_KEY
    }
  })
  const token = accessTokenRes.data.access_token
  await BaiduAccessToken.create({
    value: token,
    expiredTime: Date.now() + 29 * 86400 * 1000 // 29 days
  })
  return token
}

// 根据是否存在以及是否过期，获取access_token
const getAccessToken = async () => {
  const accessToken = await BaiduAccessToken.findOne({ name: 'access_token' })
  if (!accessToken || Date.now() > accessToken.expiredTime) {
    const token = await fetchAccessToken()
    return token
  } else {
    return accessToken.value
  }
}

/* Qianfan-Chinese-Llama */
const fetch_QCL = async (datas, URL) => {
  const { type, input } = datas
  const messages = typeObj[type](input)
  const token = await getAccessToken()
  const res = await axios.post(URL, { messages }, { params: { access_token: token } })
  return res.data
}

/* Stable-Diffusion-XL: 对输入内容进行优化再生成图片 */
const fetch_SD_XL = async (datas, QF_URL) => {
  const { sampler_index } = datas
  const DrawingPromptData = await fetch_QCL(datas, QF_URL)
  const DrawingPrompt = DrawingPromptData.result

  const token = await getAccessToken()
  const res = await axios.post(
    SD_XL_URL,
    { sampler_index, prompt: DrawingPrompt },
    { params: { access_token: token } }
  )
  return res.data
}

const generatePainting_SD_XL = async (req, res) => {
  try {
    const result = await fetch_SD_XL(req.body, QCL_2_13B_URL)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: '生成失败', error: error.message })
  }
}

// Qianfan-Chinese-Llama-2-7B
const generateResult_QCL_2_7B = async (req, res) => {
  try {
    const result = await fetch_QCL(req.body, QCL_2_7B_URL)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: '生成失败', error: error.message })
  }
}

// Qianfan-Chinese-Llama-2-13B
const generateResult_QCL_2_13B = async (req, res) => {
  try {
    const result = await fetch_QCL(req.body, QCL_2_13B_URL)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: '生成失败', error: error.message })
  }
}

module.exports = {
  generatePainting_SD_XL,
  generateResult_QCL_2_7B,
  generateResult_QCL_2_13B
}
