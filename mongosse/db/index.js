// 连接mongodb数据库的模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/class1108_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// 判断数据库有没有连接成功
// once--> 一次事件
mongoose.connection.once('open', (err) => {
  if (err) {
    console.log('数据库连接失败', err);
    return;
  }
  console.log('连接数据库成功');
});

// 模块需不需要暴露, 就看模块的内部有没有需要的东西