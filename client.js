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
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let blatFrom = 0;
// 返回1是android系统
if (isAndroid) {
  blatFrom = 1;
}
// 返回2是ios系统
if (isiOS) {
  blatFrom = 2;
}

//关闭h5
const closeH5 = () =>{
  try{
    if(blatFrom==1){
      alaAndroid.closeWebView();
    }else{
      window.location.href = '/fanbei-web/opennative?name=APP_CLOSE_H5';
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//去认证
const goAuthentication = () =>{
  try{
    if(blatFrom == 1){//去认证
      window.location.href='/fanbei-web/opennative?name=GG_com.alfl.www.main.ui.CreditCenterActivity';
    }else{
      window.location.href='/fanbei-web/opennative?name=GG_YSCredentialCenterViewController';
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//去登录
const goLogin = () =>{
  try{
    window.location.href='/fanbei-web/opennative?name=APP_LOGIN';
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转搜索tag页
const goSearchTag = () =>{
  try{
    window.location.href = '/fanbei-web/opennative?name=JUMP_SEARCHPAGE';
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转购物车
const goShopCartApp = () =>{
  try{
    if(blatFrom == 1){
      window.location.href = '/fanbei-web/opennative?name=GG_com.alfl.www.user.ui.ShoppingTrolleyActivity';
    }else{
      window.location.href = '/fanbei-web/opennative?name=GG_ALAShoppingCartViewController';
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转订单列表
const goOrderListApp = () =>{
  try{
    if(blatFrom == 1){
      window.location.href = '/fanbei-web/opennative?name=GG_com.alfl.www.user.ui.OrderListActivity';
    }else{
      window.location.href = '/fanbei-web/opennative?name=GG_ALAOrderContainerViewController';
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转首页
const goHome = () =>{
  try{
    window.location.href = '/fanbei-web/opennative?name=APP_HOME';
  }catch(e){
    console.log('notClient: ',e)
  }
}

// 客服
const goCustomerService = () => {
  try{
    window.location.href = '/fanbei-web/opennative?name=APP_CONTACT_CUSTOMER';
  }catch(e){
    console.log('notClient: ',e)
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



//打开h5
const openH5 = (url) =>{
  try{
    if(blatFrom==1){
      alaAndroid.jumpToOtherH5(url);
    }else{
      window.webkit.messageHandlers.jumpToOtherH5.postMessage(url);
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转商品详情
const goGoodDetail = (id,lc) =>{
  try{
    window.location.href = '/fanbei-web/opennative?name=GOODS_DETAIL_INFO&params={"privateGoodsId":"' + id +'","lc":"'+ lc +'"}';
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转收银台
const goCheckoutApp = (orderType,orderId,isGoBack) =>{
  try{
    if(blatFrom == 1){
      window.location.href = '/fanbei-web/opennative?name=APP_RENT&params={"orderType":"'+orderType+'","orderId":"'+orderId+'","isGoBack":"'+ isGoBack +'"}';
    }else{
      window.location.href = '/fanbei-web/opennative?name=APP_CASHIER&params={"orderType":"'+orderType+'","orderId":"'+orderId+'","isGoBack":"'+ isGoBack +'"}';
    }
  }catch(e){
    console.log('notClient: ',e)
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

//小程序中打开商品详情页
const openMiniProgramGoodDetail = (goodsId,lc='') =>{
  try{
    if(lc){
      wx.miniProgram.navigateTo({ url: '/pages/common/goodsDetail?goodsId=' + goodsId + '&lc=' + lc })
    }else{
      wx.miniProgram.navigateTo({ url: '/pages/common/goodsDetail?goodsId=' + goodsId })
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

//小程序中打开某一h5页面
const openMiniProgramH5 = (url) =>{
  try{
    wx.miniProgram.navigateTo({ url: '/pages/webview/index?url=' + BASE64.encoder(url) })
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转小程序登录页
const goMiniProgramLogin = () =>{
  try{
    wx.miniProgram.navigateTo({ url: '/pages/common/login'});
  }catch(e){
    console.log('notClient: ',e)
  }
}

//跳转消息中心页面
const goMsgCenterApp = () =>{
  try{
    let version = getUrl('_appInfo') ? eval('(' + decodeURIComponent(getUrl('_appInfo')) + ')').appVersion :'';
    if(blatFrom == 1){
      window.location.href = '/fanbei-web/opennative?name=GG_com.alfl.www.user.ui.MessageListActivity';
    }else{
      if(version < 435){
        window.location.href = '/fanbei-web/opennative?name=GG_ALAMessageViewController';
      }else{
        window.location.href = '/fanbei-web/opennative?name=GG_ZYSMsgPageViewController';
      }
    }
  }catch(e){
    console.log('notClient: ',e)
  }
}

export {
// export default{
  closeH5,//关闭当前的webview
  goAuthentication,//跳转客户端的去认证页面
  goLogin,//跳转客户端的登录页面
  goSearchTag,//跳转搜索tag页
  goShopCartApp,//跳转购物车
  goOrderListApp,//跳转订单列表
  goHome,//跳转首页
  goCustomerService,//跳转客服
  toScanCodePay,//扫码付款
  goMiniProgramLogin,//跳转小程序登录页
  goMsgCenterApp,//跳转消息中心页面

  //打开一个新的webview
  openH5,
  //@param {string} url 一个新的地址

  //跳转商品详情
  goGoodDetail,
  // @param {string} id 商品id
  // @param {string} lc 商品lc

  //跳转收银台
  goCheckoutApp,
  // @param {string} orderType 订单类型
  // @param {string} orderId 订单id
  // @param {string} isGoBack 是否返回刷新 Y需要，N不需要

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

  //分享到小程序商品详情页
  openMiniProgramGoodDetail,
  // @param {string} goodsId 商品id

  //某一h5页面分享到小程序
  openMiniProgramH5,
  // @param {string} url 分享页url

}
