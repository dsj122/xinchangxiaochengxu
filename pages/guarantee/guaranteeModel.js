let utils = require('../../utils/util.js');
import {
  HTTP
} from '../../utils/http.js';


class GuaranteeModel extends HTTP {
  constructor() {
    super();
  }

  // 根据机型获取编号
  getNumber(model, cb) {
    let data = {
      model: model
    }
    utils.Request('/wxApplets/tpMachine/getMachine', data, "GET", (res) => {
      console.log('根据机型获取编号', res);
      if (cb) {
        cb(res);
      }
    })
  }

  onSub(data,cb) {
    return this.request({
      url: '/wxApplets/celOrder/createCelOrder',
      data: data,
    })
  }

}

module.exports = {
  GuaranteeModel
}