// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(res){
      let userInfo=res.detail.userInfo
      if(userInfo){
        console.log("确认授权");
        wx.showToast({
          title: '授权成功',
        })
      }else{
        console.log("授权失败");
        wx.showToast({
          title: '请点击授权',
          icon:"none"
        })
      }
      this.setData({
        modalShow:false
      })
    }
  }
})
