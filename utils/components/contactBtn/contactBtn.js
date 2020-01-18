// utils/components/contactBtn/contactBtn.js
Component({
  pageLifetimes: {
    show() {
      console.log("show");
      let that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            screenWidth: res.screenWidth,
            screenHeight: res.screenHeight
          })
        },
      });
      let query = wx.createSelectorQuery().in(that);
      query.select('.btn').boundingClientRect(function(rect) {
        that.setData({
          contactWidth: rect.width/2,
        })
      }).exec();
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    contactB: 200,
    contactR: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    move(e) {
      var touchs = e.touches[0]
      var pageX = touchs.pageX
      var pageY = touchs.pageY
      //防止坐标越界,view宽高的一般
      if (pageX <= 0) return
      if (pageX > this.data.screenWidth - this.data.contactWidth) return
      if (this.data.screenHeight - pageY <= this.data.contactWidth + 50) return
      if (pageY <= this.data.contactWidth) return
      //这里用right和bottom.所以需要将pageX pageY转换
      var x = this.data.screenWidth - pageX - this.data.contactWidth;
      var y = this.data.screenHeight - pageY - this.data.contactWidth*3;
      this.setData({
        contactB: y,
        contactR: x
      });
    }
  }
})