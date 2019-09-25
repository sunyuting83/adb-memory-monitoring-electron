## 关于
* ADB监测第三方应用内存使用情况
* 基于Electron + React + Koa2
* 使用Koa2执行adb命令，React负责渲染，echarts渲染图表

![e01.jpg](https://i.loli.net/2019/09/25/AU4IYTBEf5eymCa.jpg)
![e02.jpg](https://i.loli.net/2019/09/25/QrYR9qn73vhzJKi.jpg)
![e03.jpg](https://i.loli.net/2019/09/25/6BFgRyPmZYLOnj3.jpg)

## 依赖
* Electron
* React
* react-router-dom
* react-scrollbar
* koa
* echarts

## 已知问题
* 不会用Webpack所以要先给react打包，在用electron-builder打包build目录
* 打包后文件比较大
* Mac打包失败
* 本人新手，欢迎动打包的大神指教
* 突然杀死或退出正在监测的应用会导致报错，图表会消失，请先暂停再退出

## 计划
* 加入历史记录

## 本地运行及打包
* 安装依赖
```Bash
yarn install
```
* React打包
```Bash
yarn build
```
* 本地运行
```Bash
yarn estart
```
* 打包Electron
```Bash
electron-builder build --win
electron-builder build --linux
```
## 已打包文件下载
[Linux lilfile下载](https://lilfile.com/e2Rk2d)
[Windows lilfile下载](https://lilfile.com/6fBzWi)