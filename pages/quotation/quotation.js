// pages/quotation/quotation.js
var context = null; // 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;

const util = require('../../utils/util.js');

//获取系统信息
wx.getSystemInfo({
  success: function(res) {
    canvasw = res.windowWidth; //设备宽度
    // canvash = res.windowWidth * 7 / 15;
    canvash = res.windowHeight
  }
});


Page({
  /**
   * 页面的初始数据
   */
  data: {
    item_index: null,
    item_imgSrc: null,
    src: '',
    isShow: false,
    isShowNone: false,
    isRectShow: false,
    isImgShow: false,
    sign_yes: '/utils/image/g06.png',
    sign_no: '/utils/image/g04.png',
    top_index: 0,
    top: [
      {
        name:'全部',
        num:0,
      },
      {
        name:'未确认',
        num:0,
      },
      {
        name:'已确认',
        num:0,
      }
    ],
    list: [],
    data: {
      pageNumber: 1,
      pageSize: 10
    },
    confirmNum: 0,
    no_confirmNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   list: []
    // })
    this.countQuote()
    this.initData();
    // 使用 wx.createContext 获取绘图上下文 context
    // context = wx.createCanvasContext('canvas');
    // context.beginPath()
    // context.setStrokeStyle('#000000');
    // context.setLineWidth(4);
    // context.setLineCap('round');
    // context.setLineJoin('round');
  },

  initData() {
    let data = this.data.data;
    let list = this.data.list;
    let that = this;
    let _data = {
      status: ''
    };
    // if (this.data.top_index != 0) {
    //   _data.status = this.data.top_index;
    // }
    let offer_status = this.data.top_index == 0 ? '' : this.data.top_index
    this.setData({
      isShowNone: false,
    })
    console.log(data);
    util.PostRequest('Quote/getQuote',{
      offer_status,
      page:data.pageNumber,
      size:data.pageSize
    },res=>{
      console.log(res,'获取我的报价');
      if(res.code == 200){
        list = list.concat(res.data.data);
        data.has_more = res.data.has_more
        that.setData({
          data,
          list
        })
      }
    })
    
    // util.Request('/wxApplets/index/getQuote', {
    //   pageNumber: data.pageNumber,
    //   pageSize: data.pageSize,
    //   status: _data.status
    // }, 'GET', (res) => {
    //   console.log('获取列表', res);
    //   if (res.data.code == 2000) {
    //     list = list.concat(res.data.data.list);
    //     that.setData({
    //       list,
    //       data: res.data.data
    //     })
    //     that.count();
    //   }
    //   that.setData({
    //     isShowNone: true
    //   })
    // })

  },

  testData() {
    let list = [{
        isConfirm: 0,
        number: 'HJQ132456',
        type: '零件',
        desc: '液压油、修理包',
        price: 200,
        name: '我',
        tel: '1304866666',
        img: null,
      },
      {
        isConfirm: 0,
        number: 'HJQ132456',
        type: '零件',
        desc: '液压油、修理包',
        price: 200,
        name: '我',
        tel: '1304866666',
        img: null,
      },
      {
        isConfirm: 0,
        number: 'HJQ132456',
        type: '零件',
        desc: '液压油、修理包',
        price: 200,
        name: '我',
        tel: '1304866666',
        img: null,
      },
      {
        isConfirm: 1,
        number: 'HJQ132456',
        type: '零件',
        desc: '液压油、修理包',
        price: 200,
        name: '我',
        tel: '1304866666',
        img: null,
      },
    ];
    this.setData({
      list
    })
  },
  // 统计各报价单数量
  countQuote(){
    let that=this
    let top=this.data.top
    util.PostRequest('Quote/countQuote',{},res=>{
      console.log(res,' 统计各报价单数量');
      if(res.code == 200){
        top[0].num =res.data.count
        top[1].num =res.data.unsigned
        top[2].num =res.data.signed
        that.setData({
          top
        })
      }
    })
  },
  //签名
  input(e) {
    let item = e.currentTarget.dataset.item;
    if (item.status == 2) {
      return
    }
    // let index = e.currentTarget.dataset.index;
    // this.setData({
    //   item_index: index
    // })
    // if (item.isConfirm == 1) {
    //   return;
    // }
    // this.setData({
    //   isShow: true,
    //   isRectShow: true,
    // })
    let data = encodeURIComponent(JSON.stringify(item));
    let id=item.id
    wx.navigateTo({
      url: '../sign/sign?data=' + data,
      // url: '../sign/sign?id=' + id,
    })
  },

  detail(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item);
    console.log(item.pdf_src,'util.pdfUrl');
    wx:wx.navigateTo({
      url: '../webviews/webviews?url=' + item.pdf_src,
    })
    if (!item.pdf_src) {
      return;
    }
    // this.setData({
    //   item_imgSrc: item.img,
    //   isRectShow: true,
    //   isImgShow: true,
    // })

    // return;
    wx.downloadFile({
      url: item.pdf_src,
      success: function(res) {
        let path = res.tempFilePath;
        wx.openDocument({
          filePath: path,
          success: function(res) {
            console.log('打开文档')
          }
        })
      },
      fail: function(res) {
        console.log('失败', res);
      }
    })


  },

  // 计算类型的数目
  count() {
    let list = this.data.list;
    let confirmNum = 0;
    let no_confirmNum = 0;

    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.status == 1) {
        no_confirmNum += 1;
      }
    }

    this.setData({
      no_confirmNum
    })
  },

  // 更换顶部类型
  changeTop(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index,'index');
    
    this.setData({
      top_index: index,
    })

    let data = this.data.data;
    data.pageNumber = 1;
    this.setData({
      list: []
    })
    this.initData();

  },

  // 删除
  deleter(e) {
    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    console.log(item.id);
    let that = this;
    wx.showModal({
      title: '确定删除？',
      content: '',
      success(res) {
        if (res.confirm) {
          that.del(index, item);
        } else if (res.cancel) {}
      }
    })
  },

  del(index, item) {
    let that = this;
    util.PostRequest('Quote/delQuote',{
      id:item.id
    },res=>{
      console.log(res,'删除报价单');
      if(res.code == 200){
        let list = that.data.list
        list.splice(index,1)
        that.setData({
          list
        })
        that.countQuote()
        wx.showToast({
          title: '删除成功!',
          icon: 'none',
          image: '',
          duration: 1000,
          mask: false,
        });
      }
    })
    // util.Request('/admin/quote/deleteQuoteByAdmin', {
    //   id: item.id
    // }, 'GET', (res) => {
    //   console.log('删除', res);
    //   if (res.data.code == 2000) {
    //     let index = e;
    //     let list = that.data.list;
    //     list.splice(index, 1);
    //     that.setData({
    //       list
    //     })
    //     that.count();
    //   }
    // })



  },

  // 拨打电话
  call(e) {
    let tel = e.currentTarget.dataset.tel;
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },

  close() {
    this.cleardraw();
    this.setData({
      isShow: false,
      isRectShow: false,
      isImgShow: false,
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
    this.countQuote()
    this.initData();
    // if (getApp().isDebug) {
    //   this.testData();
    // } else {
    //   this.setData({
    //     list: []
    //   })
      
    // }
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

  },
  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  //开始
  canvasStart: function(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
    //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

  },
  //过程
  canvasMove: function(event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);

    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function(event) {
    isButtonDown = false;
  },
  cleardraw: function() {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },

  // 生成图片
  saveImg: function() {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function(res) {
        console.log(res.tempFilePath)
        let list = that.data.list;
        let item = list[that.data.item_index];
        item.img = res.tempFilePath;
        item.isConfirm = 1;
        that.setData({
          list,
          isShow: false,
          isRectShow: false,
        })
        that.count();
        that.cleardraw();
      }
    })
  },

  //导出图片
  getimg: function() {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    //生成图片
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function(res) {
        console.log(res.tempFilePath);
        //存入服务器
        wx.uploadFile({
          url: 'a.php', //接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: { //HTTP 请求中其他额外的 form data 
            'user': 'test'
          },
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {}
        });
      }
    })
  }
})