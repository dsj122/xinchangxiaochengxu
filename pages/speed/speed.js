// pages/speed/speed.js
var startX, startY, endX, endY;
var isMove = true;
const util = require('../../utils/util.js')

import {
  SpeedModel
} from './speedModel.js';
const inter = new SpeedModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allNum: 0,
    guaNum: 0,
    workNum: 0,
    finish: 0,
    ani1: null,
    top_index: -1,
    top: [{
      name: '全部',
      value: -1
    }, {
      name: '已报修',
      value: 0
    }, {
      name: '工作中',
      value: 1
    }, {
      name: '已完工',
      value: 2
    }],
    list: [],
    data: {
      pageNumber: 1,
      pageSize: 10,
      has_more:false,
    },

    no_workImg: '../../utils/image/c05.png',
    workImg: '../../utils/image/c08.png',
    no_finishImg: '../../utils/image/c06.png',
    finishImg: '../../utils/image/c09.png',
    pointImg: '../../utils/image/c07.png',
    b_pointImg: '../../utils/image/c04.png',
    isGet: false,
  },

  changeTop(e) {
    let top_index;
    if (e) {
      top_index = e.currentTarget.dataset.index;
    } else {
      top_index = this.data.top_index;
    }
    let data = this.data.data;
    data.pageNumber = 1;
    this.setData({
      top_index,
      list: [],
      data
    })
    this.initData(top_index+1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.initData();
  },
  // 统计各报价单数量
  countQuote(){
    let that=this
    let top=this.data.top
    util.PostRequest('Speed/CountSpeed',{},res=>{
      console.log(res,' 统计各报价单数量');
      if(res.code == 200){
        top[0].num =res.data.count
        top[1].num =res.data.create
        top[2].num =res.data.work
        top[3].num =res.data.finsh
        that.setData({
          top
        })
      }
    })
  },
  initData() {
    let that = this;
    let data = this.data.data;
    let list = this.data.list;
    // data.type = this.data.top_index;
    let type = this.data.top_index == -1 ? '' : this.data.top_index+1
    // if (data.type == -1) {
    //   data.type = '';
    // }
    if (data.type == -1) {
      data.type = '';
    }
    this.setData({
      isGet: true
    })

    console.log('data', data);
    util.PostRequest('Speed/getCelOrderSpeed',{
      type:type,
      page:data.pageNumber,
      size:data.pageSize
    },res=>{
      console.log(res,'服务进度列表');
      if(res.code==200){
        list = list.concat(res.data.data);
        data.has_more = res.data.has_more
        that.setData({
          list,
          data: data,
          isGet: false
        })
        console.log(list,'list');
        that.countQuote()
      }
    })
    // util.Request('/wxApplets/celOrder/getCelOrder', data, 'GET', (res) => {
    //   console.log('获取列表', res);
    //   if (res.data.code == 2000) {
    //     res.data.data.list = that.rank(res.data.data.list);
    //     list = list.concat(res.data.data.list);
    //     that.setData({
    //       list,
    //       data: res.data.data,
    //       isGet: false
    //     })
    //   }
    // })
  },

  rank(_list) {
    let list = JSON.parse(JSON.stringify(_list));
    for (let i in list) {
      let item = list[i];
      item.create_time = item.create_time.substring(0, 10);
      if (item.finishTime) {
        item.finishTime = item.finishTime.substring(0, 10);
      }
      if (item.workTime) {
        item.workTime = item.workTime.substring(0, 10);
      }
    }
    return list;
  },

  countNum() {
    let list = this.data.list;
    let allNum = list.length;
    let guaNum = 0;
    let workNum = 0;
    let finishNum = 0;
    for (let i = 0; i < list.length; i++) {
      let type = list[i].type;
      if (type == 0) {
        guaNum += 1;
      } else if (type == 1) {
        workNum += 1;
      } else if (type == 2) {
        finishNum += 1;
      }
    }
    this.setData({
      allNum,
      guaNum,
      workNum,
      finishNum,
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
    if (_type == 0) {
      if (this.data.top_index == -1) {
        return;
      }

    } else {
      if (this.data.top_index == 2) {
        return;
      }
    };

    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    if (_type == 0) {
      animation.opacity(0.2).translate(500, 0).step();
    } else {
      animation.opacity(0.2).translate(-500, 0).step();
    }
    this.setData({
      ani1: animation.export()
    })
    let that = this;
    setTimeout(() => {
      let top_index = that.data.top_index;
      if (_type == 0) {
        that.setData({
          top_index: top_index - 1
        })
      } else {
        that.setData({
          top_index: top_index + 1
        })
      }

      this.changeTop();


      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'step-start',
        delay: 100
      });
      if (_type == 1) {
        animation.opacity(1).translate(0, 0).step();
      } else {
        animation.opacity(1).translate(-0, 0).step();
      }
      this.setData({
        ani1: animation.export()
      })

    }, 500)

  },

  testData() {
    let list = [{
      server: '更换空气滤芯',
      type: 1,
      guaDate: '2018.2.11',
      workDate: '2018.2.14',
      model: '320D2',
      number: 'GTA503'
    }, {
      server: '更换空气滤芯',
      type: 0,
      guaDate: '2018.2.11',
      model: '320D2',
      number: 'GTA503'
    }, {
      server: '更换空气滤芯',
      type: 1,
      guaDate: '2018.2.11',
      workDate: '2018.2.14',
      model: '320D2',
      number: 'GTA503'
    }, {
      server: '更换空气滤芯',
      type: 2,
      guaDate: '2018.2.11',
      workDate: '2018.2.14',
      finishDate: '2018.2.22',
      model: '320D2',
      number: 'GTA503'
    }, {
      server: '更换空气滤芯',
      type: 1,
      guaDate: '2018.2.11',
      workDate: '2018.2.14',
      model: '320D2',
      number: 'GTA503'
    }, ]
    this.setData({
      list
    })
    this.countNum();
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
    let top_index=this.data.top_index
    if (!data.has_more) {
      wx.showToast({
        title: '已经到底了哦~',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      return;
    }
    data.pageNumber += 1;
    this.setData({
      data
    })
    console.log(top_index,'top_index');
    
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})