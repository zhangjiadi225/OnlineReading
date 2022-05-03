// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  goMsg(e){
    // console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../msg/msg?index='+ e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const text = wx.getStorageSync('msg')
    this.setData({
      text
    });
  },

})