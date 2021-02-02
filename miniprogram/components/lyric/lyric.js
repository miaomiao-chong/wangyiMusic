// components/lyric/lyric.js;
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    islyricShow: {
      type: Boolean,
      value: false
    },
    lyric: {
      type: String,
    }
  },
  observers: {
    lyric(lrc) {
      if(lrc=="暂无歌词"){
        this.setData({
          lrcList: [{
            lrc:'暂无歌词',
            time: 0,
          }],
          nowLyricIndex: -1
        })
      }else{
        // console.log(lrc);
        this._parseLrc(lrc)
        console.log(lrc);  
      }
   
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLyricIndex: 0, //当前高亮显示的index
    scrollTop: 0, //滚动条滚动高度
  },
  lifetimes: {
    ready() {
      //750rpx
      wx.getSystemInfo({
        success: (result) => {
          console.log(result);
          lyricHeight = result.screenWidth / 750 * 64
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      console.log(currentTime);
      let lrcList = this.data.lrcList
      if (lrcList.length == 0) {
        return
      }
       //解决进度条拖到最后 歌词不滑到最下面问题
      if (currentTime > lrcList[lrcList.length - 1].time) {
        if (this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      for (let i = 0, len = lrcList.length; i < len; i++) {
        if (currentTime <= lrcList[i].time) {
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },
    _parseLrc(sLrc) {
      let line = sLrc.split('\n')
      let _lrcList = []
      // console.log(line);
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          // console.log(time); [00:00.39]
          let lrc = elem.split(time)[1]
          // console.log(lrc);   //只留歌词
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          // console.log(timeReg); 
          // 0: "02:03.26"
          // 1: "02"
          // 2: "03"
          // 3: "26
          //把时间转化为秒
          let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          //每一行歌词代表的时间和对应的文字
          _lrcList.push({
            lrc,
            time: time2Seconds
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })

    }

  },
})