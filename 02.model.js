// 引入mongoose
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/class1108_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// 建立Schena约束对象
const stuSchema = new mongoose.Schema({
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
  info: mongoose.SchemaTypes.Mixed, // 混合类型(任意的类型)
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// 创建集合model
const Students = mongoose.model('students', stuSchema);

// 通过集合Model直接操作数据库
/*
  CRUD
    Model.create(文档对象)
    Model.find(查询条件, 投影)--> 返回的是数组, 不管有没有找到数据
    Model.updateOne(查询条件, 更新的内容)
    Model.updateMany(查询条件, 更新的内容)
    Model.deleteOne(查询条件)
    Model.deleteMany(查询条件)
*/

(async function () {
  try {
    // 创建数据
    //#region CRUD
    /* const result = await Students.create({
      name: 'Tom',
      age: 20,
      sex: 1,
      hobby: ['跳舞', '听歌', '打豆豆'],
      info: '我丢'
    }); */
    // 查找数据
    /*  const result = await Students.find({
       age: {
         $gte: 10
       }
     }, {
       name: 1,
       age: 1,
       _id: 0
     }); */
    // 查找一个
    /* const result = await Students.findOne({
      age: {
        $gte: 50
      }
    }) */
    // 判断操作是否找到find数组数据
    // if (result.length > 0) {
    //   console.log('找到');
    // } else {
    //   console.log('没用');
    // }
    //#endregion
    // const result = await Students.find({
    //   name: 'Tom'
    // })
    // 查找到Tom将年龄改为18
    // const result = await Students.update({
    //   name: 'Tom'
    // }, {
    //   $set: {
    //     age: 18
    //   }
    // })
    // 修改所有人的你年龄都减少2岁
    const result = await Students.updateMany({}, {
      $inc: {
        age: -2
      }
    })
    console.log(result);
  } catch (error) {
    console.log('错误', error);
  }
})()