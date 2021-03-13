
wx.cloud.init()
const MAX_LIMIT=5
// miniprogram/pages/profile-myBlog/profile-myBlog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloglist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyBlogList()
  },
  _getMyBlogList(){
    wx.showToast({
      title: '加载中',
      icon: 'none',
    })
    wx.cloud.callFunction({
      name:"blog",
      data:{
        $url:"bloglist",
        start:this.data.bloglist.length,
        count:MAX_LIMIT
      }
    }).then((res)=>{
      let newBloglist=this.data.bloglist.concat(res.result.data)
      this.setData({
        bloglist:newBloglist
      })
      wx.hideToast({
        success: (res) => {},
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
    this.setData({
      bloglist:[]
    })
    this._getMyBlogList()
  },
  goToComment(event){
    console.log(event);
    let blogId=event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: '../blog-comment/blog-comment?blogId='+blogId,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getMyBlogList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})