// pages/checkOrder/checkOrder.js
import {
  CheckOrderModel
} from './checkOrderModel.js'

const inter = new CheckOrderModel();

const util = require('../../utils/util.js');
var startX, startY, endX, endY;
var isMove = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTypeArr: [{
      name: '全部',
      value: ''
    }, {
      name: '报修',
      value: 1
    }, {
      name: '保养',
      value: 2
    }],
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
    type: 0,
    list: [],
    top_index:null,
    data: {
      pageNumber: 1,
      pageSize: 10,
      has_more:false,
    }
  },

  testData() {
    let list = [{
        order_type: 0,
        number: 52324564,
        isHandle: true,
        model: '320D2',
        create_time: '2018.01.02'
      },
      {
        order_type: 1,
        number: 52324564,
        isHandle: true,
        model: '320D2',
        create_time: '2018.01.02',
      },
      {
        order_type: 0,
        number: 52324564,
        isHandle: false,
        model: '320D2',
        create_time: '2018.01.02',
        project_name: '项目名称'
      }, {
        order_type: 0,
        number: 52324564,
        isHandle: true,
        model: '320D2',
        create_time: '2018.01.02'
      }, {
        order_type: 0,
        number: 52324564,
        isHandle: true,
        model: '320D2',
        create_time: '2018.01.02'
      },
    ]
    this.setData({
      list
    });
  },

  initData(bool) {
    console.log(bool,'bool');
    let data = this.data.data;
    data.type = this.data.type;
    if(!bool){
      data.pageNumber = 1
      this.setData({
        data
      })
    }
    this.getRepairAll(this.data.type,bool)
  },
  // 查看报修、保养单
  getRepairAll(type,bool){
    let that=this
    let data=this.data.data
    if(type==0)
      type=''
    util.PostRequest('Repair/getRepairAll',{
      page:data.pageNumber,
      size:data.pageSize,
      type:type
    },res=>{
      console.log(res,'查看报修、保养单');
      if(res.code == 200){
        let list=that.data.list
        let data=that.data.data
        list = bool?list.concat(res.data.data):res.data.data
      
        data.has_more = res.data.has_more
        that.setData({
          list,
          data
        })
        console.log(that.data.list);
        
      }
    })
  },
  touchStart(e) {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
    isMove = true;
  },

  touchEnd(e) {
    isMove = true;
  },

  touchMove(e) {
    endX = e.touches[0].pageX;
    endY = e.touches[0].pageY;


    if (isMove) {
      if (Math.abs(endY - startY) > 50) {
        return;
      }

      if (endX - startX > 120) {
        console.log('move Left');
        this.moveArrow(0);
        isMove = false;
      }
      if (startX - endX > 120) {
        console.log('move Right');
        this.moveArrow(1);
        isMove = false;
      }
    }
  },
  moveArrow(type) {
    let _type = type;
    console.log(_type);
    // if (_type == 0) {
    //   if (this.data.top_index == -1) {
    //     return;
    //   }

    // } else {
    //   if (this.data.top_index == 2) {
    //     return;
    //   }
    // };

    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    if (_type == 0) {
      console.log("向左");
      
      animation.opacity(0.2).translate(500, 0).step();
    } else {
      console.log("向右边");
      animation.opacity(0.2).translate(-500, 0).step();
    }
    this.setData({
      ani1: animation.export()
    })
    let that = this;
    setTimeout(() => {
      let type = that.data.type;
      if (_type == 0) {
        that.setData({
          top_index: type - 1
        })
      } else {
        that.setData({
          top_index: type + 1
        })
      }
      this.changeTop();
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'step-start',
        delay: 100
      });
      if (_type == 1) {
        console.log();
        
        animation.opacity(1).translate(0, 0).step();
      } else {
        animation.opacity(1).translate(-0, 0).step();
      }
      this.setData({
        ani1: animation.export()
      })

    }, 500)

  },
  changeTop(e) {
    let type;
    if (e) {
      type = e.currentTarget.dataset.index;
    } else {
      if (this.data.top_index <0 || this.data.top_index >2) {
        return
      }
      type = this.data.top_index;
    }
    // type = e.currentTarget.dataset.index;
    // if (showType == this.data.showType) {
    //   return;
    // }
    // if (type == this.data.type) {
    //   return;
    // }
    this.setData({
      list: [],
      type
    })
    this.initData(false);
  },

  onDetail(e) {
    let id = e.currentTarget.dataset.item.id;
    let type = e.currentTarget.dataset.item.type;
    console.log(type,'type');
    
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + id + '&type='+type
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.initData(false);
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
    let data = this.data.data;
    if (!data.has_more) {
      return;
    }

    data.pageNumber += 1;
    this.setData({
      data
    })
    this.initData(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})