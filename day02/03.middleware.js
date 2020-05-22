const express = require('express')

const app = express();

/*
  中间件 middleware
  概念:
    本质就是一个函数, 中间件函数
  作用:
    执行任何代码
    修改req和res对象
    处理请求, 返回响应
    调用栈中的下一个中间件(调用下一个中间件函数)
  组成:
    (req, res, next) => {}    
    req 请求对象
    res 响应对象
    next 调用下一个中间件函数的方法
  默认清空下:
    中间件只能执行一个
  next方法一般都反正最后
  在内部调用next方法, 就会执行多个
  路由和中间件执行顺序:
    服务器接受到请求, 会从前到后, 从上到下, 依次遍历所有路由和中间件
    默认情况下, 只会执行一个匹配上的路由/中间件函数, 匹配上哪一个就看谁在前面 
*/

//#region 执行顺序
// 中间件
// 能够接受所有类型的请求
/* app.use((req, res, next) => {
  console.log(111);
  console.log(222);
  next(); // 调用下一个中间件
});

app.use((req, res, next) => {
  console.log(333);
  console.log(444);
  next(); // 调用下一个中间件
});
app.use((req, res, next) => {
  console.log(555);
  res.send('服务器响应')
}); */
//#endregion

// 路由的执行必须满足两个条件, 请求方式和请求路径一致
app.use((req, res, next) => {
  console.log(111);
  next();
  res.send('完')
});
app.get('/', (req, res, next) => {
  console.log(222);
  next(); // 调用下一个中间件
});
// 中间件, 一旦匹配上就能执行
app.use((req, res, next) => {
  console.log(333);
});

// 监听端口号
app.listen(9526, 'localhost', (err) => {
  if (err) {
    console.log('服务器启动失败', err);
    return;
  }
  console.log('服务器启动成功, 请访问: http://localhost:9526');
})