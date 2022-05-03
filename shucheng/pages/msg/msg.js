// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:"",   // 索引
    msg:[]    // 文章数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index);
    const msg = wx.getStorageSync('msg');
    this.setData({
      msg,
      currentIndex:options.index
    });
    console.log(this.data.msg);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  btn(e){
    if(e.currentTarget.dataset.index==-1){
      if(this.data.currentIndex>0){
        let currentIndex = parseInt(this.data.currentIndex) + parseInt(e.currentTarget.dataset.index);
        this.setData({
          currentIndex
        });
        console.log(this.data.currentIndex)
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
        }
      }else{
        wx.showModal({
          title: '提示',
          content:"这已经是第一章了！",
          showCancel:false,
          success:()=>{
            return
          }
        })
      }
    }else if(e.currentTarget.dataset.index==1){
      if(this.data.currentIndex==5){
        wx.showModal({
          title: '提示',
          content:"这已经是最后一章了！",
          showCancel:false,
          success:()=>{
            return
          }
        })
      }else{
        let currentIndex = parseInt(this.data.currentIndex) + parseInt(e.currentTarget.dataset.index);
        this.setData({
          currentIndex
        });
        console.log(this.data.currentIndex)
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
        }
      }
    }
  }
})