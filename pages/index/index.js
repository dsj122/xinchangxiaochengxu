//index.js
// 导航栏
// let template=require('../../utils/components/template/template.js');

const util = require('../../utils/util.js');
import {
  MODEL
} from '../MODEL/MODEL.js';
const inter = new MODEL();

const app = getApp()
Page({
  data: {
    img: {
      guarImg: '/utils/image/a12.png',
      mainImg: '/utils/image/a13.png',
      assessImg: '/utils/image/xinf01.png',
    },
  },
  sss(){
    console.log("长按")
  },
  onLoad: function() {
    // this.initData();
  },

  initData() {

  },

  onShow: function() {
    let tabbar = this.selectComponent("#tabbar");
    tabbar.on(0);
    // this.checkAuth();
  },

  isCheckNew(type, cb) {
    let user = wx.getStorageSync('user');
    console.log('userData', user);
    if (!user.phone) {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    } else {
      if (cb) {
        cb()
      }
    }
  },


  checkAuth(type, cb) {
    let that = this;
    
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("授权了");
          wx.getUserInfo({
            success(res) {
              console.log(res);
            }
          })
          that.isCheckNew(type, cb);
        } else {
          wx.navigateTo({
            url: '/pages/auth/auth?middle=1',
          })
        }
      }
    })
  },

  onHide: function() {
    let tabbar = this.selectComponent("#tabbar");
    tabbar.init();
  },

  async onBtn(e) {
    let type = e.currentTarget.dataset.type;
    console.log(22222222222);
    
    wx.getStorage({
      key: 'token',
      success: (result)=>{
        if (type == 0) {
          wx.navigateTo({
            url: '../guarantee/guarantee',
          })
        } else if (type == 1) {
          wx.navigateTo({
            url: '../maintain/maintain',
          })
        } else {
          if (type == 2) {
            wx.navigateTo({
              url: '../speed/speed',
            })
          } else if (type == 3) {
            wx.navigateTo({
              url: '../evaluate/evaluate',
            })
          } else if (type == 4) {
            wx.navigateTo({
              url: '../checkOrder/checkOrder',
            })
          }
        }
      },
      fail: ()=>{
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
      },
      complete: ()=>{}
    });
    // return
    
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})