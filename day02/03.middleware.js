const express = require('express')
const path = require('path')
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
  应用:
    应用程序级中间件
    路由器级中间件
    错误处理中间件
    内置中间件:
      express.static('资源目录')--> 提供静态资源，如 HTML 文件、图像等。
      express.json()--> 使用 JSON 负载解析传入请求。类型: application/json
      express.url()--> 编码使用URL 编码的有效负载解析传入请求 application/x-www-form-urlencoded
    第三方中间件
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
//#region 中间件的基本使用
/* app.use((req, res, next) => {
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
}); */
//#endregion
// 解析请求体参数的中间件
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// 暴露所有的资源
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/', (req, res) => {
  console.log('body参数', req.body);
  // { name: '猪宝', age: '20' }
  // { name: '木木', age: 18 }
  res.send('body返回了', req.body)
})
// 监听端口号
app.listen(9526, 'localhost', (err) => {
  if (err) {
    console.log('服务器启动失败', err);
    return;
  }
  console.log('服务器启动成功, 请访问: http://localhost:9526');
})