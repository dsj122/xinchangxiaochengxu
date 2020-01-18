//app.js

import './vendor/weapp-cookie/index'
const config = require('/pages/config.js');
const util = require('/utils/util.js');
const md5 = require('/utils/md5.js');
const mtjwxsdk = require("./utils/mtj-wx-sdk.js");
App({
  info: {
    // 机型
    model: ['20D', '20C', '20B'],
    // 机身编号
    number: ['8080', '9090', '1111'],
    pos: '广东省广东市白云区58号',
    name: '陈先生',
    tel: 13131313131,
    hour: 10,
    phoneRegexp: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  },
  isDebug: false,

  isLogin() {
    let sessionId = wx.getStorageSync('sessionId')
    if (!sessionId) return false
    return true
  },

  onLaunch: function() {
    // 展示本地存储能力
    let obj = wx.getLaunchOptionsSync();
    let index = obj.scene;
    console.log("场景值", index);
    this.scence = index;
    
    // if (!this.isDebug) {
    //   login(this, () => {
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //   });
    // }
  },

  check() {
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          let data = wx.getStorageSync('user');
          if (!data.phone) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone',
            })
          }

        } else {
          wx.navigateTo({
            url: '/pages/auth/auth?middle=1',
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    isLogin: false,
    recommendList: null,
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.isLogin)
    } else {
      login(that, cb);
    }
  },

  doLogin(cb, isLogin = false) {
    var that = this
    if (!isLogin) {
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.isLogin)
      } else {
        login(that, cb);
      }
    } else {
      login(that, cb);
    }
  },

  getInfo(cb, middle = null) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      return userInfo(cb, middle)
    }
    // return this.globalData.userInfo || userInfo(cb)
  },

  getToken() {
    let that = this;
    let send_time = parseInt((new Date().getTime()) / 1000);
    console.log('config', config.appid, send_time);
    let signature = md5.hex_md5(config.appid + send_time);
    console.log('signature', signature);
    util.Request('/api/token/getToken', {
      appid: config.appid,
      signature,
      send_time
    }, 'POST', (res) => {
      console.log('获取TOKEN', res);
      if (res.data.code == 100) {
        wx.setStorageSync('token', res.data.data.token)
      } else if (res.data.code == 109) {
        that.getToken();
      }
    })
  },



  alert(title, time = 1000) {
    wx.showToast({
      title,
      icon: 'none',
      duration: time,
      mask: true,
    })
  },
  globalData: {
    userInfo: null
  },
  checkMobile(phone) {
    let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(phone);
  },
  // 上传调用 cb:成功回调
  upload(path,type,cb) {
    // 测试用的
    // if (getApp().isDebug) {
    //   cb(path)
    //   return;
    // }
    let that = this;
    let url = util.host+'Repair/upload';
    console.log('path222', path);
    wx.uploadFile({
      url: url,
      filePath: path,
      header:{
        token:wx.getStorageSync('token')
      },
      name: 'file',
      formData:{
        type:type
      },
      success(res) {
        console.log(JSON.parse(res.data));
  
        cb(JSON.parse(res.data).data.id);
      },
      fail(res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      }
    })
  },
  //转日期格式为YY-MM
  getFormatDateformonth(date){
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month >=1 && month <=9) {
      month = "0" + month;
    }
    var newDate = year + seperator + month
    return newDate;
  },
   //转日期格式为中文日月：2019年1月
   getChineseMonth(e){
    let year=e.getFullYear();
    let month = e.getMonth() + 1;
    let dates = year + '年' + month + '月'
    return dates
  },
  //转日期格式为YY-MM
  getFormatDateformonth(date){
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month >=1 && month <=9) {
      month = "0" + month;
    }
    var newDate = year + seperator + month
    return newDate;
  },
})

function login(that, cb) {
  console.log("调用登陆接口", cb)
  var url = wx.getStorageSync('url');
  wx.showLoading({
    title: "loading",
  });
  wx.login({
    success: function(res) {
      console.log('这里')
      requestLogin(res, cb)
    },
    fail: function(res) {
      console.log('失败');
    }
  });
}

function requestLogin(xdata, cb) {
  console.log(xdata, cb,'requestLogin')
  let that = this
  console.log("进来了requestLogin")
  console.log('code', xdata.code)
  var url = wx.getStorageSync('url');
  console.log('url', url)
  wx.request({
    url: url + '/wxApplets/user/login',
    data: {
      code: xdata.code
    },
    method: "GET",
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.log('登录成功cb', cb)
      var data = res.data;
      console.log("sessionId:", data)
      if (data.code == 2000) {
        util.Request('/wxApplets/tpUserInfo/getUserInfo', {
          wechaId: data.wechaId
        }, 'GET', (res) => {
          console.log('user', res);
          if (res.data.code == 2000) {
            wx.setStorageSync('user', res.data.data)
          }
        })
        wx.hideLoading();
        // wx.setStorageSync("sessionId", data.sessionId);
        // wx.setStorageSync('userId', data.userId);
        for (let key in data) {
          if (key == 'code' || key == 'user') {
            continue;
          }
          wx.setStorageSync(key, data[key]);
        }
        // that.globalData.isLogin = true
        // resolve(res);
        cb();
      } else {
        // requestLogin(xdata, cb);
        // reject(data);
      }
    },
    fail: function(res) {
      console.log("fail", res)
      wx.hideLoading();
      wx.showToast({
        title: '登录失败，请重进进入',
        icon: 'none',
      })
    },
    complete(res) {
      console.log(res)
    }
  })
}



function userInfo(cb, middle) {
  let that = this
  wx.getUserInfo({
    success: function(res) {
      submitInfo(res, middle)
      console.log('userInfo', res);
      wx.setStorageSync('userInfo', res);
      getApp().globalData.userInfo = res.userInfo;
      cb(res.userInfo)
    },
    fail: function(res) {
      // 取消授权
    }
  })
}

function submitInfo(xdata, middle = null) {
  console.log('进来submitInfo');
  
  // 测试用的
  if (getApp().isDebug) {
    wx.navigateTo({
      url: '../../pages/bindPhone/bindPhone',
    })
    return;
  }

  let url = wx.getStorageSync('url')
  console.log('提交用户信息')
  wx.request({
    url: url + '/wxApplets/user/info',
    data: {
      rawData: xdata.rawData,
      signature: xdata.signature,
      encryptedData: xdata.encryptedData,
      iv: xdata.iv,
      sessionId: wx.getStorageSync("sessionId")
    },
    success: function(res) {
      console.log("成功", res);
      if (!res.data.user.phone) {
        if (middle) {
          let m = middle;
          wx.navigateTo({
            url: '../../pages/bindPhone/bindPhone?middle=' + m,
          })
        } else {
          wx.navigateTo({
            url: '../../pages/bindPhone/bindPhone',
          })
        }
      } else {
        if (middle) {
          wx.navigateBack({
            delta: middle
          })
        } else {
          wx.navigateTo({
            url: '../../pages/index/index',
          })
          
        }
      }
    },
    fail: function(res) {
      console.log("失败: ", res)
    }
  })
}
