// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const TcbRouter=require("tcb-router")
const db=cloud.database()
const blogList=db.collection("blog")
// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({event})
  app.router("list",async(ctx,next)=>{
    let blog=await blogList.skip(event.start)
      .limit(event.count)
      .orderBy("date",'desc')   //时间倒序
      .get() 
      .then((res)=>{
        return res
      })
    ctx.body=blog
  })
  return app.serve()
}