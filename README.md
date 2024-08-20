# journey-to-the-west 西游记

[![](https://img.shields.io/badge/Vue.js-2.6-brightgreen)](https://cn.vuejs.org/index.html)
[![](https://img.shields.io/badge/Vue--CLI-4.5-green)](https://cli.vuejs.org/zh/)
[![](https://img.shields.io/badge/Element--UI-2.15-blue)](https://element.eleme.io/#/zh-CN)
[![](https://img.shields.io/badge/Echarts-5.0-red)](https://echarts.apache.org/zh/index.html)


西游记是一款网页联机式的纸牌类游戏，该项目是西游记的前端部分。后端部分请参考 [https://github.com/shurintou/server-of-jttw](https://github.com/shurintou/server-of-jttw)。

## 开发环境
在开发环境下运行该项目请先安装[node.js](https://nodejs.org/en/)(建议版本>v14.15)。

### 安装依赖
在项目根目录下输入下列指令以安装项目依赖。

```
npm install
```

### 启动项目
打开配置文件`.env.development`，将其中的`SERVER_APP_PORT`和`API_ROOT`的值改为与你的后端配置对应的内容。
然后在项目根目录下输入下列指令以启动项目。
```
npm run serve
```

之后便可以在本地访问到前端项目了，项目会在`本地IP地址 + 端口`(如:http://xxx.xxx.xx.xx:8080)的路径启动，访问该路径可以实现在局域网中与其他设备进行联网对战。

要开启后端项目，[请参考](https://github.com/shurintou/server-of-jttw#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)。

## 生产环境
要在生产环境下部署该项目，首先请根据需求修改配置文件`.env.production`（主要是VUE_APP_API_URL和VUE_APP_WS_URL）。

然后输入以下指令将项目打包。
```
npm run build
```
最后将打包好的`dist`文件夹整个拷贝到后端项目的根目录下，前端部分的部署完成。

后端部分的部署 [请参考](https://github.com/shurintou/server-of-jttw#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)。