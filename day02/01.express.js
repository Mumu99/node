// 引入express
const express = require('express');

// 创建App应用对象, 保存express框架的核心功能
const app = express();

// 定以处理请求的功能
// 处理get请求
app.get('/', (request, response) => {
  // 函数体
  console.log('AAA');
  response.end('AAA')
})
app.get('/a', (request, response) => {
  // 函数体
  console.log('AAA');
  response.end('aa222')
})
// 处理post请求
app.post('/b', (request, response) => {
  // 函数体
  console.log('BBB');
  response.end('BBB')
})

// 监听端口号, 启动服务
app.listen(9527, 'localhost', (err) => {
  if (err) {
    console.log('服务器启动失败', err);
    return;
  }
  console.log('服务器启动成功,--> 请访问: http://localhost:9527');
})