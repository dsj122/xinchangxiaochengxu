// picker/picker.js
import {
  isString,
  isPlainObject
} from './tool';



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollType: {
      type: String,
      value: "normal" //"link": scroll间联动  "normal": scroll相互独立
    },
    listData: {
      type: Array,
      value: [],
      observer: function(newVal) {
        if (newVal.length === 0 || this._compareDate()) return;
        this._setTempData();
        let tempArr = [...new Array(newVal.length).keys()].map(() => 0)
        this.data.lastValue = this.data.tempValue = tempArr;
        this._setDefault()

        // let {defaultPickData} = this.properties;
        // if(newVal.length === 0) return;
        //
        // this._setDefault(newVal, defaultPickData)
      }
    },
    defaultPickData: {
      type: Array,
      value: [],
      observer: function(newVal) {
        if (newVal.length === 0 || this._compareDate()) return;
        this._setTempData();
        this._setDefault()
      }
    },
    keyWordsOfShow: {
      type: String,
      value: "name"
    },
    isShowPicker: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal) {
          this._openPicker()
        } else {
          this._closePicker()
        }
      }
    },

    isShowNotFound: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        console.log('new Val', newVal)
        this.setData({
          isShowNotFound: newVal,
        })
      }
    },

    hideDay: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        console.log('new Val', newVal)
        this.setData({
          hideDay: newVal,
        })
      }
    },

    isMin: { //限制时间出现在今天之后
      type: Boolean,
      value: false,
      observer: function(newVal) {
        console.log('new Val', newVal)
        this.setData({
          isMin: newVal,
        })
      }
    },

    isTime: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        console.log('new Val', newVal);
        let list = [];
        list[0] = [];
        for (let i = 2000; i < new Date().getFullYear() + 1; i++) {
          list[0].push(i);
        }

        list[1] = [];
        for (let i = 1; i <= 12; i++) {
          list[1].push(i);
        }

        if (!this.data.hideDay) {
          list[2] = [];
          for (let i = 1; i <= 31; i++) {
            list[2].push(i);
          }
          console.log('list', list);
        }

        if (this.data.isMin) {
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let day = new Date().getDate();
          let maxDay = new Date(year, month, 0).getDate();
          list[0] = [];
          if (month != 12) {
            list[0].push(year)
            list[0].push(year + 1);
            if (day + 1 >= maxDay) {
              month += 1;
            }
          } else {
            if (day + 1 >= maxDay) {
              list[0].push(year + 1);
            } else {
              list[0].push(year)
              list[0].push(year + 1);
            }
          }


          if (list[0][0] == year) {
            list[1] = [];
            for (let i = month; i <= 12; i++) {
              list[1].push(i);
            }
          }
          if (day + 1 >= maxDay) {
            day = 0;
          }
          maxDay = new Date(year, month, 0).getDate();
          console.log('maxDay', maxDay);
          list[2] = [];
          for (let i = day + 1; i <= maxDay; i++) {
            list[2].push(i);
          }
          console.log('list[2]', list[2]);
        }

        let pick_time = [];
        let date = new Date();
        if (!this.data.isMin) {
          pick_time[0] = list[0].length - 1;
          pick_time[1] = date.getMonth();
          if (!this.data.hideDay) {
            pick_time[2] = date.getDate() - 1;
          }
        } else {
          pick_time[0] = 0;
          pick_time[1] = 0;
          pick_time[2] = 0;
        }

        this.setData({
          isTime: newVal,
          list,
          pick_time,
        })
      }
    },

    titleText: { //标题文案
      type: String,
      value: "标题"
    },
    cancelText: { //取消按钮文案
      type: String,
      value: "取消"
    },
    sureText: { //确定按钮文案
      type: String,
      value: "确定"
    },
    inputText: { //Input标题文案
      type: String,
      value: "请填写"
    },


    pickerHeaderStyle: String, //标题栏样式 view
    sureStyle: String, //标题栏确定样式  text
    cancelStyle: String, //标题栏取消样式 text
    titleStyle: String, //标题栏标题样式  view
    maskStyle: String, //设置蒙层的样式（详见picker-view） view
    indicatorStyle: String, //设置选择器中间选中框的样式（详见picker-view） view
    chooseItemTextStyle: String, //设置picker列表文案样式 text
    rectBottom: String, //设置黄色框的位置
    isShowInput: Boolean, //显示手动填写
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowNotFound: true,
    columnsData: [],
    value: [],
    backData: [],
    height: 0,
    isOpen: false,
    isUseKeywordOfShow: false,
    scrollEnd: true, //滚动是否结束
    lastValue: [], //上次各个colusurem的选择索引
    tempValue: [],
    isFirstOpen: true,
    onlyKey: '',
    defaultPickDataTemp: '',
    listDataTemp: '',
    isShowInput: false,
    manualInput: null,
    isTime: false,
    list: [],
    pick_time: [],
    hideDay: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    time_bindChange(e) {
      let pick_time = e.detail.value;
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let day = new Date().getDate();
      let maxDay = new Date(year, month, 0).getDate();
      let list = this.data.list;

      console.log('pick', pick_time, list);
      console.log(pick_time, year, month, day, maxDay);

      if (this.data.isMin) {
        if (list[0][pick_time[0]] != year) {
          list[1] = [];
          for (let i = 1; i <= 12; i++) {
            list[1].push(i);
          }
        } else {
          list[1] = [];
          if (day + 1 >= maxDay) {
            month += 1;
          }
          for (let i = month + 1; i <= 12; i++) {
            list[1].push(i);
          }
        }
      }

      if (pick_time[1] >= list[1].length) {
        pick_time[1] = 0;
      }

      // if (this.props.isMin) {
      //   if (pick_time[0] == 0) {
      //     if (pick_time[1] <= month) {
      //       pick_time[1] = month;
      //       if (pick_time[2] <= day) {
      //         pick_time[2] = day;
      //       }

      //       let maxDay = new Date(year, month, 0).getDate();

      //       if (day + 1 >= maxDay) {
      //         pick_time[1] = month + 1;
      //         pick_time[2] = 0;
      //       }


      //     }
      //   }
      // }
      this.setData({
        list,
        pick_time
      })
      if (!this.data.hideDay) {
        this.checkDay();
      }
    },

    checkDay() {
      let pick = this.data.pick_time;
      console.log('pick', pick, this.data.list);
      let month = this.data.list[1][pick[1]];
      let year = this.data.list[0][pick[0]];
      let day = new Date().getDate();
      let maxDay = new Date(year, month, 0).getDate();
      console.log("maxDay", maxDay);
      let list = this.data.list;
      list[2] = [];
      if (!this.data.isMin) {
        for (let i = 1; i <= maxDay; i++) {
          list[2].push(i);
        }
      } else {
        console.log('month', month, new Date().getMonth() + 1)
        if (month == new Date().getMonth() + 1) {
          for (let i = day + 1; i <= maxDay; i++) {
            list[2].push(i);
          }
        } else {
          for (let i = 1; i <= maxDay; i++) {
            list[2].push(i);
          }
        }
      }
      console.log('list', list[2])
      this.setData({
        list
      })
    },


    // 输入
    input(e) {
      let manualInput = e.detail.value;
      this.setData({
        manualInput
      })
    },

    // 确认
    confirm() {
      let value = this.data.manualInput;
      this.triggerEvent('confirm', {
        value
      }, {})
      this.setData({
        manualInput: null,
        isShowInput: false,
      })
      this.cancle();
    },

    // 关闭
    close() {
      this.setData({
        manualInput: null,
        isShowInput: false,
      })
      this.cancle();
    },

    tapModal() {
      this.properties.isShowPicker = false;
      this._closePicker()
    },
    cancle() {
      this.triggerEvent('cancle')
      this._closePicker()
    },
    showInput() {
      this._closePicker();
      this.setData({
        isShowInput: true,
      })
    },
    sure() {
      if (this.data.isTime) {
        let date = this.data.pick_time;
        let list = this.data.list;
        let dateArr = [];
        dateArr[0] = list[0][date[0]];
        dateArr[1] = list[1][date[1]];
        if (list.length == 3) {
          dateArr[2] = list[2][date[2]];
        }
        console.log('date', date);
        this.triggerEvent('sure', {
          date: date,
          dateArr
        })
        return;
      }


      let {
        scrollEnd,
        tempValue
      } = this.data;
      if (!scrollEnd) return;
      let backData = this._getBackDataFromValue(tempValue);
      this.setData({
        backData
      })
      this.triggerEvent('sure', {
        choosedData: backData,
        choosedIndexArr: tempValue
      })
      this._closePicker()
    },
    _bindChange(e) {
      let {
        scrollType
      } = this.properties;
      let {
        lastValue
      } = this.data;
      let val = e.detail.value;
      let backData = [];
      switch (scrollType) {
        case "normal":
          this.data.tempValue = val.concat();
          this.data.tempValue = val.concat();
          break;
        case "link":
          //let column_02 = this._getColumnData(this.properties.listData[val[0]].children);
          //let column_03 = this._getColumnData(this.properties.listData[val[0]].children[val[1]].children);
          let tempArray = [];
          if (val.length > 1) {
            val.slice(0, val.length - 1).reduce((t, c, i) => {
              let v = t[c].children;
              tempArray.push(this._getColumnData(v))
              return v
            }, this.properties.listData)
          }
          //let columnsData = [this.data.columnsData[0],column_02,column_03];
          let columnsData = [this.data.columnsData[0], ...tempArray];

          //设置value关联
          let compareIndex = this._getScrollCompareIndex(lastValue, val);
          if (compareIndex > -1) {
            let tempI = 1;
            while (val[compareIndex + tempI] !== undefined) {
              val[compareIndex + tempI] = 0;
              tempI++;
            }
          }
          val = this._validate(val);
          this.data.lastValue = val.concat();
          this.data.tempValue = val.concat();
          this.setData({
            columnsData,
            // value: val
          })
      }

    },
    _validate(val) {
      let {
        columnsData
      } = this.data;
      columnsData.forEach((v, i) => {
        if (columnsData[i].length - 1 < val[i]) {
          val[i] = columnsData[i].length - 1;
        }
      })
      this.setData({
        value: val
      })
      return val;
    },
    _bindpickend() {
      this.data.scrollEnd = true;
    },
    _bindpickstart() {
      this.data.scrollEnd = false;
    },
    _openPicker() {
      // if (!this.data.isFirstOpen) {
        console.log('nimais');
        if (this.properties.listData.length !== 0) {
          
          this._setDefault(this._computedBackData(this.data.backData))
        }
      // }
      this.data.isFirstOpen = false;
      this.setData({
        isOpen: true
      })

    },
    _closePicker() {
      this.setData({
        isOpen: false
      })
    },
    _getColumnData(arr) {
      return arr.map((v) => this._fomateObj(v))
    },
    _fomateObj(o) {
      let tempO = {};
      for (let k in o) {
        k !== "children" && (tempO[k] = o[k]);
      }
      return tempO;
    },
    _getScrollCompareIndex(arr1, arr2) {
      let tempIndex = -1;
      for (let i = 0, len = arr1.length; i < len; i++) {
        if (arr1[i] !== arr2[i]) {
          tempIndex = i;
          break;
        }
      }
      return tempIndex;
    },
    //根据id获取索引
    _getIndexByIdOfObject(listData, idArr, key, arr) {
      if (!Array.isArray(listData)) return;
      for (let i = 0, len = listData.length; i < len; i++) {
        if (listData[i][key] == idArr[arr.length][key]) {
          arr.push(i)
          return this._getIndexByIdOfObject(listData[i].children, idArr, key, arr)
        }
      }

    },
    _setDefault(inBackData) {
      console.log(1111111111);
      
      let {
        listData,
        defaultPickData,
        scrollType
      } = this.properties;

      let {
        lastValue,
        tempValue,
        onlyKey
      } = this.data;
      if (inBackData) {

        defaultPickData = inBackData;
      }
      let backData = [];
      switch (scrollType) {
        case "normal":
          if (isPlainObject(listData[0][0])) {
            this.setData({
              isUseKeywordOfShow: true
            })
          }
          if (Array.isArray(defaultPickData) && defaultPickData.length > 0) {
            backData = listData.map((v, i) => v[defaultPickData[i]]);
            this.data.tempValue = defaultPickData;
            this.data.lastValue = defaultPickData;
          } else {
            backData = listData.map((v) => v[0]);
          }
          this.setData({
            columnsData: listData,
            backData: backData,
            value: defaultPickData
          })
          break;
        case "link":
          // let column_01 = this._getColumnData(newVal);
          // let column_02 = this._getColumnData(newVal[0].children);
          // let column_03 = this._getColumnData(newVal[0].children[0].children);
          // let columnsData = [column_01,column_02,column_03];
          let columnsData = [];
          //如果默认值
          if (Array.isArray(defaultPickData) && defaultPickData.length > 0 && defaultPickData.every((v, i) => isPlainObject(v))) {

            let key = this.data.onlyKey = Object.keys(defaultPickData[0])[0];

            let arr = [];

            this._getIndexByIdOfObject(listData, defaultPickData, key, arr);

            defaultPickData = arr;
            let tempI = 0;
            do {
              lastValue.push(defaultPickData[tempI]);
              columnsData.push(this._getColumnData(listData))
              listData = listData[defaultPickData[tempI]].children;
              tempI++;
            } while (listData)
            backData = columnsData.map((v, i) => v[defaultPickData[i]]);
            //如果没有默认值
          } else {
            this.data.onlyKey = this.properties.keyWordsOfShow || 'name';
            do {
              lastValue.push(0);
              columnsData.push(this._getColumnData(listData))
              listData = listData[0].children;
            } while (listData)
            backData = columnsData.map((v) => v[0]);
          }
          this.data.tempValue = defaultPickData;
          this.data.lastValue = defaultPickData;
          this.setData({
            isUseKeywordOfShow: true,
            columnsData,
            backData,
          })
          setTimeout(() => {
            this.setData({
              value: defaultPickData
            })
          }, 0)
          break;
      }
    },
    _computedBackData(backData) {
      let {
        scrollType,
        listData
      } = this.properties;
      let {
        onlyKey
      } = this.data;
      if (scrollType === 'normal') {
        return backData.map((v, i) => listData[i].findIndex((vv, ii) => this._compareObj(v, vv)))
      } else {
        let t = backData.map((v, i) => {
          let o = {};
          o[onlyKey] = v[onlyKey]
          return o;
        })

        return t
      }
    },
    _compareObj(o1, o2) {
      let {
        keyWordsOfShow
      } = this.properties;
      if (typeof o1 !== "object") {
        return o1 === o2
      } else {
        return o1[keyWordsOfShow] === o2[keyWordsOfShow]
      }
    },
    _getBackDataFromValue(val) {
      let tempArr = [];
      if (val.length > 0) {
        tempArr = this.data.columnsData.reduce((t, v, i) => {
          return t.concat(v[val[i]])
        }, [])
      } else {
        tempArr = this.data.columnsData.map((v, i) => v[0])
      }
      return tempArr
    },
    _compareDate() { //完全相等返回true
      let {
        defaultPickDataTemp,
        listDataTemp
      } = this.data;
      let {
        defaultPickData,
        listData
      } = this.properties

      return defaultPickDataTemp === defaultPickData && listDataTemp === listData
    },
    _setTempData() {
      let {
        defaultPickData,
        listData
      } = this.properties;
      this.data.defaultPickDataTemp = defaultPickData;
      this.data.listDataTemp = listData;
    }
  }
})