// 使用mongoose

// 连接数据库
// 引入模块
require('./db'); // 加载db/index.js模块, 执行里面的代码, 连接数据库

// 操作数据库
const Students = require('./models/students');
const Teachers = require('./models/teachers');

// 使用数据库
(async function () {
  try {
    const result = await Teachers.create({
      name: '木木大人',
      age: 15,
      sex: 1,
      hoppy: ['是'],
      info: '555'
    })
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})()