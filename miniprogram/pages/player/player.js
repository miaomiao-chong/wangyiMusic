// miniprogram/pages/player/player.js


//缓存取出来的列表
let musicInfo={}
//正在播放音乐的下标 也不需要在界面显示
let nowPlayingIndex=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicUrl:{
      url:'',
      lyric:''
    },
    musicInfo:{
      singer:'',
      name:'',
      pic:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this._getmusicDetail(options.musicId,options.index)
  },
 _getmusicDetail(musicId,index){
   let that=this
   //得到歌曲播放的url
  //  下面注释的改为用tcbRouter实现
  //  wx.request({
  //     url: 'https://api.imjad.cn/cloudmusic/?type=song&id='+musicId,
  //     success:function(e){
  //       that.setData({
  //         'musicUrl.url':e.data.data[0].url
  //       })
  //     }
  //   }),
  //   //得到歌词
  //   wx.request({
  //     url: 'https://api.imjad.cn/cloudmusic/?type=lyric&id='+musicId+'&br=128000',
  //     success:function(e){
  //       that.setData({
  //         'musicUrl.lyric':e.data.lrc.lyric
  //       })
  //     }
  //   })
    wx.cloud.callFunction({
      name:'music',
      data:{
        $url:"musicUrl",
        musicId:musicId
      }
    }).then((res)=>{
      console.log(res);
    })
    //得到歌曲名字，歌手，图片等（缓存拿过来的）
    //为什么musicInfo要定义在外面呢 思考一下 因为musicinfo东西太多了，我们不需要那么多数据，如果定义在外面好操作一点
    musicInfo=wx.getStorageSync('musiclist')
    nowPlayingIndex=index
    let music=musicInfo[nowPlayingIndex]
    console.log(music);
    this.setData({
      "musicInfo.name":music.name,
      "musicInfo.singer":music.album.name,
      "musicInfo.pic":music.album.picUrl
    })
    //设置
    wx.setNavigationBarTitle({
      title: this.data.musicInfo.name,
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