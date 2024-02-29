const Feed = require('feed').Feed
const Article = require('../models/Article')
const { RSS_Config } = require('../blog_config')
const fs = require('fs')
const path = require('path')

// 更新rss的方法
const updateRssFeed = async () => {
  try {
    const articles = await Article.find({}).sort({ created_at: -1 }).limit(10)
    const feed = new Feed(RSS_Config)
    articles.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${RSS_Config.id}/article/${post._id}`,
        link: `${RSS_Config.id}/article/${post._id}`,
        description: post.abstract,
        date: new Date(post.created_at)
      })
    })

    const directoryPath = path.join(__dirname, '..', 'RSS')
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }
    const filePath = path.join(directoryPath, 'rss.xml')
    fs.writeFileSync(filePath, feed.rss2())
  } catch (error) {
    console.log(error)
  }
}

module.exports = { updateRssFeed }
