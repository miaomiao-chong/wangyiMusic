// components/blog-ctrl/blog-ctrl.js
wx.cloud.init()
let userInfo={}
const db=wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loginShow:false, //登录组件
    modalShow:false,  //底部modal组件
    content:''     //输入框内容
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取输入框内容
    textInput(e){
      // console.log(e);
      this.setData({
        content:e.detail.value
      })
    },
    //点击评论
    onComment(){
      // 判断有没有登录
      wx.getSetting({
        success:(res)=>{
          //以前已经登录过
          if(res.authSetting["scope.userInfo"]){
            //显示弹窗 
            this.setData({
              modalShow:true
            })
            wx.getUserInfo({
              success:(res)=>{
                console.log("获取用户信息成功");
                userInfo=res.userInfo
              }
            })
          }else{
            this.setData({
              loginShow:true
            })
            console.log("以前用户没有授权过");
          }
        }
        
      })
      console.log("触发了事件");
    },
    //login组件里得到用户信息
    loginSuccess(e){
      userInfo=e.detail
      
      this.setData({
        modalShow:true
      })
    },
    //发送
    send(){
      console.log(userInfo);
      console.log("内容为",this.data.content);
      if(this.data.content==''){
        return
      }else{
        this.setData({
          modalShow:false,
        })
      }
      db.collection("blog-comment").add({
        data:{
          date:db.serverDate(),
          userName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl,
          content:this.data.content,
          blogId:this.properties.blogId
        }
      }).then(()=>{
        this.triggerEvent("refreshComment")
       wx.showToast({
         title: '发送成功',
       })
        console.log("发送成功");
        this.setData({
          content:''
        })
      })
    }
  }
})
