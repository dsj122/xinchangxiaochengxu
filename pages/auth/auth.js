const app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrl: '/imgs/'
  },
  onLoad: function(options) {
    // app.editTabBar(); //添加tabBar数据 
    let middles = options.middle || ''
    this.setData({
      middles
    })
    console.log('auth')
    // this.getAgreement();
    let that = this;
    // 查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log('授权了222222222')

    //       wx.getUserInfo({
    //         success: function(res) {
    //           that.isCheckNew();
    //           app.getInfo(() => {
    //             wx.navigateBack({
    //               delta: 1,
    //             })
    //           })
    //           let sessionId = wx.getStorageSync('sessionId')
    //           if (!sessionId) {
    //             app.getUserInfo()
    //             return
    //           }
    //           //用户已经授权过
    //           if (middle == 1) {
    //             // wx.navigateBack({
    //             //   delta: 1,
    //             // })
    //             wx.navigateTo({
    //               url: '/pages/pay/pay',
    //               success: function(res) {},
    //               fail: function(res) {},
    //               complete: function(res) {},
    //             })
    //           } else {
    //             that.toIndex()
    //           }
    //         }
    //       });
    //     } else {
    //       app.getInfo(() => {
    //         wx.navigateBack({
    //           delta: 1,
    //         })
    //       })
    //     }
    //   }
    // })
  },

  isCheckNew() {
    // let user = wx.getStorageSync('user');
    // console.log('userData', user);
    // if (!user.phone) {
    //   wx.navigateTo({
    //     url: '../bindPhone/bindPhone',
    //   })
    // }
  },

  // toIndex() {
  //   let that = this
  //   wx.showLoading({
  //     title: '登陆中',
  //     mask: true,
  //   })
  //   let sessionId = wx.getStorageSync('sessionId')
  //   if (!sessionId) {
  //     setTimeout(function() {
  //       that.toIndex()
  //     }, 300)
  //     return
  //   }
  //   wx.hideLoading()
  //   wx.reLaunch({
  //     url: '/pages/index/index'
  //   })
  // },
  bindGetUserInfo: function(e) {
    let that = this
    console.log(e.detail.userInfo,'e.detail.userInfo');
    
    if (e.detail.userInfo) {
      wx.login({
        success(res) {
          console.log(res)
          wx.setStorageSync('avatarUrl',e.detail.userInfo.avatarUrl)
          wx.setStorageSync('city',e.detail.userInfo.city)
          if(e.detail.userInfo.gender == 1){
            wx.setStorageSync('gender','男')
          }else if(e.detail.userInfo.gender == 2){
            wx.setStorageSync('gender','女')
          }else{
            wx.setStorageSync('gender','未知')
          }
          wx.setStorageSync('province',e.detail.userInfo.province)
          wx.setStorageSync('nickName',e.detail.userInfo.nickName)
          // return
          util.getToken({
            code:res.code
          },res=>{
            console.log(res,'getTokenjs');
            if(res.code == 200){
              wx.setStorageSync('token',res.token.token);
              // wx.reLaunch({
              //   url: '/pages/index/index',
              // });
              wx.navigateBack({
                delta: 1
              });
            }
            // wx.setStorageSync('openid',res.openid)
          })
        }
      })
      //用户按了允许授权按钮
      // let sessionId = wx.getStorageSync('sessionId')
      // app.getInfo(() => {
      //   that.isCheckNew();
      // },1)
      // if (!sessionId) {
      //   app.getInfo(() => {
      //     wx.navigateBack({
      //       delta: 1,
      //     })
      //   })
      // }
      // let middle = this.data.middle
      // setTimeout(function() {
      //   if (middle) {
      //     wx.navigateBack({
      //       delta: 1,
      //     })
      //   } else {
      //     that.toIndex()
      //     // wx.reLaunch({
      //     //   url: '/pages/index/index'
      //     // })
      //   }
      // , 800)
      // app.error('授权成功')
    } else {
      console.log("pppppppppppppppppppppppppp");
    }
  },


  getAgreement() {
    let that = this
    util.Request('/admin/protocol/protocolShow', {}, 'GET', function(res) {
      console.log('协议？', res)
      if (res.data.code == 2000) {
        if (res.data.data) {
          let release = res.data.data.release_content || 1
          let use = res.data.data.use_content
          wx.setStorageSync('release', release)
          wx.setStorageSync('use', use)
        }
      } else {
        console.log('获取分享失败')
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

})