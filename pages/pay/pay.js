// pages/pay/pay.js
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payTypeArr: [{
      name: '已付款',
      id: 1
    }, {
      name: '待付款',
      id: 0
    }, {
      name: '全部',
      id: '-1'
    }],
    payType: 0,
    moneyTypeArr: ['全部', '零件款', '维修款', '新机设备款', '发电机组/太阳能光伏款', '二手旧机款', '设备租金款'],
    moneyType: -1,
    isShow: false,
    isShowPick: false,
    data: {
      pageNumber: 1
    },
    date: null,
    datetophp:null,
    createdate:null,//页面刚创建的时间
    list: [],
    total_num:0,
    total_price:0,
    pageNumber:1,
    endPage:false,
  },

  sure(obj) {
    console.log(obj,'sure');
    
    // let date = obj.detail.date;
    let date =obj.detail.dateArr[0]+'年'+obj.detail.dateArr[1] + '月'
    let datetophp=obj.detail.dateArr[0]+'-'+obj.detail.dateArr[1]
    this.setData({
      date,
      datetophp
    })
    console.log(this.data.date,',',this.data.datetophp);
    this.setData({
      pageNumber:1
    })
    this.countBill(datetophp)
    this.initData(false)
    this.cancl();
  },

  cancl() {
    this.setData({
      isShowPick: false,
    })
  },

  // 切换顶部类型
  changeType(e) {
    let payType = e.currentTarget.dataset.item.id;
    
    console.log('type', payType);
    this.setData({
      payType
    })
    this.setData({
      pageNumber:1,
      list: []
    })
    this.initData();
  },

  showPick() {
    this.setData({
      isShowPick: true,
    })
  },

  // 0显示 1关闭
  changeIsShow(e) {
    let index = e.currentTarget.dataset.index;

    let isShow = false;
    if (index == 0) {
      if (this.data.isShow) {
        return;
      }
      isShow = true;
    }
    this.setData({
      isShow
    })
  },

  arrangeList() {
    let data = this.data.data;
    let list = data.list;
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      let type = item.order_type;
      if (type == 0) {
        item.order_type_text = "待付款";
        item.img = '../../utils/image/xind04.png';
      } else if (type == 1) {
        item.order_type_text = "已付款";
        item.img = '../../utils/image/xind03.png'
      } else if (type == 2) {
        item.order_type_text = "已关闭";
        item.img = '../../utils/image/xind05.png'
      } else if (type == 3) {
        item.order_type_text = "已拒绝"
        item.img = '../../utils/image/xind06.png'
      }
    }
    this.setData({
      data
    })
  },

  // 切换选择显示类型
  changeShowType(e) {
    let moneyType = e.currentTarget.dataset.type;//index
    this.setData({
      moneyType
    })
    this.setData({
      pageNumber:1,
      isShow:false
    })
    this.initData()

    // let data = this.data.data;
    // data.pageNumber = 1;
    // this.setData({
    //   list: [],
    //   data
    // })
    // this.initData();
  },

  // 关闭交易
  closePay(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;

    util.PostRequest('Receivable/closeOrder',{
      id: item.id,
    },res=>{
      console.log(res,'关闭交易');
      if(res.code == 200){
        that.initData()
        wx.showToast({
          title: '关闭交易成功',
          icon: 'none',
          image: '',
          duration: 1000,
          mask: false,
        });
      
      }
    })


    // util.Request('/admin/payment/update', {
    //   id: item.id,
    //   status: 3
    // }, 'GET', (res) => {
    //   console.log('关闭', res);
    //   if (res.data.code == 2000) {
    //     wx.showToast({
    //       title: '已关闭',
    //       icon: 'none'
    //     })
    //     that.initData();
    //   } else {
    //     wx.showToast({
    //       title: '关闭失败，请重试',
    //       icon: 'none'
    //     })
    //   }
    // })
  },

  // 去交易
  toPay(e) {
    let item = e.currentTarget.dataset.item;
    let id=item.id
    // item = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '../comfirmPay/comfirmPay?id=' + id,
    })
  },

  bindDateChange(e) {

  },

  testData() {
    let data = {};
    data.list = [{
        order_type: 0,
        money: 1000,
        city: '广东省',
        company: '信昌机器华南分公司',
        pay_type: '类别1',
        head: '信昌机器华南分公司',
        create_time: '5月21日 10：15',
      },
      {
        order_type: 1,
        money: 1000,
        city: '广东省',
        company: '信昌机器华南分公司',
        pay_type: '类别1',
        head: '信昌机器华南分公司',
        create_time: '5月21日 10:15',
        pay_time: '5月22日 12:15',
      },
      {
        order_type: 2,
        money: 1000,
        city: '广东省',
        company: '信昌机器华南分公司',
        pay_type: '类别1',
        head: '信昌机器华南分公司',
        create_time: '5月21日 10:15',
      },
      {
        order_type: 3,
        money: 1000,
        city: '广东省',
        company: '信昌机器华南分公司',
        pay_type: '类别1',
        head: '信昌机器华南分公司',
        create_time: '5月21日 10:15',
      },
    ]
    let list = [];



    this.setData({
      data,
      listData: list
    })
    console.log(list);
    this.countALLMoney();
    this.arrangeList();
  },
  //获取列表
  initData(bool) {
    // let data = this.data.data;
    // let list = this.data.list;
    // let date = this.data.date;
    // data.payType = this.data.payType;
    // if (data.payType == -111) {
    //   data.payType = '';
    // }
    // data.moneyType = this.data.moneyType;

    // let month = date[1] + 1;
    // if (month < 10) {
    //   month = '0' + month;
    // }
    // data.time = 2000 + date[0] + '-' + month;
    // console.log('data', data);
    // util.Request('/wxApplets/index/getPayment', data, 'GET', (res) => {
    //   console.log('获取列表', res);
    //   if (res.data.code == 2000) {
    //     list = list.concat(res.data.data.list);
    //     this.setData({
    //       data: res.data.data,
    //       list
    //     })
    //   }
    // })
    let that=this
    let pay_status= that.data.payType >= 0 ? (that.data.payType == 0 ? 1 : 2 ) : ''
    util.PostRequest('Receivable/getReceivableList',{//获取列表
      pay_status:pay_status,
      page:that.data.pageNumber,
      size:10,
      category:that.data.moneyType > -1? that.data.moneyTypeArr[that.data.moneyType].id:'',
      date:that.data.datetophp ? that.data.datetophp : ''
    },res=>{
      console.log(res,'获取列表');
      if(res.code == 200){
        let list = that.data.list
        list = bool ? list.concat(res.data.data): res.data.data
        that.setData({
          list:list,
          endPage:res.data.has_more ? false :true
        })
      }
    })
  },

  setMoneyType() {
    let that = this;
    util.Request('/admin/payment/getDict', {
      type: 0
    }, 'GET', (res) => {
      console.log('获取类型', res);
      if (res.data.code == 2000) {
        let moneyTypeArr = res.data.data;
        moneyTypeArr.splice(0, 0, {
          name: '全部',
          id: ''
        })
        that.setData({
          moneyTypeArr
        })
      }
    })
  },

  countALLMoney() {
    let data = this.data.data;
    let list = data.list;
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += list[i].money;
    }
    data.sum = sum;
    this.setData({
      data
    })
  },
  //统计成交数量 及金额
  countBill(date){
    let that=this
    util.PostRequest('Receivable/countBill',{
      date:date
    },res=>{
      console.log(res,'统计成交数量 及金额');
      if(res.code == 200){
        that.setData({
          total_num:res.data[0].num,
          total_price:res.data[0].total_price
        })
      }
      
    })
  },
  // 获取款项类型
  getCategory(){
    let that=this
    util.PostRequest('Receivable/getCategory',{},res=>{
      console.log(res,'获取款项类型');
      if(res.code == 200){
        let all=[{
          id:'',
          name: "全部",
          status:1
        }]
        res.data = all.concat(res.data)
        that.setData({
          moneyTypeArr:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that =this
    this.setData({
      createdate:app.getFormatDateformonth(new Date()),
      datetophp:app.getFormatDateformonth(new Date()),
      date:app.getChineseMonth(new Date()),
    })
    this.getCategory()
    this.countBill(this.data.datetophp)
    // let date = [];
    // let year = new Date().getFullYear();
    // date[0] = year - 2000;

    // date[1] = new Date().getMonth();
    // this.setData({
    //   date
    // })

    // if (getApp().isDebug) {
    //   this.testData();
    // } else {
    //   this.setMoneyType();
    // }
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
    tabbar.on(3);
    this.initData(false);
    // this.initData();
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
    if(this.data.endPage){
      wx.showToast({
        title: '已经到底了哦~',
        icon: 'none',
        image: '',
        duration: 1000,
      });
      return
    }
     
    this.setData({
      pageNumber:this.data.pageNumber+1
    })
    this.initData(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})