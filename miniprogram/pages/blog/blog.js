// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    blogList:[]   //博客列表
  },
  onPublish() {
    wx.getSetting({
      success: (res) => {
        // console.log(res);
        if (res.authSetting["scope.userInfo"]) {
          console.log("已经授权 这里待会做跳转");
          wx.getUserInfo({
            success:(res)=>{
              console.log(res);
              this.loginSuccess(res.userInfo)
            }
          })
     
        } else {
          this.setData({
            modalShow: true
          })
        }
      }
    })

  },
  //跳转到编辑页面
  loginSuccess(e){
    console.log(e);

    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${e.nickName}&avatarUrl=${e.avatarUrl}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()
  },
  //获取博客列表
  _loadBlogList(){
    wx.cloud.callFunction({
      name:"blog",
      data:{
        $url:"list",
        start:this.data.blogList.length,
        count:1
      }
    }).then((res)=>{
      console.log(res);
      this.setData({
        blogList:this.data.blogList.concat(res.result.data)
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})