

// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId:-1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      console.log(event);
      console.log(event.currentTarget.dataset.musicid);
      this.setData({
        playingId:event.currentTarget.dataset.musicid
      })
      wx.navigateTo({
        url: '../../pages/player/player?musicId='+this.data.playingId+'&index='+event.currentTarget.dataset.index,
      })
    }

  }
})
