# front-end-monitor

## 环境

node.js+php+mysql



## 初始化

- 终端命令：

  ```bash
  $ npm install
  $ node app.js
  ```

- 配置数据库
  1. 修改 web/db/index.js 中的 mysql 配置，包括用户名、用户密码、数据库名字
  2. 在数据库中导入 front_data.sql

- 打开 index.html 可以运行异常监控



## 监测

异常监控，包括:JS异常、接口异常、白屏异常、资源异常等

关键性能数据监控，如:FP、FCP、DOM Ready、DNS等

用户行为数据，如:PV、UV、页面停留时间等

HTTP请求监控，包括:请求链路、成功率、返回信息等

### 异常

#### Js错误

##### 资源加载异常

```javascript
{
    title: document.title, //页面标题

    url: location.href, //页面url

    timestamp: Date.now(), //时间戳

    userAgent: userAgent.parse(navigator.userAgent).name, //访问人

    kind: "stability", // 监控指标的大类，稳定性

    type: "resourceError", // 小类型，这是一个错误

    message: event.message, // 报错信息

    filename: event.target.src||event.target.href, // 哪个文件报错了

    position: `${event.lineno}:${event.colno}`, // 报错的行列位置

    tagName: event.target.tagName,// 报错的标签，要么是link要么是script

    selector: getSelector(event.target), // 代表最后一个操作的元素
}
```

##### 普通JS异常

```js
{
    title: document.title, //页面标题

    url: location.href, //页面url

    timestamp: Date.now(), //时间戳

    userAgent: userAgent.parse(navigator.userAgent).name, //访问人

    kind: "stability", // 监控指标的大类，稳定性

    type: "jsError", // 小类型，这是一个错误

    message: event.message, // 报错信息

    filename: event.filename, // 哪个文件报错了

    position: `${event.lineno}:${event.colno}`, // 报错的行列位置

    stack: getLines(event.error.stack),

    selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后一个操作的元素
}
```

##### promise错误

```javascript
{
  	title: document.title, //页面标题

    	url: location.href, //页面url

    	timestamp: Date.now(), //时间戳

    	userAgent: userAgent.parse(navigator.userAgent).name, //访问人

        kind: "stability", // 监控指标的大类，稳定性

        type: "promiseError", // 小类型，这是一个错误

        message, // 报错信息

        filename, // 哪个文件报错了

        position: `${line}:${column}`, // 报错的行列位置

        stack

        selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后一个操作的元素
}
```

### 白屏异常

```javascript
{
        title: document.title, //页面标题

    	url: location.href, //页面url

    	timestamp: Date.now(), //时间戳

    	userAgent: userAgent.parse(navigator.userAgent).name, //访问人   

        kind: "stability",

        type: "blank",

        emptyPoints: emptyPoints + "",//空点（在屏幕上采样，点的总数不多）

        screen: window.screen.width + "X" + window.screen.height,//屏幕大小

        viewPoint: window.innerWidth + "X" + window.innerHeight,//视口大小

        selector: getSelector(centerElements[0]),// 屏幕中间点的元素
}
```

### 状态

#### pv&uv

```javascript
{
      title: document.title, //页面标题

    	url: location.href, //页面url

    	timestamp: Date.now(), //时间戳

    	userAgent: userAgent.parse(navigator.userAgent).name, //访问人

        kind: "business",

        type: "pv",

        effectiveType: connection.effectiveType, //网络环境
          
        rtt: connection.rtt, //往返时间
          
    		screen: `${window.screen.width}x${window.screen.height}`, //设备分辨率
}
```

#### stayTime

```js
{
      title: document.title, //页面标题

    	url: location.href, //页面url

    	timestamp: Date.now(), //时间戳

    	userAgent: userAgent.parse(navigator.userAgent).name, //访问人

        kind: "business",

        type: "pv",

        stayTime
}
```



### 性能指标

性能指标的单位都是时间ms

#### 加载时间

```javascript
{
				kind: "performance", // 用户体验指标/性能指标
				type: "timing", // 统计每个阶段的时间
				dnsTime: domainLookupEnd - domainLookupStart, // DNS域名解析耗时
				connectTime: connectEnd - connectStart, // TCP连接耗时
				ttfbTime: responseStart - requestStart, // 首字节到达时间,网络请求耗时
				responseTime: responseEnd - responseStart, // response响应耗时
				domTime: domInteractive - responseEnd, // DOM解析耗时
				dclTime: domContentLoadedEventEnd - domContentLoadedEventStart, // DOMContentLoaded事件回调耗时
				domReadyTime: domContentLoadedEventEnd - fetchStart, // DOM阶段渲染耗时
				timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
				loadTime: loadEventEnd - loadEventStart // 完整的加载时间
}
```

#### 绘制性能

```javascript
{
				kind: "performance",
				type: "paint",
				firstPaint: FP ? formatTime(FP.startTime) : 0,
				firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
				firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
				largestContentfulPaint: LCP ? formatTime(LCP.renderTime || LCP.loadTime) : 0
}
```



