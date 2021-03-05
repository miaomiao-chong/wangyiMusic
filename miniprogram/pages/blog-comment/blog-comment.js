// miniprogram/pages/blog-comment/blog-comment.js
let formatTime=require('../../utils/formatTime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogId:'',
    // blogComment:[],
    blogDetail:{},
    blogComment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      blogId:options.blogId
    })
    this. _getBlogDetail()
  },
  _getBlogDetail(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"blog",
      data:{
        blogId:this.data.blogId,
        $url:"detail"
      }
    }).then((res)=>{
      console.log(res);
      let blogComment=res.result.comment.data
      for(let i=0;i<blogComment.length;i++){
        blogComment[i].date=formatTime(blogComment[i].date)
      }
      wx.hideLoading()
      this.setData({
        blogComment,
        blogDetail:res.result.blogDetail[0]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})