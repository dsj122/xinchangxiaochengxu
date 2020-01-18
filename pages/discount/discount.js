// pages/discount/discount.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    data: {
      pageNumber: 1
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
    util.PostRequest('Quote/getDiscount',{},res=>{
      console.log(res,'获取优惠政策');
      if(res.code==200){
        list = list.concat(res.data);
        that.setData({
          list
        })
      }
    })
    // util.Request('/wxApplets/index/preferential', data, 'GET', (res) => {
    //   console.log(res);
    //   if (res.data.code == 2000) {
    //     list = list.concat(res.data.data.list);
    //     that.setData({
    //       list,
    //       data: res.data.data
    //     })
    //   }
    // })
  },

  testData() {
    let list = [{
        model: '320D2',
        name: '优惠1',
        by_date: '2019.12.1'
      }, {
        model: '320D2',
        name: '优惠1',
        by_date: '2019.12.1'
      }, {
        model: '320D2',
        name: '优惠1',
        by_date: '2019.12.1'
      },

    ]
    this.setData({
      list
    })
  },

  onDetail(e) {
    console.log("按到详情");
    let url = e.currentTarget.dataset.url;
    // wx.navigateTo({
    //   url: '../myEquipDetail/myEquipDetail?url=' + url,
    // })
    wx.navigateToMiniProgram({
      appId: 'wx8d49e38e79c5416b',//跳到有赞
    })
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
    // let data = this.data.data;
    // if (data.lastPage) {
    //   return;
    // }
    // data.pageNumber += 1;
    // this.setData({
    //   data
    // });
    // this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})