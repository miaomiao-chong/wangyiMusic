// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//与音乐相关的数据库都放这里面
// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection('playlist')
  .skip(event.start).limit(event.count)
  .orderBy("creatTime",'desc')
  .get()
  .then((res)=>{
    return res
  })
}