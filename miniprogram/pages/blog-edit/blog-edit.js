// miniprogram/pages/blog-edit/blog-edit.js
let TEXT_NUM_MAX = 100
let IMG_MAX = 9
const db=wx.cloud.database()  //数据库
let content=''
let userInfo={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textCount: 0, //计数（输入框）
    imgArr:[],     //图片列表
    showAddIcon: true, //是否显示加号
    footerBottom: 0, //输入时 footer距底部高度
  },
 
  //输入字数显示
  handleInput(e) {
    let textCount = e.detail.value.length
    content=e.detail.value  //输入内容
    this.setData({
      textCount
    })
    if (textCount >= TEXT_NUM_MAX) {
      this.setData({
        textCount: `最多输入${TEXT_NUM_MAX}个字`
      })
    }
  },
  //添加图片
  addImg() {
    //存放图片的数组
    let count = 0
    let imgArr = []
    wx.chooseImage({
      count: IMG_MAX - this.data.imgArr.length,
      success: (e) => {
        console.log(e);
        imgArr = e.tempFilePaths
        this.setData({
          imgArr: this.data.imgArr.concat(imgArr)
        })
        let length = this.data.imgArr.length
        if (length >= IMG_MAX) {
          this.setData({
            showAddIcon: false
          })
        }
      },
    })
  },
  send(){
    wx.showLoading({
      title: '正在发送',
    })
    let promiseArr=[]
    let fileIds=[]   //云存储图片地址数组
    for(let i=0;i<this.data.imgArr.length;i++){
     let p=new Promise((resolve,reject)=>{
        let item=this.data.imgArr[i]
        wx.cloud.uploadFile({
          cloudPath: 'blog/'+Date.now()+'.jpg',
          filePath:item,
          success: res => {
            console.log('上传成功', res.fileID)
            fileIds=fileIds.concat(res.fileID)
           
            resolve()
          },
        })
     })
     promiseArr.push(p)
    }
    Promise.all(promiseArr).then((res)=>{
      console.log("都执行完了");
      //下面是执行放入数据库操作
      db.collection("blog").add({
        data:{
          fileIds,   //图片
          content,   //输入内容
          ...userInfo , //昵称，头像
          date:db.serverDate() ,//时间
        }
      }).then((res)=>{
        console.log("传入数据库成功");
        wx.hideLoading()
        wx.showToast({
          title: '发送成功',
        })
        //发送成功跳转回去
        wx.navigateBack()
        let page=getCurrentPages()
        console.log(page);
        page[0].onPullDownRefresh()

      }).catch((err)=>{
        console.log("传入数据库失败");
        wx.hideLoading()
        wx.showToast({
          title: '发送失败',
        })
      })
    })
  },

  //删除图片
  deleteImg(e){
    let index=e.currentTarget.dataset.index
    let imgArr=this.data.imgArr
    imgArr.splice(index,1)
    this.setData({
      imgArr
    })
    this.setData({
      showAddIcon:true
    })
    
  },
  // 更改footer距底部高度
  onFocus(e) {
    console.log(e.detail.height);
    let height = e.detail.height
    this.setData({
      footerBottom: height
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    userInfo=options

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