// 引入express
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const secret = 'mWxNkV9MACFbEAgo'
app.get('/', async (req, res) => {
  const {
    username
  } = req.query;
  // 使用jwt派发签名
  jwt.sign({ // 需要加密的数据
    username
  }, secret, { // 参与加密的密钥
    // algorithm: 'RS256', // 加密算法
    expiresIn: '7d' // 过期的时间
  }, function (err, token) {
    if (err) {
      console.log('失败', err);
      res.send('加密失败')
      return
    }
    console.log('加密成功');
    res.send(token)
  })
})

app.get('/verify', (req, res) => {
  const {
    token
  } = req.query;
  // 使用jwt派发签名
  jwt.verify(token, secret, function (err, data) {
    if (err) {
      console.log('失败', err);
      res.send('解密失败')
      return
    }
    console.log('解密成功', data);
    res.send(data)
  })
})
app.listen(9523, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务器启动成功, http://localhost:9523');
})