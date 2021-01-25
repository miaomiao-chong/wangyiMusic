// miniprogram/pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['python','c','c++','java','go']
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    // setTimeout(() => {
    //   console.log(1);
    //   setTimeout(() => {
    //     console.log(2); 
    //     setTimeout(() => {
    //       console.log(3);
    //     }, 3000);
    //   }, 2000);
    // }, 1000);
    // new Promise((resolve,reject)=>{
    //   setTimeout(() => {
    //     console.log("1");
    //     resolve()
    //   }, 100);
    // }).then(()=>{
    //   setTimeout(() => {
    //     console.log("2");
    //   }, 2000);
    // })
  //  let p1=new Promise((resolve,reject)=>{
  //     setTimeout(() => {
  //       console.log("p1");
  //       resolve("p1")
  //     }, 2000);
  //   })
    
  //  let p2=new Promise((resolve,reject)=>{
  //     setTimeout(() => {
  //       console.log("p2");
  //       resolve("p2")
  //     }, 1000);
  //   })
  //  let p3=new Promise((resolve,reject)=>{
  //     setTimeout(() => {
  //       console.log("p3");
  //       resolve("p3")
  //     }, 3000);
  //   })
  // //等三个promise任务都完成 再进行操作
  // Promise.all([p1,p2,p3]).then((res)=>{
  //   console.log("全部完成");
  //   console.log(res);
  // }).catch((err)=>{
  //   console.log("失败");
  // })

  // Promise.race([p1,p2,p3]).then((res)=>{
  //   console.log("完成");
  //   console.log(res);
  // }).catch((err)=>{
  //   console.log("失败");
  // })
  // },
  // change(){
  //   let length=this.data.list.length
  //   for(let i=0;i<3;i++){
  //     let x=Math.floor(Math.random()*length)
  //     let y=Math.floor(Math.random()*length)
  //     let temp=this.data.list[x]
  //     this.data.list[x]=this.data.list[y]
  //     this.data.list[y]=temp
  //   }
   
  //   this.setData({
  //     list:this.data.list
  //   })

  //   this.foo()
  //  } ,
  //   async foo(){
  //    await console.log("foo");
 
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getlist:function(){
    let that=this
    wx.request({
      url: 'http://musicapi.leanapp.cn/top/playlist/highquality/%E5%8D%8E%E8%AF%AD',
      success: (result) => {
        console.log(result.data.playlists);
        that.setData({
          playlists:result.data.playlists.splice(0,6)
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  onReady: function () {
    this.getlist()
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