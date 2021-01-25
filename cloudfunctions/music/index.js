// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter=require('tcb-router')
cloud.init()
//与音乐相关的数据库都放这里面
// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({event})
  app.router('playlist',async(ctx,next)=>{
    ctx.body=await cloud.database().collection('playlist')  //ctx.body后面就是要返回的
    .skip(event.start).limit(event.count)
    .orderBy("creatTime",'desc')
    .get()
    .then((res)=>{
      return res
    })
  })
  return app.serve()
}