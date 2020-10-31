import './lib/base64.js';

// 获取当前页面的URL 对其带的参数进行处理
function getUrl(para) {
  let paraArr = location.search.substring(1).split("&");
  for (let i = 0; i < paraArr.length; i++) {
      if (para == paraArr[i].split('=')[0]) {
          return paraArr[i].split('=')[1];
      }
  }
  return '';
}

//判断机型
const whichClient = ()=>{
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // 返回1是android系统
  if (isAndroid) {
    return 1;
  }
  // 返回2是ios系统
  if (isiOS) {
    return 2;
  }
}


// 扫码付款
const toScanCodePay = () => {
  if (blatFrom == 1) {
    window.location.href = '/fanbei-web/opennative?name=GG_com.alfl.www.main.ui.QRCodeScanActivity';
  } else {
    window.location.href = '/fanbei-web/opennative?name=GG_SubLBXScanViewController';
  }
}

// app内部分享
const goAppShare = (shareData, methodType) =>{
  try{
    let dataObj = { // 分享内容
      "type": shareData.type ? shareData.type : '', // 分享类型 微信：wxshare 全部：share
      "shareType": shareData.shareType ? shareData.shareType : '', // 分享类型 朋友圈：wxCircle  微信好友：wxFriend qq空间：qzone
      "appLogin": shareData.appLogin, // 是否需要登录，Y需要，N不需要
      "shareAppTitle": shareData.shareAppTitle,  // 分享的title
      'shareAppContent': shareData.shareAppContent,  // 分享的内容
      "shareAppImage": shareData.shareAppImage,  // 分享右边小图
      "shareAppUrl": shareData.shareAppUrl,  // 分享后的链接
      "isSubmit": shareData.isSubmit, // 是否需要向后台提交数据，Y需要，N不需要
      "sharePage": shareData.sharePage // 分享的页面名
    };
    let dataStr = JSON.stringify(dataObj);  // obj对象转换成json对象
    if(methodType == 'alaShare'){
      return dataStr;
    }else{
      let base64 = BASE64.encoder(dataStr);
      if(methodType == 'clickShare'){
        window.location.href = '/fanbei-web/opennative?name=APP_SHARE&params=' + base64;
      }
      if(methodType == 'selfShare'){
        window.location.href = '/fanbei-web/opennative?name=APP_DIRECTIONAL_SHARE&params=' + base64;
      }
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//h5分享到小程序
const goMiniProgramShare = (shareData, methodType) =>{
  try{
    let ossHW = '?x-oss-process=image/resize,m_pad,h_555,w_693,color_FFFFFF';
    let dataObj = { // 分享内容
      "type": 'miniprogram', // 分享类型
      "shareType": shareData.shareType ? shareData.shareType : '', // wxFriend h5自定义分享弹窗（必传）其他不用
      "miniProgramType": shareData.miniProgramType, //版本类型：0 线上 1 开发版 2 体验版
      "shareAppTitle": shareData.shareAppTitle,  // 分享的title
      "shareAppContent": shareData.shareAppContent,  // 分享的内容
      "shareAppImage": shareData.shareAppImage + ossHW, // 分享图
      "shareAppUrl": shareData.shareAppUrl,  // 分享后的链接
      "miniProgramWebpageUrl": shareData.miniProgramWebpageUrl ? shareData.miniProgramWebpageUrl : 'https://app.51fanbei.com/app/user/channelRegister?channelCode=%08default&pointCode=default', //备用页面
      "isSubmit": shareData.isSubmit, // 是否需要向后台提交数据，Y需要，N不需要
      "sharePage": shareData.sharePage, // 分享的页面名
    };
    let dataStr = JSON.stringify(dataObj);  // obj对象转换成json对象
    if(methodType == 'alaShare'){
      return dataStr;
    }else{
      let base64 = BASE64.encoder(dataStr);
      if(methodType == 'clickShare'){
        window.location.href = '/fanbei-web/opennative?name=APP_SHARE&params=' + base64;
      }
      if(methodType == 'selfShare'){
        window.location.href = '/fanbei-web/opennative?name=APP_DIRECTIONAL_SHARE&params=' + base64;
      }
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}


export {
  getUrl,
  whichClient,
  toScanCodePay,//扫码付款
  //app内部分享
  goAppShare,
  // 参数一(必传)
  // @param {object} shareData 分享内容
    // 区别属性（3选1）
    // 1.右上角分享
    // @property {string} type 分享类型 微信：wxshare 全部：share
    // 2.点击去分享
    // @property {string} type 分享类型 微信：wxshare 全部：share
    // 3.h5自定义分享弹窗
    // @property {string} shareType 分享类型 朋友圈：wxCircle  微信好友：wxFriend qq空间：qzone
    // 共同属性
    // @property {string} appLogin 是否需要登录，Y需要，N不需要
    // @property {string} shareAppTitle 分享的title
    // @property {string} shareAppContent 分享的内容
    // @property {string} shareAppImage 分享右边小图
    // @property {string} shareAppUrl 分享后的链接
    // @property {string} isSubmit 是否需要向后台提交数据，Y需要，N不需要
    // @property {string} sharePage 分享的页面名
  // 参数二(必传)
  // @param {string} methodType 分享方法类型 右上角分享alaShare 点击分享clickShare 自定义分享selfShare

  //分享到小程序
  goMiniProgramShare,  
  //参数一(必传)
  // @param {object} shareData 分享内容
    // h5自定义分享弹窗（必传）其他不用
    // @property {string} shareType 分享类型 微信好友：wxFriend
    //共同属性
    // @property {string} miniProgramType 版本类型：0 线上 1 开发版 2 体验版
    // @property {string} shareAppTitle 分享的title
    // @property {string} shareAppContent 分享的内容
    // @property {string} shareAppImage 分享图
    // @property {string} shareAppUrl 分享后的链接
    // @property {string} isSubmit 是否需要向后台提交数据，Y需要，N不需要
    // @property {string} sharePage 分享的页面名
   //可不传
    // @property {string} miniProgramWebpageUrl 备用页面 默认为'https://app.51fanbei.com/app/user/channelRegister?channelCode=%08default&pointCode=default'
  // 参数二(必传)
  // @param {string} methodType 分享方法类型 右上角分享alaShare(安卓未加暂不能用) 点击分享clickShare 自定义分享selfShare

}
