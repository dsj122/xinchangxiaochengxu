let utils = require("../../utils/util.js");
import {
  HTTP
} from '../../utils/http.js';


class CheckOrderModel extends HTTP {
  constructor() {
    super();
  }

  getList(data, cb) {
    utils.Request('/wxApplets/celOrder/getCelOrderList', data, (res) => {
      console.log('获取列表', res);
      if (cb) {
        cb(res);
      }
    })
  }
}

module.exports = {
  CheckOrderModel
}