const dotenv = require('dotenv')
dotenv.config()

const BLOG = {
  dbURL: process.env.DB_URL || 'mongodb://127.0.0.1/vue-blog', //数据库URL

  port: process.env.PORT || 3000, //端口号

  https: false, //是否开启https服务，需配置https证书

  origin: process.env.ORIGIN || '*', //配置跨域

  adminUsername: process.env.ADMIN_USERNAME || 'admin', // 用户名
  adminPassword: process.env.ADMIN_PASSWORD || 'admin', //密码

  // RSS
  RSS_Config: {
    title: '欲知新',
    description: '欲知新-blog',
    id: 'https://yuzhixin.top',
    link: 'https://yuzhixin.top',
    updated: new Date(),
    author: {
      name: '欲知新',
      email: ''
    }
  },

  // 百度千帆大模型
  BAIDU_API_KEY: process.env.BAIDU_API_KEY || '',
  BAIDU_SECRET_KEY: process.env.BAIDU_SECRET_KEY || '',

  // 获取access_token
  ACCESS_TOKEN_URL: 'https://aip.baidubce.com/oauth/2.0/token',

  // Stable-Diffusion-XL
  SD_XL_URL: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/text2image/sd_xl',
  // Qianfan-Chinese-Llama-2-7B
  QCL_2_7B_URL:
    'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/qianfan_chinese_llama_2_7b',
  // Qianfan-Chinese-Llama-2-13B
  QCL_2_13B_URL:
    'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/qianfan_chinese_llama_2_13b'
}

module.exports = BLOG
