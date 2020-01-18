// pages/comfirmPay/comfirmPay.js
const util = require('../../utils/util.js');
const config = require('../../pages/config.js');
const app=  getApp();

let isFinish = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    initName: null,
    name: '',
    data: {},
    showType: 0,
    success_icon: '../../utils/image/xinc02.png',
    fail_icon: '../../utils/image/xinc01.png',
    isShow: false,
  },
  //保存姓名
  onConfirm() {
    let that = this;
    let name = this.data.name;
    if (!name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return;
    }
    util.PostRequest('Receivable/saveRealName',{
      name:that.data.name
    },res=>{
      console.log(res,'保存姓名');
      if(res.code == 200){
        wx.showToast({
          title: '保存成功!',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
        let data = that.data.data
        data.real_name = that.data.name
        that.setData({
          data:data,
          isShow:false
        })
      }else{
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
        that.setData({
          isShow:false
        })
      }
    })
    // util.Request('/wxApplets/tpUserInfo/updateName', {
    //   name: name
    // }, 'GET', (res) => {
    //   if (res.data.code == 2000) {
    //     wx.showToast({
    //       title: '提交成功',
    //       icon: 'none'
    //     })
    //     that.closeInput();
    //     that.getName();
    //   }
    // })

  },

  showInput() {
    this.setData({
      isShow: true,
    })
  },

  closeInput() {
    this.setData({
      isShow: false
    })
  },

  keyInput(e) {
    let name = e.detail.value;
    this.setData({
      name
    })
  },

  initData() {

  },

  again() {
    this.setData({
      showType: 0
    });
    this.onPay();
  },
  //付款
  onPay(e) {
    if (!this.data.data.real_name) {
      this.showInput();
      return;
    }
    let that=this
    util.PostRequest('pay/payOrder',{
      id:that.data.id
    },res=>{
      console.log(res,'获取签名');
      if(res.code == 200){  
        wx.requestPayment({
          timeStamp:res.data.timeStamp,
          nonceStr:res.data.nonceStr,
          package:res.data.package,
          signType:res.data.signType,
          paySign:res.data.paySign,
          success(res) {
            console.log(res, '支付');
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
            that.setData({
              showType: 1
            })
          },
          fail(res) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
            that.setData({
              showType: 2
            })
          }
        })
      }
    })
    // util.Request('/admin/payment/check', {
    //   id: this.data.data.id
    // }, 'GET', (res) => {
    //   console.log('检测', res);
    // })
    // let data = this.data.data.pay_info;
    // let that = this;
    // wx.requestPayment({
    //   timeStamp: data.timeStamp,
    //   nonceStr: data.nonceStr,
    //   package: data.package,
    //   signType: data.signType,
    //   paySign: data.paySign,
    //   success: function(res) {
    //     console.log('成功', res);
    //     that.setData({
    //       showType: 1
    //     })
    //     util.Request('/admin/payment/update', {
    //       id: that.data.data.id,
    //       status: 1
    //     }, 'GET', (res) => {
    //       console.log('改变状态', res);
    //     })
    //   },
    //   fail: function(detail) {
    //     console.log('失败', detail);
    //     that.setData({
    //       showType: 2
    //     })
    //   }
    // })
  },
  onClose(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  onBack() {
    let id = this.data.data.id;
    wx.navigateBack({
      delta: 1
    })
    // if (isFinish) {
    //   return;
    // }
    // util.Request('/admin/payment/update', {
    //   id: id,
    //   status: 3
    // }, 'GET', (res) => {
    //   console.log('关闭', res);
    //   if (res.data.code == 2000) {
    //     isFinish = true;
    //     wx.showToast({
    //       title: '已关闭',
    //       icon: 'none'
    //     })
    //     setTimeout(() => {
    //       wx.redirectTo({
    //         url: '../pay/pay',
    //       })
    //     }, 2000)
    //   } else {
    //     wx.showToast({
    //       title: '关闭失败，请重试',
    //       icon: 'none'
    //     })
    //   }
    // })

  },
  // 单条收款详情
  getReceivableDetail(id){
    util.PostRequest('Receivable/getReceivableDetail',{
      id:id
    },res=>{
      console.log(res,'收款详情');
      if(res.code == 200){
        res.data.price = res.data.price
        this.setData({
          data:res.data
        })
      }
    })
  },
  back() {
    wx.redirectTo({
      url: '../pay/pay',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options,'options');
    // if(options.id){
    //   console.log(options.id,'正常进入');
      
    //   this.setData({
    //     id:options.id
    //   })
    //   this.getReceivableDetail(options.id)
    // }else if(options.q){
    //   var scene = decodeURIComponent(options.q)
    //   let id=app.getURLdata(scene,'id')
    //   console.log(scene,'scene');
    //   console.log(id,'id')
    //   this.setData({
    //     id:id
    //   })
    //   this.getReceivableDetail(id)
    // }
    

    // let data = decodeURIComponent(options.data);
    // data = JSON.parse(data);
    // this.setData({
    //   data
    // })
    // if (getApp().isDebug) {
    //   this.testData();
    // } else {
    //   this.initData();
    // }
    // this.getName(true);
  },

  // getName(isFirst) {
  //   let that = this;
  //   util.Request('/wxApplets/tpUserInfo/getName', {}, 'GET', (res) => {
  //     console.log('获取姓名', res);
  //     if (res.data.code == 2000) {
  //       that.setData({
  //         initName: res.data.data,
  //         name: res.data.data
  //       })
  //       if (isFirst && !res.data.data) {
  //         that.showInput();
  //       }
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that=this
    
    
    if(this.options.id){
      console.log(this.options.id,'正常进入');
      if (wx.getStorageSync('token')) {
        console.log('有token')
        that.getReceivableDetail(this.options.id)
      } else {
        console.log('没有有token')
        wx.showToast({
          title: '还未授权，即将前往授权',
          icon:'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/auth/auth',
          });
        }, 1000)
      }
      this.setData({
        id:this.options.id
      })
      // this.getReceivableDetail(this.options.id)
    }else if(this.options.q){
      var scene = decodeURIComponent(this.options.q)
      let id=app.getURLdata(scene,'id')
      if (wx.getStorageSync('token')) {
        that.getReceivableDetail(id)
      } else {
        wx.showToast({
          title: '还未授权，即将前往授权',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/auth/auth',
          });
        }, 1000)
      }
      console.log(scene,'scene');
      console.log(id,'id')
      this.setData({
        id:id
      })
    }
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