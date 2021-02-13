// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter=require('tcb-router')
const rp=require('request-promise')
cloud.init()
//与音乐相关的数据库都放这里面
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event);
  //歌曲歌单id获取歌单里面的歌曲
  musiclist_url='https://music.163.com/api/playlist/detail?id='+parseInt(event.playlistId)
  let options = {
    method:"POST",
    url=musiclist_url,
    headers: {
     cookie:'MUSIC_U=675fb74408213020288a334790de3971b87f628b7d8fb6ae85721bab949eee9c33a649814e309366; Max-Age=1296000; Expires=Tue 9 Feb 2021 07:24:23 GMT; Path=/'
    },
  }

  //根据歌曲id获取歌曲的链接
  // player_url="https://api.imjad.cn/cloudmusic/?type=song&id="+parseInt(event.playerUrl)
  // let options2={
  //   method:'POST',
  //   url=player_url,
  // }


  //从数据库获取playlist
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
  //根据id 获取歌单对应的歌曲 
  app.router('musiclist',async(ctx,next)=>{
    ctx.body=await rp(options)
    .then((res)=>{
      return JSON.parse(res)
    })
  })


  //根据歌曲id获取对应的音乐链接
  // app.router('playerUrl',async(ctx,next)=>{
  //   ctx.body=await rp(options2)
  //   .then((res)=>{
  //     return JSON.parse(res)
  //   })
  // })
  return app.serve()
}