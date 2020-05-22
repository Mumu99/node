// 引入express
const express = require('express')
// 引入path
const path = require('path')
// 引入mds
const md5 = require('md5')
// 引入jwt
const jwt = require('jsonwebtoken');
// 引入连接数据库模块
require('./db')
// 引入User集合
const Users = require('./models/users')
// 创建app
const app = express()

// axios返回的默认为json格式
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "public")));
app.post('/login', async (req, res, next) => { // 处理客户端发送的登录请求
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
  const result = await Users.findOne({
    username
  }, {
    username: 1,
    password: 1
  })
  if (!result) {
    res.json({
      code: 204,
      message: '用户名不存在'
    })
    return;
  }
  // 判断密码是否正确
  if (result.password !== md5(password)) {
    res.json({
      code: 204,
      message: '密码不正确'
    })
    return;
  }
  // 返回响应
  res.json({
    code: 200,
    data: {
      id: result._id
    }
  })
})
app.post('/register', async (req, res, next) => {
  // 处理客户端发送的登录请求
  // 收集用户提交的表单数据
  const {
    username,
    password,
    phone
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
  if (!phone) {
    res.json({
      code: 201,
      message: '手机号不合法'
    })
    return;
  }
  try {
    // 检测用户是否已经存在
    const result = await Users.findOne({
      $or: [{
        username
      }, {
        phone
      }]
    }, {
      username: 1,
      phone: 1,
      _id: 0
    })
    if (result) {
      const name = username === result.username ? '用户名' : '手机号'
      // 手机号或者用户名呗=被注册
      res.json({
        code: 202,
        message: `${name}已被注册, 请重新输入`
      })
      return;
    }
    // 将用户的数据, 存入到数据库中
    const user = await Users.create({
      username,
      password: md5(password),
      phone
    })
    // 返回成功响应
    res.json({
      code: 200,
      data: user
    })

  } catch (error) {
    res.json({
      code: 204,
      message: '发送未知故障, 请联系管理员'
    })
  }
})
app.listen(9527, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务器启动成功, http://localhost:9527');
})