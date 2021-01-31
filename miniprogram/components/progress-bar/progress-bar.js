// components/progress-bar/progress-bar.js
let movableAreaWidth=0
let movableViewWidth=0 
const backgroundAudioManager=wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:"00:00",
      totalTime:"00:00"
    },
    //可移动组件x坐标移动距离
    movableDis:0,
    //进度条组件的进度
    progress:0
  },

  lifetimes:{
    ready(){
      this._getMovableDis()
      this._bindBGMEvent()
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //获取可移动滑块的宽度(不同的手机宽度不一样)
    //组件一加载就应该调用这个方法
    _getMovableDis(){
      //现在是在组件当中，所以用this而不是wx
      const query=this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect)=>{
        console.log(rect);
        movableAreaWidth=rect[0].width
        movableViewWidth=rect[1].width
        console.log(movableAreaWidth,movableViewWidth);
      })

    },

    _bindBGMEvent(){
      backgroundAudioManager.onPlay(()=>{
        console.log("onplay")
      })
   
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
      })

      backgroundAudioManager.onPause(() => {
        console.log('Pause')
      })

      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })

      backgroundAudioManager.onCanplay(() => {
        // console.log('onCanplay')
        // console.log(backgroundAudioManager.duration);
        //有的机型打印出来undefined
        if(typeof backgroundAudioManager.duration!='undefined'){
          this._setTime()
        }else{
          //解决某些机型undefined的问题
          setTimeout(()=>{
            this._setTime()
          },1000)
        }
      })

      backgroundAudioManager.onTimeUpdate(() => {
        // console.log('onTimeUpdate')
      })

      backgroundAudioManager.onEnded(() => {
        console.log("onEnded")
      
      })

      backgroundAudioManager.onError((res) => {
        console.error(res.errMsg)
        console.error(res.errCode)
        wx.showToast({
          title: '错误:' + res.errCode,
        })
      })
    },
    //进度条的时间
    _setTime(){
      const duration=backgroundAudioManager.duration
      console.log(duration);
      const durationFMT=this._dateFormat(duration)
      console.log(durationFMT);
      this.setData({
        "showTime.totalTime":`${durationFMT.min}:${durationFMT.sec}`
        //这里老师说外面要加中括号,我没加也赋上值了
      })
      console.log(this.data.showTime.totalTime);
    },
    //格式化时间
    _dateFormat(second){
      const minute=Math.floor(second/60)
      second= Math.floor(second%60)
      return {
        "min":this.parse0(minute),
        "sec":this.parse0(second)
      }
    },
    //补零操作
    parse0(sec){
      return sec<10?'0'+sec:sec
    }
  }
})
