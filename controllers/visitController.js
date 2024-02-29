const Visit = require('../models/Visit')

// 新增访问量
const recordVisit = async (req, res) => {
  try {
    const clientIp = req.socket.remoteAddress
    console.log('Client IP:', clientIp)

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const searchObj = { month: currentMonth, year: currentYear }
    const visitRes = await Visit.findOne(searchObj)

    if (!visitRes) {
      await Visit.create(searchObj)
      return res.status(201).json({ code: 0, message: 'success' })
    } else {
      await Visit.findOneAndUpdate(searchObj, { $inc: { visits: 1 } }, { new: true })
      return res.status(201).json({ code: 0, message: 'success' })
    }
  } catch (error) {
    res.status(500).json({ message: 'fail', error: error.message })
  }
}

// 获取访问量
const getVisit = async (req, res) => {
  try {
    // 总访问量
    const aggregateRes = await Visit.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$visits' }
        }
      }
    ])
    const totalVisit = aggregateRes[0].total
    // 获取year的访问量
    const visit = await Visit.find(req.query)
    res.status(200).json({ code: 0, total: totalVisit, visit, message: 'success' })
  } catch (error) {
    res.status(500).json({ message: 'fail', error: error.message })
  }
}

module.exports = {
  recordVisit,
  getVisit
}
