// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter=require("tcb-router")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {     
  const app=new TcbRouter({event})
  //这个是适用所有路由的
  app.use(async(ctx,next)=>{
    ctx.data={},
    ctx.data.userInfo=event  //我们要知道 云函数入口函数里面的event里面有个人信息
    await next()
  })
  //这是只适用于music的
  app.router('music',async(ctx,next)=>{
    ctx.data.musicName="数鸭子",
    await next()
  },async(ctx,next)=>{       //musicName得到数据以后执行下面的
    ctx.data.musicType="儿歌" 
  //这时候可以返回数据了
    // ctx.body 返回数据到小程序端
    ctx.body={
      data:ctx.data
    }
  })

  //这是只适用于movie的
  app.router('movie',async(ctx,next)=>{
    ctx.data.movieName="千与千寻",
    await next()
  },async(ctx,next)=>{       //movieName得到数据以后执行下面的
    ctx.data.movieType="儿歌" 
  //这时候可以返回数据了
    ctx.body={
      data:ctx.data
    }
  })

  //最后千万别忘了 return app.serve();
  return app.serve();
}