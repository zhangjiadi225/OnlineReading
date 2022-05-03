// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeTitle(e){
    console.log(e.detail)
    wx.showLoading({
      title: '查询中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/search',
      data: {
        title:e.detail
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data.list)
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
    if(e.detail==""){
      this.setData({
        dataList:[]
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



 
})