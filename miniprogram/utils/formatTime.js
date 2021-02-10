module.exports=(date)=>{
  date=new Date(date)   //转换成js时间格式
  let fmt="yyyy-MM-dd hh:mm:ss"

  let o={
      // "y+":date.getFullYear(),
      "M+":date.getMonth()+1,
      "d+":date.getDate(),
      "h+":date.getHours(),
      "m+":date.getMinutes(),
      "s+":date.getSeconds()
  }

  for(let k in o){
      // console.log(k);
      RegExp('('+k+')').test(fmt)
      // console.log("fmt被匹配到的字符串："+RegExp.$1);
      fmt= fmt.replace(RegExp.$1,o[k].toString().length>1?o[k]:'0'+o[[k]])
  }
  RegExp(/(y+)/).test(fmt)
  // console.log("fmt被匹配到的字符串："+RegExp.$1);
  fmt= fmt.replace(RegExp.$1,date.getFullYear())

  // RegExp(/(M+)/).test(fmt)
  // let month=date.getMonth()+1
  // console.log("fmt被匹配到的字符串："+RegExp.$1);
  // fmt= fmt.replace(RegExp.$1,month.toString().length>1?month:'0'+month)

  // RegExp(/(d+)/).test(fmt)
  // console.log("fmt被匹配到的字符串："+RegExp.$1);
  // fmt= fmt.replace(RegExp.$1,date.getDate().toString().length>1?date.getDate():'0'+date.getDate())


  return fmt
}