// utils/components/recorder/recorder.js
// 录音
const recorder = wx.getRecorderManager();
// 计时器
let interval = null;
// 播放用的
let audio = wx.createInnerAudioContext();
const app = getApp();
Component({
  pageLifetimes: {
    show: function() {

    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    setSrc: {
      type: String,
      value: '',
      observer: function(newVal) {
        console.log('new Val', newVal)
        if (newVal.length <= wx.getStorageSync('imgUrl').length) {
          this.setData({
            isNull: true
          })
        } else {
          this.setData({
            isNull: false
          })
        }
        this.setData({
          src: newVal,
        })
      }
    },
    isShowAgain: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        console.log('new Val', newVal)
        this.setData({
          isShowAgain: newVal,
        })
      }
    },
    recordernum:{
      type:Number,
      value:0,
      observer: function(newVal) {
        console.log('new recordernum', newVal)
      }
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        index:this.data.recordernum
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShowAuth: false,
    isShowRecIng: false,
    isShowRecShort: false,
    isShowAgain: true,
    time: null,
    src: null,
    isPlay: false,
    isNull: true,
    index:-1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 播放录音
    onPlay() {
      console.log(this.data.index,'indexofplay');
      audio.src = this.data.src;
      console.log('src', audio.src);
      audio.onPlay(() => {
        // console.log(this.data.index,'index',this.data.recordernum,'recordernum');
        console.log('播放');
        if (this.data.index == app.question_rec_index) {
          this.setData({
            isPlay: true,
          })
        }else{
          console.log("不是当前")
        }
      });

      audio.onEnded(() => {
        console.log('结束');
        this.setData({
          isPlay: false,
        })
      });

      audio.onStop(() => {
        console.log('结束');
        this.setData({
          isPlay: false,
        })
      });

      audio.onPause(() => {
        console.log('结束');
        this.setData({
          isPlay: false,
        })
      });

      audio.play();
      this.setData({
        isPlay: true
      })
      console.log("播放录音");
    },

    // 按到重新录制
    onAgain() {
      console.log('子组件重来');
      audio.stop();
      this.triggerEvent('onAgain');
      this.setData({
        src: '',
        isPlay: false,
        isNull:true
      })
    },

    // 麦克风

    _recorderStart() {
      wx.getSetting({
        success: (res) => {
          let isAuth = res.authSetting['scope.record'];
          console.log('isAuth', isAuth);

          if (isAuth == undefined) {
            return;
          }

          if (isAuth == false) {
            //  wx.showToast({
            //    title: '请重新授权',
            //    icon:'none',
            //  }) 
            this.triggerEvent('showAuth');
            return;
          } else {
            this.recorderStart();
          }
        }
      })
    },

    recorderStart() {
      const options = {
        duration: 62000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'mp3',
        frameSize: 50
      }
      console.log(this.data.time,'录音中');
      recorder.start(options);
      recorder.onStart(() => {
        console.log('recorder start')
        this.setData({
          isShowRecIng: true,
          time: 60
        })
        interval = setInterval(() => {
          if (this.data.time <=0) {
            wx.showToast({
              title: '超过60秒自动保存',
              icon: 'none',
              image: '',
              duration: 1500,
              
            });
            this.recorderStop()
            clearInterval(interval);
            return
          }
          let time = this.data.time;
          time -= 1;
          this.setData({
            time
          })
        }, 1000)
      })
      recorder.onPause(() => {
        console.log('recorder pause')
      })
      recorder.onStop((res) => {
        this.setData({
          isShowRecIng: false,
        })
        clearInterval(interval);
      })
      recorder.onFrameRecorded((res) => {
        const {
          frameBuffer
        } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })
      recorder.onError((res) => {
        console.log('错误', res);
      })

    },

    recorderStop: function() {
      clearInterval(interval);
      console.log('time', this.data.time);
      this.setData({
        isShowRecIng: false,
      })
      recorder.stop();
      if ((60 - this.data.time) < 3) {
        console.log("录制时间太短");
        this.setData({
          isShowRecShort: true
        })
        setTimeout(() => {
          this.setData({
            isShowRecShort: false,
          })
        }, 1000)
        return;
      }
      recorder.onStop((res) => {
        let src = res.tempFilePath;
        this.setData({
          src: src
        })
        console.log("Stopsrc", src);
        this.triggerEvent('recorderStop', {
          src,
        }, {})
      })
    },
  }
})