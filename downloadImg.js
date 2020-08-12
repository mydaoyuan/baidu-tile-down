// 根据地理位置下载瓦片图
const fs = require('fs')
const path = require('path')
const {
  transfLngLat,
  getImage: getImageAjax,
  slowDown,
  getRandomNumPending
} = require('./utils')
const { startLnglat, endLnglat, tileStyle, ak, minz, maxz } = require('./conf')
const dirExistsCache = {}
const errorTaskList = []
// 最大的错误任务重试次数
const errorRunMaxCount = 5
const minZlevel = 3
const maxZlevel = 19

async function index() {
  // 过多task会爆内存使用流式处理
  if (maxz > 12) {
    getImageByOneByOne()
  } else {
    getImage()
  }
}

// 下载图片
async function getImage() {
  const taskList = []
  for (let task of generateTask()) {
    taskList.push(task)
  }
  downImageByTask(taskList)
}

async function getImageByOneByOne() {
  let i = 0
  for (let task of generateTask()) {
    await storeImgToLocal(++i, task)
    getRandomNumPending(100)
  }
  checkErrorTask()
}

function* generateTask() {
  for (let z = Math.max(minz, minZlevel); z <= Math.min(maxz, maxZlevel); z++) {
    const [xpoint, ypoint] = transfLngLat(startLnglat, endLnglat, z)
    const { tileX, tileY } = xpoint
    const { tileX: endTilex, tileY: endTiley } = ypoint
    for (let x = tileX; x <= endTilex; x++) {
      for (let y = tileY; endTiley <= y; y--) {
        const task = { x, y, z }
        yield task
      }
    }
  }
}

async function downImageByTask(taskList, errorRunCount = 0) {
  if (errorRunCount > errorRunMaxCount) {
    // 把错误任务转成文件保存
    console.log('超过最大长度')
    return
  }
  console.log('任务总长度', taskList.length)
  await slowDown(taskList, async (task, index) => {
    console.log(`下载${index}`)
    await storeImgToLocal(index, task)
  })

  console.error('遍历数据完成')
  checkErrorTask()
}

function checkErrorTask() {
  if (errorTaskList.length) {
    errorRunCount = errorRunCount + 1
    const newTaskList = errorTaskList.slice(0)
    errorTaskList.length = 0
    console.log('开始遍历错误图片，长度为', errorTaskList.length)
    downImageByTask(newTaskList, errorRunCount)
  }
}
async function storeImgToLocal(i, task) {
  const url = getUrl(task)
  try {
    const { data } = await getImageAjax(url)
    const { x, y, z } = task
    // 检查文件夹是否已经创建
    checkDirSync(task)
    data.pipe(fs.createWriteStream(`./imgs/${z}/${x}/${y}.png`))
    console.log(i + ' 下载完成~')
  } catch (error) {
    console.log(i + '任务出错')
    errorTaskList.push(task)
  }
}
// js请求代码里面写了这样的格式，为了匹配
function checkDirSync({ z, x }) {
  if (!dirExistsCache[`${z}|${x}`]) {
    const filePath = path.resolve(__dirname, `imgs/${z}/${x}`)
    fs.mkdirSync(filePath, { recursive: true })
    dirExistsCache[`${z}|${x}`] = true
  }
}

// 获取下载URL地址
function getUrl({ x, y, z }) {
  let style = ''
  if (tileStyle) {
    style = `&styles=${tileStyle}`
  }
  return `http://api0.map.bdimg.com/customimage/tile?&x=${x}&y=${y}&z=${z}&udt=20180628&scale=2&ak=${ak}${style}`
}

module.exports = index
