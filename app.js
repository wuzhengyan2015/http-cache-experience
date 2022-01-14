const path = require('path')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const static = require('koa-static')
const views = require('koa-views')
const Koa = require('koa')
const app = new Koa()

app.use(conditional());
app.use(etag());
app.use(static(path.join(__dirname, 'public'), {
  maxage: 15 * 1000,
  setHeaders: (res) => {
    // res.setHeader('Pragma', 'no-cache')
  }
}))
app.use(views(path.join(__dirname,'./view'), {
  extension:'ejs'
}))

app.use(async function (ctx) {
  if (ctx.path === '/') {
    await ctx.render('home')
  } else if (ctx.path === '/api') {
    ctx.set('Cache-Control', 'max-age=0')
    ctx.body = {
      id: 1,
      name: 'learn react'
    }
  }
});

app.listen(3000);

console.log('listening on port 3000');
