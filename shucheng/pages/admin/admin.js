// pages/login/login.js
Page({
  data: {
    paw1:'123456',
    paw2:""
  },
  getPaw(e){
    console.log(e.detail.value)
    this.setData({
      paw2:e.detail.value
    });
  },

  btn(){
    if(this.data.paw1==this.data.paw2){
      wx.showModal({
        title: '提示',
        content: "密码正确",
        showCancel:false,
        success () {
          wx.navigateTo({
            url: '../add/add',
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: "密码错误",
        showCancel:false,
        success () {
        }
      })
    }
  }



 
})