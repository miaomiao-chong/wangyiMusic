// components/blog-card/blog-card.js
let fotmatTime=require("../../utils/formatTime")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:{
      type:Object
    }
  },
  observers:{
    ["blog.date"](val){
      // console.log(fotmatTime(val))
      this.setData({
        time:fotmatTime(val)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    time:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //图片点击预览
    clickImg(e){
      console.log(e.currentTarget.dataset);
      wx.previewImage({
        urls: e.currentTarget.dataset.urls,
        current:e.currentTarget.dataset.current
      })
    }
  }
})
