// prompt模板

// 文章总结
const SummaryArticle = (article) => {
  const prompt = `请为以下文章写一个总结，总结应该简短精炼，能够清晰地传达文章的核心观点和重要信息。要求：只需要你输出总结，不需要输出像“好的，以下为文章总结：”这类话语。文章：${article}`
  const messages = [{ role: 'user', content: prompt }]
  return messages
}

// 绘画优化
const Drawing = (content) => {
  const prompt = `现在你要扮演一个绘画提示词生成器，我会给你一些句子，然后你要展开你的想象描述出来，要求句子精练明确，下面是三个例子：
    输入：一个女孩。
    输出：a close-up photo of a girl’s beautiful long legs, they are natrue except for the black stockings, The skirt is short and flows in the breeze, with vibrant colors and patterns that match the blooming flowers in the background, shot by Vivian Maier, Canon EOS Rebel T7i, Canon EF 50mm f/1.8 STM, bottom view
    输入：车窗风景
    输出：The photo is taken from the window of a moving bus, with the cityscape visible in the background. The buildings are tall and imposing against the sky. The photo is black and white, with a high contrast between the light and shadow, shot by Elad Lassry, Canon EOS Rebel T7i, Canon EF 50mm f/1.8 STM, front view
    输入：一只会飞的兔子。
    输出： An artistic photo of a toy rabbit attached to colorful helium balloons, appearing to float and hover in a bright blue sky. The toy rabbit has a fluffy, light-colored fur, and the vibrant balloons create a playful and whimsical scene against the open sky, shot by Kirsty Mitchell, Nikon Z7 II, Nikkor 50mm f/1.4G, aerial perspective
    记住，每个提示必须在句子最后给出相机的型号和镜头的具体参数，你的输出结果要为英文，不能出现中文，只需要显示输出结果即可，单词总数量不超过150个。我的输入是：${content}
  `
  const messages = [{ role: 'user', content: prompt }]
  return messages
}

const typeObj = {
  SummaryArticle: SummaryArticle, // 文章总结prompt
  Drawing: Drawing //绘画prompt
}

module.exports = typeObj
