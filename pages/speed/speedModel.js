import {HTTP} from '../../utils/http.js';

class SpeedModel extends HTTP{
  constructor(){
    super();
  }

  getSpeed(data){
    return this.request({
      url:'/wxApplets/celOrder/getCelOrder',
      data:data,
    })
  }
}

export{ SpeedModel }