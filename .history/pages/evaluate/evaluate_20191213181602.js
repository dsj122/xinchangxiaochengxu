// pages/evaluate/evaluate.js
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    data: {
      pageNumber: 1,
      pageSize: 10
    },
    isGet: false,
  },

  onItem(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../question/question?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      
  },

  initData() {
    let that = this;
    let data = this.data.data;
    let list = this.data.list;
    this.setData({
      isGet:true
    })
    util.PostRequest('Evaluate/getEvaluate',{
      page:data.pageNumber,
      size:data.pageSize
    },res=>{
      console.log(res);
      if(res.code == 200){
        list =list.concat(res.data.data);
        data.has_more = res.data.has_more
        that.setData({
          data,
          list
        })
      }
      that.setData({
        isGet:false,
      })
    })
    // util.Request("/wxApplets/index/serviceAss", data, "GET", (res => {
    //   console.log("获取服务评价", res)
    //   if (res.data.code == 2000) {
    //     list = list.concat(res.data.data.list);
    //     _that.setData({
    //       list,
    //       data: res.data.data,
    //     })
    //   };
    //   _that.setData({
    //     isGet:false,
    //   })
    // }))
  },

  testData() {
    let list = [{
      type: '维修',
      model: '123D',
      number: '321',
      serverDate: '2018-12-12',
      finishDate: '2018-12-12',
    }, {
      type: '维修',
      model: '123D',
      number: '321',
      serverDate: '2018-12-12',
      finishDate: '2018-12-12',
    }, {
      type: '维修',
      model: '123D',
      number: '321',
      serverDate: '2018-12-12',
      finishDate: '2018-12-12',
    }, {
      type: '维修',
      model: '123D',
      number: '321',
      serverDate: '2018-12-12',
      finishDate: '2018-12-12',
    }, {
      type: '维修',
      model: '123D',
      number: '321',
      serverDate: '2018-12-12',
      finishDate: '2018-12-12',
    }, ];
    this.setData({
      list
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
    if(this.data.list){
      this.setData({
        list:[]
      })
    }
    this.initData()
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
    })
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})