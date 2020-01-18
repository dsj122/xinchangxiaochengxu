// utils/components/tabbar/tabbar.js
let lastIndex = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  pageLifetimes: {
    show: function() {
      let that = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            if(wx.getStorageSync('token')){
              that.setData({
                isAuth: true,
                isBind:true
              })
            }
          } else {
            that.setData({
              isAuth: false,
              isBind:false
            })
          }
        }
      })
      
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isAuth: false,
    isBind: false,
    list: [{
        "current": 0,
        "pagePath": "/pages/index/index",
        "text": "我的服务",
        "iconPath": "/utils/image/icon04.png",
        "selectedIconPath": "/utils/image/icon01.png"
      },
      {
        "current": 0,
        "pagePath": "/pages/myEquip/myEquip",
        "text": "我的设备",
        "iconPath": "/utils/image/icon02.png",
        "selectedIconPath": "/utils/image/icon05.png"
      },
      {
        "current": 0,
        "text": "我的询价",
        "iconPath": "/utils/image/icon03.png",
        "selectedIconPath": "/utils/image/icon06.png",
        "popup": true
      }, {
        "current": 0,
        "pagePath": "/pages/pay/pay",
        "text": "我的缴费",
        "iconPath": "/utils/image/icon07.png",
        "selectedIconPath": "/utils/image/icon08.png"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toAuth() {
      wx.navigateTo({
        url: '/pages/auth/auth?middle=1',
      })
    },
    toBindPhone() {
      wx.navigateTo({
        url: '/pages/bindPhone/bindPhone',
      })
    },

    isCheckNew() {
      let token = wx.getStorageSync('token');
      console.log('token', token);
      if (token) {
        this.setData({
          isBind: true,
          isAuth:true
        })
      }
      // let user = wx.getStorageSync('user');
      // console.log('userData', user);
      // if (user.phone) {
      //   this.setData({
      //     isBind: true
      //   })
      // }
    },

    init() {
      let list = [{
          "current": 0,
          "pagePath": "/pages/index/index",
          "text": "我的服务",
          "iconPath": "/utils/image/icon04.png",
          "selectedIconPath": "/utils/image/icon01.png"
        },
        {
          "current": 0,
          "pagePath": "/pages/myEquip/myEquip",
          "text": "我的设备",
          "iconPath": "/utils/image/icon02.png",
          "selectedIconPath": "/utils/image/icon05.png"
        },
        {
          "current": 0,
          "text": "我的询价",
          "iconPath": "/utils/image/icon03.png",
          "selectedIconPath": "/utils/image/icon06.png",
          "popup": true
        }, {
          "current": 0,
          "pagePath": "/pages/pay/pay",
          "text": "我的缴费",
          "iconPath": "/utils/image/icon07.png",
          "selectedIconPath": "/utils/image/icon08.png"
        },
      ]
      this.setData({
        list,
        isShow: false,
      })
    },

    on(e) {
      console.log("on");
      
      let index = null;
      if (e.currentTarget) {
        index = e.currentTarget.dataset.index;
      } else {
        index = e;
      }
      let list = this.data.list;
      let item = list[index];
      if (item.current == 1) {
        return;
      }

      if (index != 2) {
        lastIndex = index;
      }
      this.init();
      list = this.data.list;
      item = list[index];
      item.current = 1;

      if (index == 2) {
        this.setData({
          isShow: true,
        })
      }

      this.setData({
        list,
      })
    },
    onClose() {
      if (lastIndex != null) {
        this.init();
        let list = this.data.list;
        let item = list[lastIndex];
        item.current = 1;
        this.setData({
          list,
        })
      }
      this.setData({
        isShow: false,
      })
    },
    // 去优惠
    toDis() {
      if (!this.data.isAuth) {
        this.toAuth();
      } else if (!this.data.isBind) {
        this.toBindPhone();
      } else {
        wx.navigateTo({
          url: '../../pages/discount/discount',
        })
      }
    },
    // 去保单的
    toQuo() {
      if (!this.data.isAuth) {
        this.toAuth();
      } else if (!this.data.isBind) {
        this.toBindPhone();
      } else {
        wx.navigateTo({
          url: '../../pages/quotation/quotation',
        })
      }
    }
  }
})