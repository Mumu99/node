/*
  路由 router:
  前端路由:
    key-value的映射关系, key是路由路径, value是组件
  后端路由:
    概念:
      key-value的映射关系, key是路由路径, value是回调
    作用:
      定以请求的地址
      接受、处理请求、返回响应
    组成:
      请求方式:
        GET(查)、POST(增)、PUT(改)、DELETE(删)
      请求路径:
        一对一的关系:
          '/xxx'--> http://localhost:9526/xxx
        一对多的关系:
          带参数的地址: params
          '/product/:id'--> http://localhost:9526/xxx/1
      回调函数(句柄函数):
        (req, res) => {}
        req--> 请求对象: 代表客户端发送给服务端的数据
          get请求
            查询字符串参数(query参数), req.query
            params参数, req.params
          post请求
            请求体参数(body参数) req.body
          token令牌:
            cookie token: xxx
            获取: req.cookies
            作为请求头的字段 Authorization: Bearer token
            获取: req.headers.authorization
        res--> 响应对象: 代表服务端响应给客户端的数据
          res.end()--> 返回响应(英文), 快速的返回响应, 不做处理
          res.send()--> 返回响应(中文), 对响应数据做一些处理, 再返回响应, 会自动处理中文
          res.json()--> 返回响应(对象/数组), 将响应数据, 转换成json的字符串
          res.redirect()--> 返回响应(新的网站), 返回302状态码, 将客户端重新访问
          res.download()--> 返回响应(文件的绝对路径), 客户端会自动下载文件
          res.sendFile()--> 返回响应, 客户端会自动打开文件
          res.status()--> 设置响应状态码
          res.set()--> 设置响应头
          res.cookie()--> 设置cookie
*/
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // end--> 返回英文一般
  // res.end('mumu')

  // 用send方法可以解析中文
  // res.send('成功')

  // 用json方法, 一般写对象和数组
  // res.json({
  //   name: '木木'
  // })

  // 用redirect返回响应, 重定向到另外一个地址
  // res.redirect('http://www.baidu.com')

  // 用download返回响应, 下载文件
  // res.download(__dirname + '/02.router.js')

  // 用sendFile返回响应, 打开文件
  // res.sendFile(__dirname + '/02.router.js')

})

app.get('/product/:id', (req, res) => {
  console.log('params' + req.params); // 获取params参数
  console.log('query' + req.query); // 获取query参数
  console.log('query' + req.body); // 获取body参数--> 默认不解析body

  // 设置为html文本, 并且为utf-8来解析
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.end('成功')
})

app.post('/xxx', (req, res) => {
  // 设置为html文本, 并且为utf-8来解析
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.end('成功')
})

app.put('/xxx', (req, res) => {
  // 设置为html文本, 并且为utf-8来解析
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.end('成功')
})

app.delete('/xxx', (req, res) => {
  // 设置为html文本, 并且为utf-8来解析
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.end('成功')
})
// 监听端口号
app.listen(9526, 'localhost', (err) => {
  if (err) {
    console.log('服务器启动失败', err);
    return;
  }
  console.log('服务器启动成功, 请访问: http://localhost:9526');
})