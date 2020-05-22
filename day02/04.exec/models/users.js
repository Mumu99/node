// students集合模块
const mongoose = require('mongoose');

// 建立Schena约束对象
const usersSchema = new mongoose.Schema({
  // 约束的字段有哪些
  // 字段的类型
  username: {
    type: String,
    required: true, // 必要
    unique: true // 唯一, 不能重复
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }
});

// 创建集合model
const Uers = mongoose.model('users', usersSchema);

// 因为外部需要用到Students, 让外部能通过students操作数据库
// 默认暴露
module.exports = Uers;