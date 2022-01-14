## 服务器运行

1. npm i
2. npm start

## 缓存相关

缓存有两个部分，一个是静态资源缓存，一个是 api 请求缓存。

1. 静态资源缓存

这个主要用于测试协商缓存，修改以下 max-age 值即可，单位为毫秒
```js
// app.js
app.use(static(path.join(__dirname, 'public'), {
  maxage: 15 * 1000
}))
```

同时开启以下两个会添加 etag 或者只开启 conditional 会添加 last-modified
```js
// app.js
app.use(conditional());
app.use(etag());
```

2. api 缓存

服务端设置
```js
// app.js
app.use(async function (ctx) {
  if (ctx.path === '/') {
    await ctx.render('home')
  } else if (ctx.path === '/api') {
    ctx.set('Cache-Control', 'max-age=0') // 这里设置响应头
    ctx.body = {
      id: 1,
      name: 'learn react'
    }
  }
});
```

客户端设置
```js
// public/js/main
fetch('/api', {
  headers: {
    // 'Cache-Control': 'max-age=10'
  }
})
```
