module.exports = {
  ak: '', // 填入申请的ak
  getModulesUrl: 'http://api0.map.bdimg.com/getmodules?v=2.0&t=20140707&mod=', // js模块地址
  startLnglat: [121, 47], // 需要爬取瓦片图的左上角经纬度
  endLnglat: [131, 40], //  需要爬取瓦片图的右上角经纬度
  minz: 10, // 爬取的层级 最小为3
  maxz: 12, // 爬取的层级 最大为19
  tileStyle: `t%3Asubwaystation%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aeducation%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amedical%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ascenicspots%7Ce%3Aall%7Cv%3Aoff%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%2Ct%3Awater%7Ce%3Aall%7Cv%3Aoff%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aairportlabel%7Ce%3Aall%7Cv%3Aon%2Ct%3Abuilding%7Ce%3Aall%7Cv%3Aoff%2Ct%3Abuilding%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ascenicspotslabel%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23010f4fff%2Ct%3Amanmade%7Ce%3Aall%7Cc%3A%230d3988ff%2Ct%3Aroad%7Ce%3Aall%7Cc%3A%230d3988ff%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aoff%2Ct%3Apoi%7Ce%3Al%7Cc%3A%23f3f3f3ff%2Ct%3Apoi%7Ce%3Al.t.s%7Cc%3A%236fa8dcff%2Ct%3Ascenicspotslabel%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aeducationlabel%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amedicallabel%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aadministrative%7Ce%3Al%7Cc%3A%23eeeeeeff%2Ct%3Aadministrative%7Ce%3Al.t.s%7Cc%3A%236fa8dcff%2Ct%3Aadministrative%7Ce%3Al.i%7Cv%3Aoff%2Ct%3Apoi%7Ce%3Al.i%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Al.t.f%7Cc%3A%23f3f3f3ff` // 瓦片图样式配置
}
