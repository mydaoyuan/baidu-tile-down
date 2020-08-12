// WIP js 文件模块尚未开发完全
const fs = require('fs')
const { getModulesUrl } = require('./conf')
const { moudles } = require('./urls')
const { get, slowDown } = require('./utils')

async function start() {
  // await slowDown(urls, url => {
  //   const name = md5(url)
  //   getData(url, name)
  // })
  await slowDown(moudles, async url => {
    await getData(getModulesUrl + url, url)
  })
  console.log('js模块下载完成')
}

async function getData(url, name) {
  const { data } = await get(url)
  wirteJsFile(name, data)
}

function wirteJsFile(name, data) {
  const fileType = '.js'
  const folder = './module/'
  fs.writeFile(folder + name + fileType, data, error => {
    if (error) {
      console.log(error)
    }
  })
}
start()
module.exports = start
