 // pages/maintain/maintain.js
 const app = getApp();
 const util = require('../../utils/util.js')

 import {
   MODEL
 } from '../MODEL/MODEL.js';
 const model = new MODEL();

 import {
   citys
 } from '../../utils/components/city.js';

 import {
   GuaranteeModel
 } from '../guarantee/guaranteeModel.js';
 const inter = new GuaranteeModel();

 // 是否在上传
 let isUpload = false;
 // 是否按了提交
 let isSub = false;
 // 是否提交完
 let isFinish = false;

 // 检测填写信息是否完整 不完整为true
 let isComplete = false;

 Page({
   /**
    * 页面的初始数据
    */
   data: {
     shownotFound: true,
     imgUrl: wx.getStorageSync('imgUrl'),
     pj_Arr: [],
     isShow: false,
     app_info: {},
     info: {},
     isShowModel: false,
     isShowNumber: false,
     isShowAuth: false,
     isShowTime: false,
     dateStart: '',
     isShowCity: false,
     cityListData: [],
     city: [{
       code: '440000'
     }, {
       code: '440100'
     }],
     showtext:true,
     subtn: false
   },

   checkAllNull() {
     let info = this.data.info;
     this.checkNull(info.date, '请选择预约时间');
     this.checkNull(info.project, '请选择保养项目');
     this.checkNull(info.model, '请填写机型');
     this.checkNull(info.number, '请填写机身编号');
     this.checkNull(info.hour, '请填写小时数');
     this.checkNull(info.province_city, '请选择省市');
     this.checkNull(info.pos, '请填写地址');
     this.checkNull(info.name, '请填写联系人');
     this.checkNull(info.tel, '请填写联系电话');
   },

   checkNull(value, text) {
     if (isComplete) {
       return;
     }
     if (!value) {
       wx.showToast({
         icon: 'none',
         title: text,
       })
       isComplete = true;
     } else {
       if (text == '请填写联系电话') {
         if (!getApp().checkMobile(value)) {
           wx.showToast({
             title: '请输入正确的手机号码',
             icon: 'none',
           })
           isComplete = true;
         }
       }
     }
   },

   getCity() {
    let that = this;
    // this.setData({
    //   cityListData:citys
    // })
    util.PostRequest('Repair/getProvincewithCity',{},res=>{
      console.log(res,'获取省市信息');
      if(res.code == 200){
          that.setData({
            cityList: res.data,
            cityListData: res.data,
          })
          
          // that.setCityListData();
      }
    })
   },
  //  获取保养项目
   getMaintainType(){
    let that=this
    util.GetRequest('Repair/getMaintainType',{},res=>{
      console.log(res,'获取保养项目');
      if(res.code == 200){
        that.setData({
          pj_Arr:res.data
        })
      }
    })
   },
   setCityListData() {
     console.log(citys,'citys');
     console.log(this.data.cityList,'cityList');
     
     let cityList = JSON.parse(JSON.stringify(this.data.cityList));
     let cityListData = [];
     for (let i of cityList) {
       for (let j of citys) {
         if (j.name.indexOf(i.name) >= 0) {
           i=j
           for (let k of i.children) {
             k.children = null;
           }
           
         }
       }
       if (!i.hasOwnProperty('children')) {
         i.children = [{
           name:''
         }]
       }else{
        for(let m of i.children){
          if(!m.hasOwnProperty('children')){
            m.children= null
            m.code="0000"
          }
        }
       }
       
       cityListData.push(i);
     }
     console.log(cityListData);
     
    this.setData({
      cityListData
    })
     console.log(this.data.cityListData,'cityListData');
     
   },


   onShowTimePick() {
     this.setData({
       showtext:false,
       isShowTime: true
     })
   },

   sure(obj) {
     let date = obj.detail.date;
     let info = this.data.info;
     info.date = date;
     console.log(obj,'obj');
     
     info.dateArr = obj.detail.dateArr;
     info.appointment_time = obj.detail.dateArr.join('-')
     console.log(info.dateArr);
     
     this.setData({
       info,
     })
     this.cancl();
   },

   cancl() {
     this.setData({
       isShowTime: false,
       showtext:true
     })
   },

   sure_city(e) {
     let data = e.detail.choosedData;
     console.log(e.detail.choosedData);
     let info = this.data.info;
     info.province_city = data[0].name + '-' + data[1].name;
     info.province=data[0].name
     info.city=data[1].name
     this.setData({
       isShowCity: false,
       showtext:true,
       info
     })
     console.log(this.data.info,'选择地址后');
     
   },
   cancl_city() {
     this.setData({
       isShowCity: false,
       showtext:true,
     })
   },


   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     let date = new Date();
     let y = date.getFullYear();
     let m = date.getMonth() + 1;
     let d = date.getDay();

     let dateStart = y + "-" + m + "-" + d;
     this.setData({
       dateStart
     })

     if (getApp().isDebug) {
       this.testData();
     } else {
      
      this.getCity();
      this.initData();
     }
   },

   initData() {
     let that = this;
     let app_info = that.data.app_info;
     let info = this.data.info;
      util.PostRequest('Repair/getMyModel',{},res=>{
        console.log(res,'获取机型');
        if(res.code == 200){
          let model=res.data.map(item=>{
            return item.model
          })
          app_info.model=[]
          app_info.model[0] = model;
          that.setData({
            app_info
          })
        }
      })
      that.getMaintainType()
     // 设置机型跟机身编号
    //  model.getNumandModel((data) => {
    //    let app_info = that.data.app_info;
    //    app_info.model = [];
    //    app_info.number = [];

    //    // 去重机型
    //    let modelArr = [];
    //    for (let i = 0; i < data.modelArr.length; i++) {
    //      let isFound = false;
    //      for (let j = 0; j < modelArr.length; j++) {
    //        if (data.modelArr[i] == modelArr[j]) {
    //          isFound = true;
    //        }
    //      }
    //      if (!isFound) {
    //        modelArr.push(data.modelArr[i]);
    //      }
    //    }

    //    app_info.model[0] = modelArr;
    //    app_info.number[0] = data.numberArr;
    //    that.setData({
    //      app_info,
    //    })
    //  })

    //  // 获取用户信息（名字 联系人 电话）
    //  model.getInfo((data) => {
    //    let info = {};
    //    info.pos = null
    //    info.name = data.data.real_name;
    //    info.tel = data.data.phone;
    //    info.isWork = true;
    //    that.setData({
    //      info
    //    })
    //  })
   },

   closeRect() {
     this.setData({
       isShow: false,
     })
   },

   rank(data) {
     let arr = data;
     let app_info = this.data;
     app_info.model = [];
     app_info.number = [];
     let modelArr = [];
     let numberArr = [];
     for (let i = 0; i < arr.length; i++) {
       modelArr.push(arr[i].model);
       numberArr.push(arr[i].serialNumber);
     }
     app_info.model[0] = modelArr;
     app_info.number[0] = numberArr;
     this.setData({
       app_info
     })



   },

   testData() {
     let app_info = app.app_info;
     console.log(app_info);

     let info = {};
     info.pos = app.info.pos;
     info.name = app.info.name;
     info.tel = app.info.tel;
     info.hour = app.info.hour;
     this.setData({
       info,
     })

     app_info = this.data.app_info;
     app_info.model = [];
     app_info.model[0] = app.info.model;
     app_info.number = [];
     app_info.number[0] = app.info.number;
     this.setData({
       app_info
     })
     console.log(this.data.app_info);
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

   recorderStop: function(event) {
     let recorder = event.detail.src;
     let that = this;
     that.isUpload = true;
     app.upload(recorder,3,(recorderid) => {
       that.isUpload = false;
       let info = that.data.info;
       info.recorder = recorderid;
       info.recorderurl=recorder
       this.setData({
         info
       })
     });
   },

   showPj() {
     this.setData({
       isShow: true
     })
   },

   onPj(e) {
     let project = e.currentTarget.dataset.item;
     let info = this.data.info;
     info.project = project;
     this.setData({
       info,
       isShow: false
     })
   },

   dateChange(e) {
     let date = e.detail.value;
     let info = this.data.info;
     info.date = date;
     this.setData({
       info
     })
   },

   isCheckNew() {
     let user = wx.getStorageSync('user');
     console.log('userData', user);
     if (!user.phone) {
       wx.navigateTo({
         url: '../bindPhone/bindPhone?middle=' + 0,
       })
     } else {
       this.onSub();
     }
   },


   checkAuth() {
     let that = this;
     let info =this.data.info
     if(!info.date){
      wx.showToast({
        title: '预约日期必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
     }
     if(!info.project){
      wx.showToast({
        title: '保养项目必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
     }
     if(!info.model){
      wx.showToast({
        title: '机型必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!app.info.reg.test(info.model)){
      wx.showToast({
        title: '机型只能由字母和数字组成!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.number){
      wx.showToast({
        title: '机身编号必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!app.info.reg.test(info.number)){
      wx.showToast({
        title: '机身编号只能由字母和数字组成!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.hour){
      wx.showToast({
        title: '小时数必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.province_city){
      wx.showToast({
        title: '省市必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.pos){
      wx.showToast({
        title: '详细地址必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.name){
      wx.showToast({
        title: '联系人必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
    if(!info.tel){
      wx.showToast({
        title: '联系电话必须填写!',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
      });
      return
    }
     if (!app.info.phoneRegexp.test(info.tel)) {
       wx.showToast({
         title: '联系电话格式错误!',
         icon: 'none',
         image: '',
         duration: 1000,
         mask: false,
       });
       return
     }
     this.setData({
       subtn: true
     })
     wx.showLoading({
       title: '提交中~',
     })
    util.PostRequest('Repair/commitMaintain',{
      model:info.model,
      serial_number:info.number,
      total_time:info.hour,
      province:info.province,
      city:info.city,
      address:info.pos,
      client_name:info.name,
      phone:info.tel,
      is_work:info.onWork? 0 : 1,
      explain:info.recorder,
      remark:info.desc ? info.desc : null,
      appointment_time:info.appointment_time?info.appointment_time:null,
      project:info.project? info.project.id:null
    },res=>{
      that.setData({
        subtn: false
      })
      wx.hideLoading()
      console.log(res,'提交');
      if(res.code == 200){
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          image: '',
          duration: 1000,
          mask: false,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        },1000);
      }
    })
    //  wx.getSetting({
    //    success: function(res) {
    //      if (res.authSetting['scope.userInfo']) {
    //        console.log("授权了");
    //        wx.getUserInfo({
    //          success(res) {
    //            console.log(res);
    //          }
    //        })
    //        that.isCheckNew();
    //      } else {
    //        wx.navigateTo({
    //          url: '/pages/auth/auth?middle=1',
    //        })
    //      }
    //    }
    //  })
   },

   onSub() {
     if (this.isSub) {
       wx.showToast({
         title: '已经提交了,请等待提交结果',
         icon: 'none'
       })
       return;
     }

     if (this.isFinish) {
       wx.showToast({
         title: '提交成功,请勿重复提交',
         icon: 'none'
       })
       return;
     }

     let that = this;
     let info = this.data.info;

     isComplete = false;
     this.checkAllNull();
     if (isComplete) {
       return;
     }

     let data = {};
     data.type = 1;
     data.appointmentDate = info.date;
     data.serial_number = info.number;
     data.model = info.model;
     data.location = info.pos;
     data.contact = info.name;
     data.contact_phone = info.tel;
     data.maintenanceItemId = info.project.id;
     data.appointment_date = info.dateArr[0] + '-' + info.dateArr[1] + '-' + info.dateArr[2];
     //  data.userId = wx.getStorageSync('user').id;
     data.hour = info.hour;
     data.province_city = info.province_city;
     if (info.recorder) {
       data.fault_description = info.recorder;
     }
     if (info.desc) {
       data.other_description = info.desc;
     }

     if (that.isUpload) {
       wx.showToast({
         title: '请等待上传完再提交',
         icon: 'none',
       })
     }
     console.log('提交数据', data);
     this.isSub = true;
     util.Request('/wxApplets/index/subOrder', data, 'GET', (res) => {
       console.log('提交', res)
       that.isSub = false;
       if (res.data.code == 2000) {
         that.isFinish = true;
         wx.showToast({
           icon: 'none',
           title: '提交成功！',
         })
         setTimeout(() => {
           wx.reLaunch({
             url: '../index/index',
           })
         }, 2000);
       } else {
         wx.showToast({
           icon: 'none',
           title: '请重新提交！',
         })
       }
     })

   },

   hourInput(e) {
     let value = e.detail.value;
     let info = this.data.info;
     info.hour = value;
     this.setData({
       info
     })
   },

   telInput(e) {
     let value = e.detail.value;
     let info = this.data.info;
     info.tel = value;
     this.setData({
       info
     })
   },


   nameInput(e) {
     let value = e.detail.value;
     let info = this.data.info;
     info.name = value;
     this.setData({
       info
     })
   },

   posInput(e) {
     let value = e.detail.value;
     let info = this.data.info;
     info.pos = value;
     this.setData({
       info
     })
   },

   descInput(e) {
     let desc = e.detail.value;
     let info = this.data.info;
     info.desc = desc;
     this.setData({
       info
     })
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

   // 重来
   onAgain() {
     let info = this.data.info;
     info.recorder = '';
     this.setData({
       info,
     })
   },

   onShowPick(e) {
     let type = e.currentTarget.dataset.type;
     type = Number(type);
     if (type == 0) {
       this.setData({
         isShowModel: true,
       })
     } else if (type == 1) {
       this.setData({
         isShowNumber: true,
       })
     } else if (type == 2) {
       this.setData({
         isShowCity: true,
         showtext:false
       })
     }
   },

   modelConfirm(event) {
     let that=this
     let value = event.detail.value;
     let info = this.data.info;
     let app_info = this.data.app_info
     info.model = value;
     util.PostRequest('Repair/getSerWithModel',{
      model:info.value
    },res=>{
      console.log(res,'根据机型获取机身编号');
      if(res.code == 200){
        if(res.data.length>0){
          app_info.number=[]
          app_info.number[0]=res.data.map(item=>{
            return item.serial_number
          })
        }else{
          app_info.number=[]
          app_info.number[0]=['','']
        }
        
        that.setData({
          app_info
        })
      }
    })
     this.setData({
       info
     })

    //  if (!getApp().isDebug) {
    //    this.getNumber(info.model);
    //  }
   },

   numberConfirm(event) {
     let value = event.detail.value;
     let info = this.data.info;
     info.number = value;
     this.setData({
       info
     });

   },

   sure_model(e) {
     let that = this;

     let info = this.data.info;
     let app_info =this.data.app_info
     info.model = e.detail.choosedData[0];
     util.PostRequest('Repair/getSerWithModel',{
      model:info.model
    },res=>{
      console.log(res,'根据机型获取机身编号');
      if(res.code == 200){
        app_info.number=[]
        app_info.number[0]=res.data.map(item=>{
          return item.serial_number
        })
        that.setData({
          app_info
        })
      }
    })
     this.setData({
       isShowModel: false,
       info
     })

    //  if (!getApp().isDebug) {
    //    this.getNumber(info.model);
    //  }

   },

   cancl_model() {
     this.setData({
       isShowModel: false,
     })
   },

   sure_number(e) {
     let info = this.data.info;
     info.number = e.detail.choosedData[0];
     this.setData({
       isShowNumber: false,
       info
     })
    //  console.log();
     this.getMachineDetail(info.number)
    //  this.getPosandHour(info.model, info.number);

   },
   cancl_number() {
     this.setData({
       isShowNumber: false,
     })
   },
   getMachineDetail(serial_number){
    let that=this
    util.PostRequest('Repair/getMachineDetail',{
      serial_number:serial_number
    },res=>{
      console.log(res,'根据机身编号获取信息');
      if(res.code == 200){
        if (res.data) {
          let info =that.data.info
          info.hour = parseFloat(res.data.total_hour).toFixed(2)
          info.province_city = res.data.province + res.data.city
          info.pos = res.data.location
          info.tel = res.data.phone
          info.city = res.data.city
          info.province = res.data.province
          info.name=res.data.real_name
          that.setData({
            info
          })
        }
      }
    })
  },
   getNumber(_model) {
     let that = this;
     let app_info = this.data.app_info;
     let info = this.data.info;

     inter.getNumber(_model, (res) => {
       console.log("获取编号", res.data.data);
       let numberArr = [];
       for (let i = 0; i < res.data.data.length; i++) {
         numberArr.push(res.data.data[i].serialNumber);
       }
       console.log(numberArr)
       app_info.number[0] = numberArr;

       if (numberArr[0]) {
         info.number = numberArr[0];
       } else {
         info.number = null;
       }

       that.setData({
         app_info,
         info
       })
       this.getPosandHour(info.model, info.number);
     });
   },

   getPosandHour(_model, number) {
     if (getApp().isDebug) {
       return;
     }

     if (!_model || !number) {
       return;
     }

     let that = this;
     let info = this.data.info;
     model.getMachine((res) => {
       console.log("地址", res);
       for (let i = 0; i < res.length; i++) {
         if (res[i].model == _model && res[i].serialNumber == number) {
           info.pos = res[i].location;
           info.hour = Math.floor(res[i].totalHour);
           info.province_city = res[i].province + '-' + res[i].city;
           that.setData({
             info
           })
           let cityList = that.data.cityListData;
           let city = [];
           for (let j of cityList) {
             if (j.name == res[i].province) {
               city[0] = {
                 code: j.code
               };
               for (let k of j.children) {
                 if (k.name == res[i].city) {
                   city[1] = {
                     code: k.code
                   }
                 }
               }
             }
           }
           that.setData({
             city
           })
           console.log('city', city);
         }
       }
     })
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