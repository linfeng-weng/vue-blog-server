const BLOG = {
    port: process.env.PORT || 3000, //端口号

    adminUsername : process.env.ADMIN_USERNAME || 'admin',  // 用户名
    adminPassword : process.env.ADMIN_PASSWORD || 'admin',   //密码

    articleLimit: 4, // 预览博客数量
}

module.exports = BLOG