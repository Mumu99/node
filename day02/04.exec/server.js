const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.post('/login', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  // 处理客户端发送的登录请求
  // 收集用户提交的表单数据
  const {
    username,
    password
  } = req.body
  // 判断数据是否存在
  if (!username) {
    res.json({
      code: 201,
      message: '用户名不合法'
    })
    return;
  }
  if (!password) {
    res.json({
      code: 201,
      message: '密码不合法'
    })
    return;
  }
  // 返回响应
  res.json({
    code: 200,
    data: {}
  })
})

app.listen(9527, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务器启动成功, http://localhost:9527');
})