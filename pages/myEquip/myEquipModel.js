import { HTTP } from '../../utils/http.js';

class MyEquipModel extends HTTP {
  constructor() {
    super();
  }

  // 获取设备
  getEquip(data) {
    return this.request({
      url: '/wxApplets/tpCustomerMachineMapping/getDevices',
      data: data
    })
  }
}

export {
  MyEquipModel
}