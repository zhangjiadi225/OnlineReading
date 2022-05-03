// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.data)
    this.setData({
      msg:data
    });
    var aa = this.data.msg.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
    console.log(aa);
  },





})