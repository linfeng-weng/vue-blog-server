const BLOG = {
  port: process.env.PORT || 3000, //端口号

  adminUsername: process.env.ADMIN_USERNAME || 'admin', // 用户名
  adminPassword: process.env.ADMIN_PASSWORD || 'admin', //密码

  articleLimit: 4, // 预览博客数量

  // 百度千帆大模型
  API_KEY: 'OQsvkku2sdej4zoNDzU4M6Wr',
  SECRET_KEY: 'O4dv8GpywbMS6RE8Y6Dd5V2hesiU5GCP',
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
