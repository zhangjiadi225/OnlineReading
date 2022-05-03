// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    console.log(wx.getStorageSync('info'));
    this.setData({
      name:wx.getStorageSync('info').nicheng||"阿顿"
    });
  },


  // 我的书架
  goShujia(){
    wx.navigateTo({
      url: '../my_shujia/my_shujia',
    })
  },

  // 管理员登录
  goAdmin(){
    wx.navigateTo({
      url: '../admin/admin',
    })
  },
goAdd(){
  wx.navigateTo({
    url: '../add/add',
  })
},

  goLx(){
    wx.navigateTo({
      url: '../lx/lx',
    })
  },

  gSet(){
    wx.navigateTo({
      url: '../tuichu/tuichu',
    })
  },
  gobendi(){
    wx.navigateTo({
      url: '../bendi/bendi',
    })
  },


})