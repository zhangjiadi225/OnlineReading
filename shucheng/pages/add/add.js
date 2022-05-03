var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
//引入获得地址的js文件
var qqmapsdk;
const app=getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",  // 上传的图片
    title:"",
    miaoshu:"",
    radio:"",  // 服务类型
    title1:"",
    title2:"",
    title3:"",
    title4:"",
    title5:"",
    title6:"",
    msg1:"",
    msg2:"",
    msg3:"",
    msg4:"",
    msg5:"",
    msg6:"",
  },
  //获取标题
  getTitle(e){
    console.log(e.detail.value)
    this.setData({
      title:e.detail.value
    });
  },

   // 详情
   getXq(e){
    console.log(e.detail.value)
    this.setData({
      miaoshu:e.detail.value
    });
  },

  // 选服务类型
  onChangeRadio(event) {
    console.log(event.detail)
    this.setData({
      radio: event.detail,
    });
  },

  // 获取当前时间
  //显示日期在页面上  yyy-MM-dd
  getTime(){
	  var now = new Date();
	  var year = now.getFullYear(); //得到年份
	  var month = now.getMonth();//得到月份
	  var date = now.getDate();//得到日期
	  var day = now.getDay();//得到周几
	  var hour = now.getHours();//得到小时
	  var minu = now.getMinutes();//得到分钟
	  var sec = now.getSeconds();//得到秒
	  month = month + 1;
	  if (month < 10) month = "0" + month;
	  if (date < 10) date = "0" + date;
	  if (hour < 10) hour = "0" + hour;
	  if (minu < 10) minu = "0" + minu;
	  if (sec < 10) sec = "0" + sec;
	  var time = "";
	  //精确到天
		time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
    // return time;
    console.log(time)
    return time
},

// 点击上传图片
changeBigImg() {
  console.log("a")
 let that = this;
 // let openid = app.globalData.openid || wx.getStorageSync('openid');
 wx.chooseImage({
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
     wx.showLoading({
       title: '上传中',
     });
     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
     let filePath = res.tempFilePaths[0];
     const name = Math.random() * 1000000;
     const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
     wx.cloud.uploadFile({
       cloudPath,//云存储图片名字
       filePath,//临时路径
       success: res => {
         console.log('[上传图片] 成功：', res)
         console.log(res.fileID)
         // wx.showToast({
         //   title: '图片存储成功',
         //   'icon': 'none',
         //   duration: 3000
         // })
         that.setData({
           img: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
          //  ['formInfo.img_url']:res.fileID   // 将云存储中的图片路劲保存到数据库中
         });
         
       },
        fail: e => {
         console.error('[上传图片] 失败：', e)
       },
       complete: () => {
         wx.hideLoading()
       }
     });
   }
 })
 },




 // 提交
 addBtn(){
   const msg = [
     {title:'*'+this.data.title1,msg:this.data.msg1},
     {title:'*'+this.data.title2,msg:this.data.msg2},
     {title:'*'+this.data.title3,msg:this.data.msg3},
     {title:'*'+this.data.title4,msg:this.data.msg4},
     {title:'*'+this.data.title5,msg:this.data.msg5},
     {title:'*'+this.data.title6,msg:this.data.msg6},
   ];
  //  console.log(msg);
  //  console.log(JSON.stringify(msg))
  // if(!this.data.img){
  //   wx.showModal({
  //     title: '提示',
  //     content:"请上传图书封面",
  //     showCancel:false,
  //     success:()=>{
  //       return
  //     }
  //   })
  // }else if(!this.data.title){
  //   wx.showModal({
  //     title: '提示',
  //     content:"请输入服务标题！",
  //     showCancel:false,
  //     success:()=>{
  //       return
  //     }
  //   })
  // }else if(!this.data.miaoshu){
  //   wx.showModal({
  //     title: '提示',
  //     content:"请输入图书详情内容！",
  //     showCancel:false,
  //     success:()=>{
  //       return
  //     }
  //   })
  // }else if(!this.data.radio){
  //   wx.showModal({
  //     title: '提示',
  //     content:"请选图书类型！",
  //     showCancel:false,
  //     success:()=>{
  //       return
  //     }
  //   })
  // }else{
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({ 
      url: 'http://127.0.0.1:5000/addBook', 
      method:"POST",
      data: {
        img:this.data.img,
        msg:JSON.stringify(msg),
        title:'**'+this.data.title,
        miaoshu:this.data.miaoshu,
        num:this.data.radio,
        shijian:this.getTime()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        console.log(res.data)
        wx.hideLoading()
        if(res.data.code==200){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: "发布成功！",
            showCancel:false,
            success:()=> {
              // wx.navigateBack({
              //   delta:1
              // })
              this.setData({
                img:"",  // 上传的图片
                title:"",
                miaoshu:"",
                radio:"",  // 服务类型
                title1:"",  // 文章标题
                msg1:"",
                title2:"",
                msg2:"",
                title3:"",
                msg3:"",
                title4:"",
                msg4:"",
                title5:"",
                msg5:"",
                title6:"",
                msg6:"",
              });
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: "发布失败！",
            showCancel:false,
            success () {
              
            }
          })
        }
      }
    })
  // }
 },

 getTitle1(e){
  console.log(e.detail.value)
  this.setData({
    title1:e.detail.value
  });
},
getTitle2(e){
  console.log(e.detail.value)
  this.setData({
    title2:e.detail.value
  });
},
getTitle3(e){
  console.log(e.detail.value)
  this.setData({
    title3:e.detail.value
  });
},
getTitle4(e){
  console.log(e.detail.value)
  this.setData({
    title4:e.detail.value
  });
},
getTitle5(e){
  console.log(e.detail.value)
  this.setData({
    title5:e.detail.value
  });
},
getTitle6(e){
  console.log(e.detail.value)
  this.setData({
    title6:e.detail.value
  });
},


// 标题内容
getXq1(e){
  console.log(e.detail.value)
  this.setData({
    msg1:e.detail.value
  });
},
getXq2(e){
  console.log(e.detail.value)
  this.setData({
    msg2:e.detail.value
  });
},
getXq3(e){
  console.log(e.detail.value)
  this.setData({
    msg3:e.detail.value
  });
},
getXq4(e){
  console.log(e.detail.value)
  this.setData({
    msg4:e.detail.value
  });
},
getXq5(e){
  console.log(e.detail.value)
  this.setData({
    msg5:e.detail.value
  });
},
getXq6(e){
  console.log(e.detail.value)
  this.setData({
    msg6:e.detail.value
  });
},


})