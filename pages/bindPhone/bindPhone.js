// pages/bindPhone/bindPhone.js
const app = getApp();
const util = require('../../utils/util.js');

import {
  MODEL
} from '../MODEL/MODEL.js';
const inter = new MODEL();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: null,
    code: null,
    time: null,
    middle: null
  },

  telInput(e) {
    let tel = e.detail.value
    this.setData({
      tel
    })
  },

  codeInput(e) {
    let code = e.detail.value
    this.setData({
      code
    })
  },

  toAgreement() {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },

  // 获取验证码
  onObtain() {
    let that=this
    if (this.data.time) {
      return;
    }

    let bool = app.checkMobile(this.data.tel)
    if (!bool) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号码',
      })
      return;
    }

    if (getApp().isDebug) {
      this.setData({
        time: 60
      })
      let interval = setInterval(() => {
        let time = this.data.time - 1;
        if (time <= 0) {
          clearInterval(interval)
        }
        this.setData({
          time
        })
      }, 1000)
      return
    }

    let data = {
      phone: this.data.tel
    }

    this.setData({
      time: 60
    })
    let interval = setInterval(() => {
      let time = this.data.time - 1;
      if (time <= 0) {
        clearInterval(interval)
      }
      this.setData({
        time
      })
    }, 1000)

    util.Requestnt("Register/sendverify",data, 'POST', (res) => {
      console.log('获取验证码', res);
    })
  },

  // 按到确认
  onConfirm() {
    let that = this;
    //测试用的
    // if (getApp().isDebug) {
    //   wx.navigateTo({
    //     url: '../perfectInfo/perfectInfo?tel=' + this.data.tel,
    //   })
    //   return;
    // }

    if (this.data.code == null || this.data.tel == null) {
      wx.showToast({
        icon: 'none',
        title: '请输入完整的信息',
      })
      return;
    }
    let bool = app.checkMobile(this.data.tel)
    if (!bool) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号码',
      })
      return;
    }
    util.Requestnt('Register/bandPhone', {
      openid:wx.getStorageSync('openid'),
      avatarUrl:wx.getStorageSync('avatarUrl'),
      gender:wx.getStorageSync('gender'),
      city:wx.getStorageSync('city'),
      province:wx.getStorageSync('province'),
      nickName:wx.getStorageSync('nickName'),
      phone:that.data.tel,
      verify:that.data.code
    }, "POST", (res) => {
      console.log('提交', res);
      if (res.code == 200) {
        wx.setStorageSync('token',res.token)
        wx.showToast({
          title: '绑定成功！',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          });
        }, 1500);
      } else {
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.middle) {
      this.setData({
        middle: options.middle
      })
    }
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