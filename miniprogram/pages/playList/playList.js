// pages/playList/playList.js
const MAX_LIMIT=15
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:[
      {url:'http://image.ngchina.com.cn/2020/1225/20201225112530293.jpg'},
      {url:'http://image.ngchina.com.cn/2018/0119/20180119012605218.jpg'},
      {url:'http://image.ngchina.com.cn/2018/0119/20180119012432402.jpg'}
    ],
    playList:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
     },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  _getPlaylist(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        start:this.data.playList.length,
        count:MAX_LIMIT,
        $url:'playlist',
      }
    }).then((res)=>{
      // console.log(res);
      this.setData({
        playList:this.data.playList.concat(res.result.data)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })

  },
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
      playList:[]
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})