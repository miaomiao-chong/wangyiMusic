// components/bottom-modal/bottom-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow:{
      type:Boolean
    }
  },
  options:{
    multipleSlots:true
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
    close(){
      this.setData({
        modalShow:false
      })
    }
  }
})
