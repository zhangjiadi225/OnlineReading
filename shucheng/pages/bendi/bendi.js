
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    msg : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyShujia();
  },

  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },
  goTxt(e){
    wx.navigateTo({
      url: '../txt/txt'
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
  find(e){
    console.log(1);
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        console.log("选择文件成功", res)
    
      // 2.上传文件
        wx.cloud.uploadFile({
          cloudPath: res.tempFiles[0].name,
          filePath: res.tempFiles[0].path,
          success: res => {
            console.log("上传文件成功", res)
    
            // 3.下载附件(临时文件)
            wx.cloud.downloadFile({
              fileID: res.fileID,
              success: sres => {
                console.log("下载文件成功", sres)
    
                // 4.通过下载附件得到tempFilePath并读取文件内容到result
                let fs = wx.getFileSystemManager()
                // 注意编码格式为'utf-8'
                let result = fs.readFileSync(sres.tempFilePath, "utf-8")
                console.log(result)
                // this.setData({
                //   msg:result
                // });
                wx.navigateTo({
                  url: '/pages/txt/txt?data='+JSON.stringify(result)
                }) 
              },
              fail: sres => {
                console.log("下载文件失败", sres)
              },
            })
          },
          fail: res => {
            console.log("上传文件失败", res)
          },
        })
      },
      fail(res) {
      console.log("选择文件失败", res)
      }
    })
  }

 
})