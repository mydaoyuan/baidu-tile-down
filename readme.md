## 爬取百度瓦片图

百度离线地图分为 2 块

- 动态下载的 js 模块 （WIP：尚未整理完全）
- 瓦片图

因为项目中用到的图片请求改写成了 x/y/z 的形式获取，所以图片下载的文件路径是 `imgs/z/x/y`的形式保存

因为放大比例过大后，图片数量巨多，会爆内存

`FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory`

所以在层级大于 `12`的时候就不会显示图片总数量，计算出一个就下载一个，流式处理。

### 配置文件

在项目 `conf.js`文件中，可以进行项目的基本配置。配置如下

```javascript
  ak: '', // 填入申请的ak
  getModulesUrl: 'http://api0.map.bdimg.com/getmodules?v=2.0&t=20140707&mod=', // js模块地址，在百度地图sdk源文件中找到
  startLnglat: [number, number], // 需要爬取瓦片图的左上角经纬度
  endLnglat: [number, number], //  需要爬取瓦片图的右上角经纬度
  minz: number, // 爬取的放大层级 最小为3
  maxz: number, // 爬取的放大层级 最大为19
  tileStyle: string // 瓦片图样式配置可以在百度地图sdk里面调制

```

[ak 申请地址](http://lbsyun.baidu.com/apiconsole/key?application=key)

[tileStyle 个性地图](http://lbsyun.baidu.com/index.php?title=open/custom)

### 启动

`npm install` 安装依赖

`npm start` 开始下载任务

记得先填入 配置字段`ak`
