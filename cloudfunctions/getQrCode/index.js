const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
        scene: wxContext.OPENID
      })
  //  console.log(result);
    const upload=await cloud.uploadFile({
        cloudPath:'qrcode/'+Date.now()+'-'+Math.random()+'.png',
        fileContent:result.buffer
      })
      return upload.fileID
  } catch (err) {
    console.log(err);
  }
}