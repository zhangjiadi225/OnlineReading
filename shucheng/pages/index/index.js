// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    dataList:[]  // 图书信息数组
  },
  // 事件处理函数
  onLoad() { 
  },
  
  onShow: function () {
    this.getData();
 
  },
 
  // 跳转到详情页
  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },

  // 获取所有图书信息
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
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },

  // 跳转到搜索
  goSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
   },
})
