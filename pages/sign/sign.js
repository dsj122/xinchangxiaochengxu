// pages/sign/sign.js
var context = null; // 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;

const util = require('../../utils/util.js');

//获取系统信息
wx.getSystemInfo({
  success: function(res) {
    canvasw = res.windowWidth; //设备宽度
    // canvash = res.windowWidth * 7 / 15;
    canvash = res.windowHeight
  }
});


Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },

  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  //开始
  canvasStart: function(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
    //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

  },
  //过程
  canvasMove: function(event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);

    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function(event) {
    isButtonDown = false;
  },
  cleardraw: function() {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },

  // 生成图片
  saveImg: function() {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function(res) {
        console.log(res.tempFilePath)
        let data = that.data.data;
        wx.uploadFile({
          url: util.host+'Quote/confirmation',
          filePath: res.tempFilePath,
          header:{
            token:wx.getStorageSync('token')
          },
          name: 'file',
          formData:{
            id:data.id
          },
          success(res) {
            console.log(res,'上传签名');
            if(JSON.parse(res.data).code==200){
              wx.showToast({
                title: '上传成功',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: false,
              });
              setTimeout(() => {
                that.cleardraw();
                  wx.navigateBack({
                    delta: 1,
                })
              }, 1000);
            }
          },
          fail(res) {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
            })
          }
        })
        // getApp().upload(res.tempFilePath, (url) => {
        //   console.log('url', url);
        //   util.Request('/admin/quote/sign', {
        //     id: data.id,
        //     url: url
        //   }, 'GET', (res) => {
        //     console.log('提交签名', res);
        //     if (res.data.code == 2000) {
        //       wx.showToast({
        //         icon: '',
        //         title: '提交成功',
        //       })
        //       that.cleardraw();
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     }
        //   })
        // })


      }
    })
  },

  //导出图片
  getimg: function() {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    //生成图片
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function(res) {
        console.log(res.tempFilePath);
        //存入服务器
        wx.uploadFile({
          url: 'a.php', //接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: { //HTTP 请求中其他额外的 form data 
            'user': 'test'
          },
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {}
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = options.data;
    data = decodeURIComponent(data);
    data = JSON.parse(data);
    this.setData({
      data
    })
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    this.cleardraw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})