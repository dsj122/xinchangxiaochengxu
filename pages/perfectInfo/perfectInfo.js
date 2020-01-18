// pages/perfectInfo/perfectInfo.js
import {
  citys
} from '../../utils/components/city.js';

const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fal: false,
    isShow: false,
    defaultPickData: [{
      code: '440000'
    }, {
      code: '440100'
    }, {
      code: '440103'
    }],
    listData: citys,
    name: null,
    city: ['', '', ''],
    company: null,
    tel: null,
    middle: null
  },

  // 提交
  onSubmission() {
    let that = this;
    // 测试用的
    // if (getApp().isDebug) {
    //   wx.navigateTo({
    //     url: '../index/index',
    //   })
    //   return;
    // }


    let data = this.data;

    let bool = app.checkMobile(data.tel);
    if (!bool) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号码',
      })
      return;
    }


    if (data.name == null || data.city[0] == '请选择您的地址' || data.company == null) {
      wx.showToast({
        icon: 'none',
        title: '请输入完整的信息',
      })
      return;
    }

    util.Requestnt('Register/registerForWechat', {
      openid:wx.getStorageSync('openid'),
      avatarUrl:wx.getStorageSync('avatarUrl'),
      gender:wx.getStorageSync('gender'),
      province:data.city[0],
      city:data.city[1],
      district:data.city[2],
      nickName:wx.getStorageSync('nickName'),
      phone:data.tel,
      companyname:data.company,
      real_name:data.name,
    }, "POST", (res) => {
      console.log('提交结果', res)
      if (res.code == 200) {
        wx.setStorageSync('token', res.token);
        wx.showToast({
          title: '注册成功!',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          });
        }, 1500);
      }
    });



  },

  showPick() {
    this.setData({
      isShow: true,
    })
  },

  sure(e) {
    let data = e.detail.choosedData;
    console.log(e.detail.choosedData);
    let city = [];
    city[0] = data[0].name;
    city[1] = data[1].name;
    city[2] = data[2].name;
    this.setData({
      isShow: false,
      city
    })
    console.log(this.data.city);
  },
  cancl() {
    this.setData({
      isShow: false,
    })
  },

  nameInput(e) {
    let name = e.detail.value;
    this.setData({
      name
    })
  },

  telInput(e) {
    let tel = e.detail.value;
    this.setData({
      tel
    })
  },

  companyInput(e) {
    let company = e.detail.value;
    this.setData({
      company
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.phone){
      this.setData({
        tel:options.phone
      })
    }
    // let tel = this.data.tel;
    // tel = options.tel;
    // if (options.middle) {
    //   this.setData({
    //     middle: Number(options.middle) + 1
    //   })
    // }
    // console.log('middle',this.data.middle);
    // this.setData({
    //   tel
    // })
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