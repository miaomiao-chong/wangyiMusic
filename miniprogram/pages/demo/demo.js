// miniprogram/pages/demo/demo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:['python','c','c++','java','go']
  },
  //获取音乐信息
  getMusicInfo(){
    wx.cloud.callFunction({
      name:'tcbRouter',
      data:{
        $url:'music'
      }
    }).then((res)=>{
      console.log(res);
    })
  },
  //获取电影信息
  getMovieInfo(){
    wx.cloud.callFunction({
      name:'tcbRouter',
      data:{
        $url:'movie'
      }
    }).then((res)=>{
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */ 

  onLoad: function (options) {
    wx.request({
      url: 'https://music.163.com/api/playlist/detail?id=718169090',
      header:{
        cookie:"MUSIC_U=675fb74408213020288a334790de3971b87f628b7d8fb6ae85721bab949eee9c33a649814e309366; Max-Age=1296000; Expires=Tue 9 Feb 2021 07:24:23 GMT; Path=/"
      },
      success:function(res){
        console.log(res.data.result);
      }
    })
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // getlist:function(){
  //   let that=this
  //   wx.request({
  //     url: 'http://musicapi.leanapp.cn/top/playlist/highquality/%E5%8D%8E%E8%AF%AD',
  //     success: (result) => {
  //       console.log(result.data.playlists);
  //       that.setData({
  //         playlists:result.data.playlists.splice(0,6)
  //       })
  //     },
  //     fail: (res) => {},
  //     complete: (res) => {},
  //   })
  // },
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