// app.js
App({

  // 小程序一启动就会执行
  onLaunch() {
   console.log("小程序启动了");
   // 初始化云开发环境
    wx.cloud.init({
      env:"cloud1-1gbrqyif44199415"
    })
  },
  globalData: {
    userInfo: null
  }
})
