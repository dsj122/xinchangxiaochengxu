import {HTTP} from '../../utils/http.js';

class QuestionModel extends HTTP{
  constructor(){
    super();
  }

  getQuestion(data){
    return this.request({
      url:'/wxApplets/celOrder/writeServiceComment',
      data:data,
    })
  }

  onSub(data)
  {
    return this.request({
      url:'',
      data:data,
    })
  }

}

export{QuestionModel}