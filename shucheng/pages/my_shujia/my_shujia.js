// pages/my_shujia/my_shujia.js
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
    this.getMyShujia();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },


  // 获取我的书架图书
  getMyShujia(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getMyShujia',
      data: {
        tel:wx.getStorageSync('tel')
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data)
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },

  del(e){
    console.log(e.currentTarget.dataset.item);
    wx.showModal({
      title: '温馨提示',
      content: `确定要将《${e.currentTarget.dataset.item.title}》这本书从书架删除吗？`,
      success:res=> {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })
          wx.request({
            url: 'http://127.0.0.1:5000/delShujia',
            data: {
              shujia_id:e.currentTarget.dataset.item.shujia_id,
            },
            header: {
              'content-type': 'application/json' 
            },
            success:res=> {
              console.log(res.data)
                wx.showModal({
                  title: '提示',
                  content: `${res.data.msg}`,
                  showCancel:false,
                  success:()=> {
                    this.getMyShujia()
                  }
                })
              wx.hideLoading()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

 
})