// pages/question/question.js

import {
  QuestionModel
} from './questionModel'

const inter = new QuestionModel();

const util = require('../../utils/util.js');
const app = getApp();


// 是否在上传
let isUpload = false;
// 是否按了提交
let isSub = false;
// 是否提交完
let isFinish = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: wx.getStorageSync('imgUrl'),
    data: {},
    isShowAuth: false,
    index: '',
    id: '',
  },

  setIndex(e) {
    let index = e.currentTarget.dataset.index;
    console.log('index', index);
    this.setData({
      index
    })
  },

  // 重来
  onAgain() {
    let index = this.data.index;
    let data = this.data.data;
    let question_detail = data.question_detail;
    question_detail[index].src = '';
    this.setData({
      data,
    })
  },

  recorderStop: function(event) {
    let recorder = event.detail.src;
    let index = this.data.index;
    let data = this.data.data;
    let question_detail = data.question_detail;

    let that = this
    that.isUpload = true;
    app.uploadVoice(recorder,(recordid) => {
      that.isUpload = false;
      question_detail[index].recordid = recordid;
      that.setData({
        data
      })
    });

  },

  showAuth() {
    this.setData({
      isShowAuth: true
    })
  },

  hideAuth() {
    this.setData({
      isShowAuth: false
    })
  },

  onSub() {
    if (this.isFinish) {
      return;
    }
    let that = this;
    let data = this.data.data;
    let question_detail = JSON.parse(JSON.stringify(data.question_detail));
    for (let i of question_detail) {
      // 量表题
      if (i.type == 1) {
        if (i.require == 1 && !i.answer) {
          wx.showToast({
            title: '请填写完整的题目',
            icon: 'none'
          })
          return;
        }
      } else {
        if (i.require == 1) {
          if (!i.answer && !i.recordid) {
            wx.showToast({
              title: '请填写完整的题目',
              icon: 'none'
            })
            return;
          }
        }
      }
    }

    let _data = {};
    _data.detail = {
      id: this.data.id,
      result: question_detail
    }
    console.log('提交数据', _data);
    if (this.isUpload) {
      wx.showToast({
        icon: 'none',
        title: '请等待语音上传完成，再重新提交',
      })
    }
    util
    util.Request('/wxApplets/index/subWrite', _data, 'GET', (res) => {
      console.log('提交', res);
      if (res.data.code == 2000) {
        that.isFinish = true;
        wx.showToast({
          title: '提交成功',
        })
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    })
  },

  input(e) {
    let desc = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let data = this.data.data;
    let question_detail = data.question_detail;
    question_detail[index].answer = desc;
    this.setData({
      data,
      index
    })
  },

  pick(e) {
    let data = this.data.data;
    let question_detail = data.question_detail;
    let index = e.currentTarget.dataset.index;
    let value = e.currentTarget.dataset.value;
    question_detail[index].answer = value;
    this.setData({
      data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.initData(options.id);
  },

  initData(id) {
    let that = this;
    util.PostRequest('Evaluate/getEvaluateDetail',{
      id:id
    },res=>{
      console.log(res,'获取题目');
      if(res.code == 200){
        let arr = res.data.question_detail
        for(let value of arr){
          if(value.type ==1){
            value.answer = Number((res.data.score));
          }else{
            value.answer = ''
            value.recordid = ''
          }
        }
        that.setData({
          data: res.data
        })
      }
    })
    // util.Request('/wxApplets/index/serviceWrite', {
    //   id: id
    // }, 'GET', (res) => {
    //   console.log('获取问卷', res.data.data);
    //   if (res.data.code == 2000) {
    //     let arr = res.data.data.questionnaire;
    //     for (let i of arr) {
    //       if (i.topic_type == 0) {
    //         i.answer = Number((res.data.data.fraction_system));
    //       } else {
    //         i.answer = '';
    //         i.url = '';
    //       }
    //     }
    //     that.setData({
    //       data: res.data.data
    //     })
    //   }
    // })
  },

  testData() {
    let list = [{
      title: '整体满意度——您对我们此次服务的整体满意度'
    }, {
      title: '有效性——维修人员按与您预约的时间到达现场'
    }, {
      title: '沟通与态度——维修人员与您的沟通和服务态度'
    }, {
      title: '完工期——这次服务的完成的时间'
    }, {
      title: '准备工作——准备是否充分'
    }, {
      title: '服务质量——工作人员的服务质量，为您正确解决故障问题'
    }, {
      title: '安全环保意识——工作中信昌员工注意安全操作、注意环保'
    }, {
      title: '开票相符性——我们公司报价的金额与开发票的金额一致'
    }, {
      title: '再次选择信昌服务——从这次服务的情况来看，您会继续选择我们公司做服务的可能性'
    }, {
      title: '推荐信昌服务——您会向其他人推荐我们公司服务的可能性'
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