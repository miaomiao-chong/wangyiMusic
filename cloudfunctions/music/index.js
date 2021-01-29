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
  let BASE_URL='https://api.imjad.cn/cloudmusic/'
  //根据id获取歌词和播放地址
  app.router('musicUrl',async(ctx,next)=>{
    //注意这句一定要加
    ctx.data={}
    await rp(BASE_URL+`?type=song&id=${event.musicId}`).then((res)=>{
      ctx.data.musicUrl= JSON.parse(res).data[0].url})
    await rp(BASE_URL+`?type=lyric&id=${event.musicId}&br=128000`).then((res)=>{
      res=JSON.parse(res)
      ctx.data.musicLyric=res.lrc.lyric
      ctx.body={
          data:ctx.data
        }
      })
  })
  return app.serve()
}