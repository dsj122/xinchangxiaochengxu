// utils/components/authPopup/authPopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false,
      observer: function (newVal) {
       this.setData({
         newVal
       })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.triggerEvent('hideAuth')
      this.setData({
        isShow:false
      })
    }
  }
})
