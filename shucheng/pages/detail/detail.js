// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.data)
    console.log(data);
    this.setData({
      obj:data
    });
    this.getData();
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      
  },

  // 更多推荐
  getData(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getBooks',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data)
        this.setData({
          dataList:res.data.list.splice(2,13)
        });
        wx.hideLoading()
      }
    })
  },

  // 详情
  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },


  btn(){
    wx.showModal({
      title: '温馨提示',
      content: `确定要将《${this.data.obj.title}》这本书添加到书架吗？`,
      success:res=> {
        if (res.confirm) {
          wx.showLoading({
            title: '添加中...',
          })
          wx.request({
            url: 'http://127.0.0.1:5000/addShujia',
            data: {
              book_id:this.data.obj.book_id,
              title:this.data.obj.title,
              img:this.data.obj.img,
              miaoshu:this.data.obj.miaoshu,
              num:this.data.obj.num,
              msg:this.data.obj.msg,
              tel:wx.getStorageSync('tel')
            },
            method:"POST",
            header: {
              'content-type': 'application/json' 
            },
            success:res2=> {
              console.log(res2.data) 
              if(res2.data.code==200){
                wx.showModal({
                  title: '提示',
                  content: `${res2.data.msg}`,
                  showCancel:false,
                  success () {
                  }
                })
              }else if(res2.data.code==0){
                wx.showModal({
                  title: '提示',
                  content: `${res2.data.msg}`,
                  showCancel:false,
                  success () {
                  }
                })
              }
              wx.hideLoading()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 跳转到阅读
  goYuedu(){
    wx.setStorageSync("msg",JSON.parse(this.data.obj.msg))
    wx.navigateTo({
      url: '../text/text'
    })
  }
})