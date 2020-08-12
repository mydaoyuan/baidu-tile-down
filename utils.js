const axios = require('axios')
const TileLnglatTransform = require('tile-lnglat-transform')

// 根据地图平台使用转换类
const TileLnglatTransformBaidu = TileLnglatTransform.TileLnglatTransformBaidu

function transfLngLat(posArr, endPosArr, level) {
  const data = TileLnglatTransformBaidu.lnglatToTile(
    posArr[0],
    posArr[1],
    level
  )
  const data2 = TileLnglatTransformBaidu.lnglatToTile(
    endPosArr[0],
    endPosArr[1],
    level
  )
  return [data, data2]
}

function get(url) {
  return axios.get(url)
}

function getImage(url) {
  return axios.get(url, {
    responseType: 'stream',
    'Content-Type': 'image/png'
  })
}
/**
 *
 * @param {number} baseNum 最大等待时间
 */
function getRandomNumPending(baseNum = 100) {
  return new Promise(reslove => {
    setTimeout(reslove, Math.random() * baseNum)
  })
}

async function slowDown(taskList, downFn) {
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index]
    await downFn(task, index)
    await getRandomNumPending()
  }
}

function reserialize(url) {
  var obj = {}
  if (url.indexOf('?') > -1) {
    var use = url.split('?')[1]
    var keyvalue = use.split('&')
    keyvalue.forEach((a, b) => {
      if (a) {
        obj[a.split('=')[0]] = a.split('=')[1]
      }
    })
  }
  return obj
}

module.exports = {
  get,
  transfLngLat,
  reserialize,
  getImage,
  getRandomNumPending,
  slowDown
}
