const { startLnglat, endLnglat, tileStyle, ak, maxz, minz } = require('./conf')
const getImage = require('./downloadImg')
if (!ak) {
  console.log('ak必填，请正确填写后重试')
  return
}
if (!minz) {
  console.log('minz必填，请正确填写后重试')
  return
}
if (!maxz) {
  console.log('maxz必填，请正确填写后重试')
  return
}
getImage()
