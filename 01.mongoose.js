/**
 * 在NodeJS中操作MongoDB---> mongoose
 * 
 * 1. 安装
 *  npm init -y
 *  npm i mongoose
 * 2. 使用mongosse
 */
// 引入
const mongoose = require('mongoose')
// 连接数据库
// mongodb://localhost:27017 服务地址
mongoose.connect('mongodb://localhost:27017/class1108_test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

// 创建Schema对象--> 用来对集合中数据进行类型的约束
const studentsScheama = new mongoose.Schema({
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
  hobby: {
    type: [String],
    default: []
  },
  info: mongoose.SchemaTypes.Mixed // 混合类型(任意的类型)
})

// 创建集合(Model)
/**
 * students-> 集合的名称
 * studentsScheama-> 约束条件
 */
const Student = mongoose.model('students', studentsScheama)
// 创建文档对象(Document)
const stu = new Student({
  name: '猪宝宝2',
  age: 20,
  sex: 0,
  hobby: ['听歌', '吃东西', '玩'],
  info: '我是猪妈妈的宝贝'
  // xxx: '153' // 如果Schema没有此字段, 数据库中  没有这个数据的
})
// 保存
stu.save()
  .then(() => {
      console.log('保存成功')
    },
    (err) => {
      console.log('失败', err)
    }
  )