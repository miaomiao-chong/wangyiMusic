// components/playList/playList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist:{
      type:Object
    }
  },
  observers:{
    ['playlist.playCount'](count){
      this.setData({
        _count:this._format(count,2)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _count:0
  },

  /**
   * 组件的方法列表
   */

  methods: {
    // 6位一下  6-8位 8位以上
    // 12345.444   1251232.12  123654789
    // 1 直接取整 
    // 2 取小数点前的，小数点后的一个变量就等于数字的长度-4到长度-4+要保存的长度 然后小数点后的就等于数字/10000取整 再拼接一下返回就ok
    //3 小数：长度-8到长度-8+decimal 整数：/100000000
    _format(num,point){
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) +
          '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})
