// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() //云数据库初始化
const rp = require('request-promise')
const URL = 'http://musicapi.leanapp.cn/top/playlist/highquality/%E5%8D%8E%E8%AF%AD'
const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100//最大获取信息数量

// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await playlistCollection.get() //得到数据库歌单已有数据 用来去重
  // 因为获取数据库最多100条数据的限制 我们需要优化
  const countResult = await playlistCollection.count() //这是一个对象
  const total = countResult.total //这样才是数字 得到了数据库信息个数
  const batchTimes = Math.ceil(total / MAX_LIMIT) //取数据的次数
  const task = []       //放promise对象的一个数组
  for(let i=0;i<batchTimes;i++){
    let promise=playlistCollection.skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    task.push(promise)
  }
  //注意这里为什么这样写
  let list={
    data:[]
  }

  if(task.length>0){
      //都执行完了再执行下面的
    list=(await Promise.all(task)).reduce((acc,cur)=>{
      return {
        data:acc.data.concat(cur.data)
      }
    })
  }

  const playlist = await rp(URL).then((res) => { //得到请求数据
    return JSON.parse(res).playlists    
  })
  // console.log(playlist);
  const newData = [] //存放新的数据
  for (let i = 0; i < playlist.length; i++) {
    let flag = true //判断是否重复的标志 true表示不重复
    for (let j = 0; j < list.data.length; j++) { //注意这里是data      
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }
  for (let i = 0; i < newData.length; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i], //注意三点运算符的使用
        createTime: db.serverDate() //获取服务器时间
      }
    }).then((res) => {
      console.log("插入成功");
    }).catch((err) => {
      console.log("插入失败");
    })
  }
  return newData.length
}