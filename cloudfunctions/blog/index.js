// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const TcbRouter=require("tcb-router")
const db=cloud.database()
const blogList=db.collection("blog")
const blogComment=db.collection("blog-comment")
const MAX_LIMIT=100
// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({event})
  app.router("list",async(ctx,next)=>{
    let keyword=event.keyword
    let w={}
    //要考虑为空的情况
    if(keyword.trim()!=''){
      w={
        content: db.RegExp({
          regexp: keyword,
          options: 'i',
        })
      }
    }
    let blog=await blogList.where(w)
      .skip(event.start)
      .limit(event.count)
      .orderBy("date",'desc')   //时间倒序
      .get() 
      .then((res)=>{
        return res
      })
    ctx.body=blog
  })

  app.router("detail",async(ctx,next)=>{
    //取出对应id的blog发表数据
    let blogId=event.blogId
    let blogDetail=await blogList.where({
      _id:blogId
    }).get().then((res)=>{
      return res.data
    })
    //取出对应id的评论数据
    const count=await blogComment.count()
    const total=count.total
    const batchTimes=Math.ceil(total/MAX_LIMIT)
    let tasks=[]
    for(let i=0;i<batchTimes;i++){
      const promise=blogComment.skip(i*MAX_LIMIT).limit(MAX_LIMIT).where({
        blogId
      }).get()
      tasks.push(promise)
    }
    let comment=(await Promise.all(tasks)).reduce((acc,cur)=>{
      return {
        data:acc.data.concat(cur.data)
      }
    })

    ctx.body={
      blogDetail,
      comment
    
    }
  })
  return app.serve()
}