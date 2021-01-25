// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter=require('tcb-router')
const rp=require('request-promise')



cloud.init()
//与音乐相关的数据库都放这里面
// 云函数入口函数
exports.main = async (event, context) => {

  url='https://music.163.com/api/playlist/detail?id='+parseInt(event.playlistId)
  let options = {
    method:"POST",
    url,
    headers: {
     cookie:'MUSIC_U=675fb74408213020288a334790de3971b87f628b7d8fb6ae85721bab949eee9c33a649814e309366; Max-Age=1296000; Expires=Tue 9 Feb 2021 07:24:23 GMT; Path=/'
    },
  }

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

  app.router('musiclist',async(ctx,next)=>{

    ctx.body=await rp(options)
    .then((res)=>{
      return JSON.parse(res)
    })
  })

  return app.serve()
}