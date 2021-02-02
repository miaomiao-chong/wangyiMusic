// components/progress-bar/progress-bar.js
let movableAreaWidth=0
let movableViewWidth=0 
const backgroundAudioManager=wx.getBackgroundAudioManager()
// 优化setdata次数过多的情况
let currentSec=-1
let duration=0 //当前歌曲总时长 我们的data里面也有个总时长，但是是给用户看的，我们这个是计算用的 以s为单位
let isMoving=false //解决进度条拖拽冲突
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

    onChange(e){
      // console.log(e);
      //判断是不是拖动触发的
      if(e.detail.source==="touch"){
        console.log(e);
        //注意我们没有setdata 为什么呢 因为如果这样的话，他会频繁setdata给progress和movableDis赋值，小程序带不动，我们应该在用户松手的时候赋值就好了 这里把值保存起来待会给onTouchEnd那个事件处理函数用
        // 疑问：这里的progress和movableDis指的是什么？
        this.data.progress=e.detail.x/(movableAreaWidth-movableViewWidth)*100
        this.data.movableDis=e.detail.x
        isMoving=true
      }
    },
    onTouchEnd(){
      const currentTimeFmt=this._dateFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress:this.data.progress,
        movableDis:this.data.movableDis,
        "showTime.currentTime":currentTimeFmt.min+':'+currentTimeFmt.sec
      })
      console.log(this.data.progress);
      backgroundAudioManager.seek(duration*this.data.progress/100)
      isMoving=false
    },

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
        // isMoving=false
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
        if(!isMoving){
          const currentTime=backgroundAudioManager.currentTime
          const duration=backgroundAudioManager.duration
          //变成字符串根据点分割，如果与currentSec不相等，就setdata
          
          if(currentTime.toString().split('.')[0]!=currentSec){
            console.log(currentTime);//测试setdata的次数是不是少了
            const currentTimeFmt=this._dateFormat(currentTime)
            this.setData({
              //正在播放的时间,滑块距离，进度
              "showTime.currentTime":`${currentTimeFmt.min}:${currentTimeFmt.sec}`,
              movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
              progress: currentTime / duration * 100,
            })
            currentSec=currentTime.toString().split('.')[0]
            //传给lyric组件 歌词联动效果
            this.triggerEvent("timeUpdate",{
              currentTime
            })
          }
      
          // console.log(this.data.progress);
          // console.log(currentTime/duration);
          // console.log('onTimeUpdate')
        }
       
      })

      backgroundAudioManager.onEnded(() => {
        console.log("onEnded")
        this.triggerEvent("musicEnd")
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
      duration=backgroundAudioManager.duration
      // console.log(duration);
      const durationFMT=this._dateFormat(duration)
      // console.log(durationFMT);
      this.setData({
        "showTime.totalTime":`${durationFMT.min}:${durationFMT.sec}`
        //这里老师说外面要加中括号,我没加也赋上值了
      })
      // console.log(this.data.showTime.totalTime);
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
