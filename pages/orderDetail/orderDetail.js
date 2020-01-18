// pages/orderDetail/orderDetail.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    type:0,
    success_img: '../../utils/image/xinb02.png',
    fail_img: '../../utils/image/xinb01.png',
    imgUrl: wx.getStorageSync('imgUrl'),
    pj_Arr: [{
      item_name: '500小时保养',
      id: 1
    }, {
      item_name: '1000小时保养',
      id: 2
    }, {
      item_name: '1500小时保养',
      id: 3
    }, {
      item_name: '2000小时保养',
      id: 4
    }, {
      item_name: '其他定制',
      id: 5
    }, ],
  },

  initData(id,type) {
    let that = this;
    if(type == 1){
      this.getRepairMore()
    }else if(type == 2){
      this.getMaintainMore()
    }
    // util.Request('/wxApplets/index/orderDetail', {
    //   id: id
    // },'GET' ,(res) => {
    //   console.log(res);
    //   if (res.data.code == 2000) {
    //     let data = res.data.data;
    //     if (data.img_url) {
    //       let img_url = data.img_url.split(',');
    //       data.img_url = img_url;
    //     }
    //     that.setData({
    //       data
    //     })
    //   }
    // })
  },
  // 查看单条报修单详情
  getRepairMore(){
    let that=this
    util.PostRequest('Repair/getRepairMore',{
      id:that.data.id
    },res=>{
      console.log(res,'查看单条报修单详情');
      if(res.code == 200){
        if (res.data.image.length > 0) {
          let img_url = res.data.image.map(item=>{
            return item.url
          })
          res.data.img_url = img_url
        }
        that.setData({
          data:res.data
        })
      }
    })
  },
  // 查看单条保养单明细
  getMaintainMore(){
    let that=this
    util.PostRequest('Repair/getMaintainMore',{
      id:that.data.id
    },res=>{
      console.log(res,'查看单条保养单明细');
      if(res.code == 200){
        // if (res.data.image.length > 0) {
        //   let img_url = res.data.image.map(item=>{
        //     return item.url
        //   })
        //   res.data.img_url = img_url
        // }
        that.setData({
          data:res.data
        })
      }
    })
  },
  onOpent(e) {
    let all = [];
    console.log(this.data.data.img_url);
    
    all = all.concat(this.data.data.img_url);
    let url = this.data.imgUrl;
    for (let i = 0; i < all.length; i++) {
      all[i] = url + all[i];
    }
    console.log('all', all);
    let src = url + e.currentTarget.dataset.src;

    console.log(src);
    wx.previewImage({
      current: src,
      urls: all,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onVideo() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    this.setData({
      id:options.id,
      type:options.type
    })
    this.initData(options.id,options.type);
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