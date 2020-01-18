// pages/myEquip/myEquip.js
// let template = require('../../utils/components/template/template.js');
const util = require('../../utils/util.js');

import {
  MyEquipModel
} from './myEquipModel.js'
const inter = new MyEquipModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    qr_img: "/utils/image/e05.jpg",
    isDownLoad: false,
    list: [],
    data: {
      pageNumber: 1,
      pageSize: 10,
      has_more:false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (getApp().isDebug) {
      this.testData();
    } else {
      this.initData();
    }
  },

  initData() {
    let data = this.data.data;
    let list = this.data.list;
    let that = this;
    util.PostRequest('machine/getMyMachine',{
      page:data.pageNumber,
      size:data.pageSize
    },res=>{
      console.log(res,'我的设备');
      if(res.code==200){
        res.data.data.map(item=>{
          item.total_hour = parseFloat(item.total_hour).toFixed(2)
          item.mon_hour = parseFloat(item.mon_hour).toFixed(2)
          item.total_fuel = parseFloat(item.total_fuel).toFixed(2)
          return item
        })
        list = list.concat(res.data.data);
        data.has_more = res.data.has_more
        that.setData({
          // data: res.data.data,
          data,
          list
        })
      }
    })
    // util.Request('/wxApplets/index/getDevices', data, 'GET', (res) => {
    //   console.log('获取设备', res);
    //   res.data.data.list = that.arrangeList(res.data.data.list);
    //   if (res.data.code == 2000) {
    //     list = list.concat(res.data.data.list);
    //     that.setData({
    //       data: res.data.data,
    //       list
    //     })
    //   }
    // })
  },

  arrangeList(list) {
    let arr = list;
    for (let i of arr) {
      i.endTime = i.endTime.substring(0, 10);
      i.mFuel = parseInt(i.mFuel);
      i.mTime = parseInt(i.mTime);
    }
    return arr;
  },

  testData() {
    let list = [{
      hour: 32,
      workHour: 44,
      sauce: 24,
      date: "2018.01.21",
      pos: "广东省广东省广东省广东省",
      model: 1231,
      number: 'GBABAB123',
    }, {
      hour: 11,
      workHour: 22,
      sauce: 33,
      date: "2018.01.21",
      pos: "广东省广东省广东省广东省",
      model: 1231,
      number: 'GBABAB123',
    }, {
      hour: 11,
      workHour: 22,
      sauce: 33,
      date: "2018.01.21",
      pos: "广东省广东省广东省广东省",
      model: 1231,
      number: 'GBABAB123',
    }, ]
    this.setData({
      list,
    })
  },

  // 扫描二维码
  opentQr() {
    wx.previewImage({
      current: this.data.qr_img,
      urls: [this.data.qr_img],
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    // wx.scanCode({
    //   success: (res) => {
    //     // this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
    //     // that.setData({
    //     //   show: this.qr_img
    //     // })

    //   },
    //   fail: (res) => {

    //   },
    //   complete: (res) => {
    //   }
    // })
  },

  // 按到下载
  onDownLoad() {
    this.setData({
      isDownLoad: !this.data.isDownLoad,
    })
  },

  // 按到选购
  onBuy(e) {
    let url = e.currentTarget.dataset.url;
    console.log(url)
    if(url){
      wx.navigateToMiniProgram({
        appId: 'wx8d49e38e79c5416b',//跳到有赞
        path: url
      })
    }else{
      wx.navigateToMiniProgram({
        appId: 'wx8d49e38e79c5416b',//跳到有赞
      })
    }
    // return
    // wx.navigateTo({
    //   url: '../myEquipDetail/myEquipDetail?url=' + url,
    // })
    // wx.navigateTo({
    //   url: '/pages/webviews/webviews?url=' + url,
    // });
    
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
    let tabbar = this.selectComponent("#tabbar");
    tabbar.on(1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let tabbar = this.selectComponent("#tabbar");
    tabbar.init();
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
    let data = this.data.data;
    if (!data.has_more) {
      wx.showToast({
        title: '已经到底了哦~',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return;
    }
    data.pageNumber += 1;
    this.setData({
      data
    });
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})