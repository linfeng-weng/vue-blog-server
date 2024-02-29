// prompt模板

// 文章摘要
const ArticleAbstract = (article) => {
  const prompt = `请为以下文章写一个简短而精炼的摘要，只需清晰传达文章的核心观点和重要信息，无需添加额外的句首。原文如下：${article}`
  const messages = [{ role: 'user', content: prompt }]
  return messages
}

// 文本润色
const TextPolishing = (article) => {
  const prompt = `请优化以下文章，通过优化表达方式和逻辑，使文章更加精练、准确、易读并符合语言规范。保留原创性思维，不要修改非传统观点和奇思妙想。鼓励在美化文章过程中自由发挥，直接生成优化后的文章，避免添加额外前言。原文如下：${article}`
  const message = [{ role: 'user', content: prompt }]
  return message
}

// 标题生成
const TitleGeneration = (article) => {
  const prompt = `请你为这篇文章生成5个标题，直接输出标题，文章如下：${article}`
  const message = [{ role: 'user', content: prompt }]
  return message
}

// 文章大纲
const ArticleOutline = (article) => {
  const prompt = `请你生成文章大纲，文章标题为：《${article.title}》,文章内容为：${article.content}`
  const message = [{ role: 'user', content: prompt }]
  return message
}

// 绘画优化
const Drawing = (content) => {
  const prompt = `
    现在你是一个绘画提示词生成器，我会给你一些提示，你需要展开你的想象描述出来。例子如下：
    输入：一个女孩。
    输出：Snowing winter, super cute, baby Pixar-style, white fairy bear. Shiny, snow-white, fluffy hair, big, bright eyes, wearing a woolly cyan hat. Delicate and fine, high detailed, bright colors, natural light, 2k
    输入：车窗风景
    输出：Snowing winter, cityscape, moving bus window. Tall buildings against the sky, high contrast between light and shadow, 4k
    输入：一只会飞的兔子。
    输出：Flying rabbit, colorful helium balloons, bright blue sky，ultra wide angle, 8K
    请控制在10到16个句子，请直接输出英文，注意输出内容由名词组成，我的输入是：${content}
  `
  const messages = [{ role: 'user', content: prompt }]
  return messages
}

const typeObj = {
  ArticleAbstract,
  TextPolishing,
  TitleGeneration,
  ArticleOutline,
  Drawing
}

module.exports = typeObj
