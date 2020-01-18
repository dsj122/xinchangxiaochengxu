const util = require('../../utils/util.js');

class MODEL {
  info = null; /** 用户信息 */
  modelArr = null; /** 机型数组 */
  numberArr = null; /** 编号数组 */
  machineArr = null;/** 设备数组 */
  allCel=null; /** 所有项目 */

  constructor() {}


  // 获取用户信息
  getInfo(cb) {
    let that = this;

    let info = this.info;
    if (info && info.phone && info.city) {
      return info;
    }

    let data = {};
    data.wechaId = wx.getStorageSync('wechaId');
    util.Request("/wxApplets/tpUserInfo/getUserInfo", data, "GET", (res) => {
      console.log("获取用户信息", res.data);
      that.info = res.data;
      if (cb) {
        cb(res.data);
      }
    })
  }

  // 获取机器信息
  getMachine(cb) {
    if (this.machineArr) {
      if(cb)
      {
        cb(this.machineArr);
      }
      return;
    }

    util.Request('/wxApplets/tpMachine/getMachine', {}, "GET", (res) => {
      console.log("获取机械信息", res);
      this.machineArr = res.data.data;
      if (cb) {
        cb(res);
      }
    })
  }

  // 获取所有机型跟编号的数组
  getNumandModel(cb) {
    let that = this;
    if (!this.numberArr || !this.modelArr) {
      this.getMachine((res) => {
        that.rank(res.data.data)
        if (cb) {
          cb({
            numberArr: that.numberArr,
            modelArr: that.modelArr
          });
        }
      })
    }else {
      if (cb) {
        cb({
          numberArr: that.numberArr,
          modelArr: that.modelArr
        });
      }
    }
  }

  // 获取所有保养项目
  getAllCelOrder(cb){
    let that=this;

    if(that.allCel)
    {
      cb(that.allCel);
      return;
    }

    util.Request('/wxApplets/celOrderItemType/getAllCelOrderItemType',{},"GET",(res)=>{
      console.log("获取所有保养项目",res);
      
      if(cb)
      {
        cb(res);
      }
    })
  }

  // 排列机型跟编号的数组
  rank(data) {
    let arr = data;
    let modelArr = [];
    let numberArr = [];
    for (let i = 0; i < arr.length; i++) {
      modelArr.push(arr[i].model);
      numberArr.push(arr[i].serialNumber);
    }
    this.modelArr = modelArr;
    this.numberArr = numberArr;
  }

  

}




module.exports = {
  MODEL,
}