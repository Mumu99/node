// students集合模块
const mongoose = require('mongoose');

// 建立Schena约束对象
const teacSchema = new mongoose.Schema({
  // 约束的字段有哪些
  // 字段的类型
  name: {
    type: String,
    required: true, // 必要
    unique: true // 唯一, 不能重复
  }, // 属性的值为String
  age: Number,
  sex: {
    type: Number,
    default: 1
  },
  hoppy: {
    type: [String],
    default: []
  },
  info: mongoose.SchemaTypes.Mixed, // 混合类型(任意的类型)
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// 创建集合model
const Teachers = mongoose.model('teachers', teacSchema);

// 因为外部需要用到Students, 让外部能通过students操作数据库
// 默认暴露
module.exports = Teachers;